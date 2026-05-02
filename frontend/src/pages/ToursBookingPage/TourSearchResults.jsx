// File 5: TourSearchResults.jsx
import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import Button from '../../components/Button';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

const measureChipsWidths = (containerElement, chipSelector) => {
  const chips = containerElement.querySelectorAll(chipSelector);
  return Array.from(chips).map(chip => chip.getBoundingClientRect().width);
};

const useDynamicHighlights = (highlights, containerRef) => {
  const [visibleCount, setVisibleCount] = useState(highlights.length);
  const [hiddenHighlights, setHiddenHighlights] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const resizeObserverRef = useRef(null);

  const computeVisibleCount = useCallback(() => {
    const container = containerRef.current;
    if (!container || highlights.length === 0) return;

    const containerWidth = container.clientWidth;
    const computedStyle = window.getComputedStyle(container);
    const gap = parseFloat(computedStyle.gap) || 0;

    if (containerWidth === 0) return;

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.display = 'flex';
    tempDiv.style.gap = `${gap}px`;
    tempDiv.style.whiteSpace = 'nowrap';
    tempDiv.style.fontSize = window.getComputedStyle(container).fontSize;
    tempDiv.style.fontFamily = window.getComputedStyle(container).fontFamily;
    document.body.appendChild(tempDiv);

    const chipElements = highlights.map((text) => {
      const chip = document.createElement('div');
      chip.className = 'px-3 py-1 border border-gray-300 rounded-md text-sm text-black whitespace-nowrap';
      chip.textContent = text;
      tempDiv.appendChild(chip);
      return chip;
    });

    const chipWidths = chipElements.map((chip) => chip.getBoundingClientRect().width);
    
    document.body.removeChild(tempDiv);

    const getPlusButtonWidth = (hiddenCount) => {
      const tempButton = document.createElement('div');
      tempButton.className = 'px-3 py-1 border border-gray-300 rounded-md text-sm text-black cursor-pointer';
      tempButton.textContent = `+${hiddenCount}`;
      tempButton.style.visibility = 'hidden';
      tempButton.style.position = 'absolute';
      document.body.appendChild(tempButton);
      const width = tempButton.getBoundingClientRect().width;
      document.body.removeChild(tempButton);
      return width;
    };

    let maxVisible = highlights.length;
    let totalWidth = 0;

    for (let i = 0; i < highlights.length; i++) {
      const nextWidth = totalWidth + chipWidths[i] + (i > 0 ? gap : 0);
      const remainingChips = highlights.length - (i + 1);
      let plusButtonWidth = 0;
      if (remainingChips > 0) {
        plusButtonWidth = getPlusButtonWidth(remainingChips) + gap;
      }
      if (nextWidth + plusButtonWidth <= containerWidth) {
        totalWidth = nextWidth;
        maxVisible = i + 1;
      } else {
        break;
      }
    }

    if (maxVisible === highlights.length) {
      setVisibleCount(highlights.length);
      setHiddenHighlights([]);
    } else {
      setVisibleCount(maxVisible);
      setHiddenHighlights(highlights.slice(maxVisible));
    }
    setIsReady(true);
  }, [highlights, containerRef]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    computeVisibleCount();

    resizeObserverRef.current = new ResizeObserver(() => {
      computeVisibleCount();
    });
    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [computeVisibleCount, containerRef]);

  return { visibleCount, hiddenHighlights, isReady };
};

