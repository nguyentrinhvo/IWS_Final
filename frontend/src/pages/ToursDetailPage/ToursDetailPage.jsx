// ToursDetailPage.jsx
import React from 'react';
import Navbar from '../../layouts/UserLayout/Navbar';
import Footer from '../../layouts/UserLayout/Footer';
import TourHeader from './TourHeader';
import TourBreadcrumb from './TourBreadcrumb';
import TourHighlights from './TourHighlights';
import TourItinerary from './TourItinerary';
import TourInclusions from './TourInclusions';
import TourExclusions from './TourExclusions';
import TourTerms from './TourTerms';
import TourBookNow from './TourBookNow';
import TourReviews from './TourReviews';
import TourSchedulePrice from './TourSchedulePrice';
import Loading from '../../components/Loading';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const ToursDetailPage = ({ data, loading, error, onRetry, locale = 'vi' }) => {
  if (loading) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <Navbar />
        </div>
        <main style={{ maxWidth: '1320px', width: '100%', margin: '0 auto', padding: '20px 15px', flex: 1 }}>
          <Loading locale={locale} />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <Navbar />
        </div>
        <main style={{ maxWidth: '1320px', width: '100%', margin: '0 auto', padding: '20px 15px', flex: 1 }}>
          <ErrorState message={error} onRetry={onRetry} locale={locale} />
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <Navbar />
        </div>
        <main style={{ maxWidth: '1320px', width: '100%', margin: '0 auto', padding: '20px 15px', flex: 1 }}>
          <EmptyState locale={locale} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Navbar />
      </div>

      <main className="tour-detail-main" style={{ width: '100%', margin: '0 auto', flex: 1 }}>
        <div className="breadcrumb-wrapper">
          <TourBreadcrumb data={data.breadcrumb} />
        </div>

        <div className="header-wrapper">
          <TourHeader data={data.header} />
        </div>

        {/* Two-column layout: main content left, booking sidebar right */}
        <div className="two-column-layout">
          {/* Left column: all content except TourSchedulePrice */}
          <div className="main-content">
            <TourHighlights data={data.highlights} />
            <TourItinerary data={data.itinerary} />
            <TourInclusions data={data.inclusions} />
            <TourExclusions data={data.exclusions} />
            <TourTerms data={data.terms} />
            <TourBookNow data={data.bookNow} />
            <TourReviews data={data.reviews} tourTitle={data.header?.title || ''} />
          </div>

          {/* Right column: only TourSchedulePrice */}
          <div className="sidebar">
            <TourSchedulePrice data={data.schedulePrice} tourId={data.header?.tourCode || "TOUR001"} />
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        /* Desktop styles (default) */
        .tour-detail-main {
          max-width: 1320px;
          padding: 20px 15px;
        }
        .breadcrumb-wrapper {
          margin-bottom: 20px;
        }
        .header-wrapper {
          width: 100%;
          margin-bottom: 25px;
        }
        .two-column-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 30px;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        /* iPad (portrait and landscape) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .tour-detail-main {
            max-width: none;
            padding-left: 24px;
            padding-right: 24px;
          }
          .two-column-layout {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .main-content {
            gap: 20px;
          }
          .sidebar {
            gap: 20px;
            order: -1; /* Đưa phần booking lên đầu trên iPad để dễ thao tác */
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .tour-detail-main {
            max-width: none;
            padding-left: 16px;
            padding-right: 16px;
          }
          .two-column-layout {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .main-content {
            gap: 16px;
          }
          .sidebar {
            gap: 16px;
            order: -1; /* Đưa phần booking lên đầu trên mobile để dễ thao tác */
          }
          .breadcrumb-wrapper {
            margin-bottom: 12px;
          }
          .header-wrapper {
            margin-bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default ToursDetailPage;