const TourHighlightsRow = ({ highlights }) => {
  const containerRef = useRef(null);
  const { visibleCount, hiddenHighlights, isReady } = useDynamicHighlights(highlights, containerRef);
  const visibleHighlights = highlights.slice(0, visibleCount);

  if (!isReady) {
    return (
      <div ref={containerRef} className="flex flex-row items-center gap-2 flex-nowrap w-full overflow-hidden">
        <div className="px-3 py-1 border border-gray-300 rounded-md text-sm text-black bg-gray-100 animate-pulse w-20"></div>
        <div className="px-3 py-1 border border-gray-300 rounded-md text-sm text-black bg-gray-100 animate-pulse w-16"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-row items-center gap-2 flex-nowrap w-full">
      {visibleHighlights.map((highlight, index) => (
        <div key={index} className="px-3 py-1 border border-gray-300 rounded-md text-sm text-black whitespace-nowrap">
          {highlight}
        </div>
      ))}
      {hiddenHighlights.length > 0 && (
        <div className="relative group/tooltip">
          <div className="px-3 py-1 border border-gray-300 rounded-md text-sm text-black cursor-pointer">
            +{hiddenHighlights.length}
          </div>
          <div className="absolute bottom-full left-0 mb-2 w-max max-w-[300px] hidden group-hover/tooltip:block bg-white border border-gray-200 shadow-lg rounded-md p-3 z-[9999]">
            <ul className="flex flex-col gap-2">
              {hiddenHighlights.map((item, idx) => (
                <li key={idx} className="text-sm text-black list-disc ml-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const TourSearchResults = ({ tours }) => {
  if (!tours || tours.length === 0) return null;

  return (
    <div className="flex flex-col gap-[20px] w-full">
      {tours.map((tour) => {
        const hasDiscount = tour.bookNow?.originalPrice && tour.bookNow.originalPrice > tour.price;
        const currentPrice = tour.price;
        const originalPrice = tour.bookNow?.originalPrice;
        const departureDate = tour.availableDates?.[0] || tour.departureSchedules?.[0]?.departure;
        const highlights = tour.highlights || [];

        return (
          <div
            key={tour.id}
            className="group flex flex-col lg:flex-row w-full h-[500px] md:h-auto lg:h-[225px] bg-white rounded-xl border-2 border-orange-500 cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] overflow-hidden"
          >
            <div className="w-full lg:w-[200px] h-[220px] md:h-[250px] lg:h-full flex-shrink-0 relative">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl"
              />
            </div>

            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex items-center gap-1 mb-2 text-sm shrink-0">
                <span className="text-blue-600 font-bold">{tour.rating}</span>
                <span className="text-black">/5</span>
                <span className="text-black ml-1">({tour.reviewsCount} reviews)</span>
              </div>

              <h2 className="text-black text-xl lg:text-2xl font-bold mb-3 break-words line-clamp-2 shrink-0">
                {tour.title}
              </h2>

              <div className="flex flex-row items-center gap-6 mb-4 text-sm shrink-0">
                <div className="flex items-center gap-2">
                  <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L14.5 14.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
                  </svg>
                  <span className="text-black">{tour.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg height="18px" width="18px" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
                    <path fill="#000000" d="M255.996,0C145.058,0,55.138,89.929,55.138,200.866c0,68.454,34.648,128.363,86.55,165.174 c47.356,33.594,57.811,41.609,74.462,73.4c13.174,25.147,34.541,69.279,34.541,69.279c1.004,2.008,3.052,3.281,5.306,3.281 c2.244,0,4.31-1.274,5.313-3.281c0,0,21.368-44.132,34.541-69.279c16.642-31.791,27.106-39.806,74.454-73.4 c51.91-36.811,86.558-96.72,86.558-165.174C456.862,89.929,366.925,0,255.996,0z M255.996,335.473 c-74.331,0-134.599-60.268-134.599-134.608c0-74.339,60.268-134.607,134.599-134.607c74.339,0,134.606,60.268,134.606,134.607 C390.602,275.205,330.335,335.473,255.996,335.473z"></path>
                  </svg>
                  <span className="text-black">{tour.departure}</span>
                </div>
              </div>

              <div className="mt-auto w-full">
                <TourHighlightsRow highlights={highlights} />
              </div>
            </div>

            <div className="w-full lg:w-[200px] h-[75px] md:h-auto lg:h-full flex-shrink-0 flex flex-col justify-center lg:justify-between items-start lg:items-end px-4 py-2 lg:p-4 lg:bg-[#f2f7fa] border-t border-gray-100 lg:border-t-0 bg-white lg:rounded-r-xl lg:rounded-bl-none rounded-b-xl">
              <div className="flex flex-col lg:items-end w-full">
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 lg:gap-0 w-full lg:mb-2">
                  <span className="text-gray-500 text-sm whitespace-nowrap">Giá chỉ</span>
                  
                  {hasDiscount && (
                    <span className="text-gray-400 text-sm line-through whitespace-nowrap lg:mb-1">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                  
                  <span className="text-orange-500 text-lg lg:text-xl font-bold whitespace-nowrap">
                    {formatPrice(currentPrice)}
                  </span>
                </div>

                {departureDate && (
                  <span className="text-gray-500 text-sm whitespace-nowrap lg:mb-4">
                    Khởi hành ngày {formatDate(departureDate)}
                  </span>
                )}
              </div>

              <div className="hidden lg:block w-full">
                <Button
                  variant="primary"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TourSearchResults;