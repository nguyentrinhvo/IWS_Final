import React, { useEffect, useState, useRef } from 'react';
import TransportSearchBox from '../../../components/user/TransportSearchBox';
import { getDaysInMonth, getFirstDayOfMonth, getWeekDays, getMonthName, formatDate } from '../../../utils/SearchUtils';

const TrainIcon = () => (
  <svg width="35px" height="35px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
    <path d="M30.873 19.986V10.51c-.148-.792-19.391 2.355-19.24 3.147v9.476c.15.793 19.39-2.354 19.24-3.147" fill="#000000"></path>
    <path d="M52.367 23.134v-9.476c.152-.792-19.09-3.939-19.24-3.147v9.475c-.15.793 19.09 3.94 19.24 3.148" fill="#000000"></path>
    <ellipse cx="12.439" cy="26.402" rx="1.574" ry="1.535" fill="#000000"></ellipse>
    <path d="M17.018 51.689l7.441 1.278l.369-2.039l-7.441-1.278z" fill="#000000"></path>
    <path d="M39.172 50.928l.369 2.039l7.441-1.278l-.369-2.039z" fill="#000000"></path>
    <ellipse cx="51.562" cy="26.401" rx="1.575" ry="1.535" fill="#000000"></ellipse>
    <ellipse cx="32" cy="27.291" rx="3.352" ry="3.265" fill="#000000"></ellipse>
    <path d="M29.713 36.271c0 1.23 1.025 2.229 2.287 2.229s2.287-.998 2.287-2.229s-1.025-2.226-2.287-2.226s-2.287.996-2.287 2.226m3.359 0c0 .576-.48 1.045-1.072 1.045a1.06 1.06 0 0 1-1.07-1.045c0-.574.48-1.043 1.07-1.043c.592.001 1.072.469 1.072 1.043" fill="#000000"></path>
    <path d="M45.379 30.195l-.285 1.57c-.084.462.299.914.852 1.009l8.008 1.376c.553.094 1.07-.203 1.152-.664l.285-1.571c.084-.462-.297-.913-.852-1.008l-8.008-1.376c-.552-.095-1.07.203-1.152.664" fill="#000000"></path>
    <path d="M49.994 52.668v-.167L56.23 62H62l-8.065-10.567c1.839-.619 2.839-1.518 2.839-2.958V34.292c.02-.071.045-.14.059-.214l.384-2.125a2.102 2.102 0 0 0-.351-1.596c-.027-.04-.063-.071-.092-.109v-17.87c0-1.725-1.824-2.371-3.289-2.89a33.095 33.095 0 0 0-1.113-.369v-.695c0-.304-2.428-1.125-6.088-1.887c.015-.143.043-.281.043-.428c0-2.266-1.88-4.109-4.191-4.109c-2.029 0-3.726 1.423-4.107 3.306A64.707 64.707 0 0 0 32 5c-2.038 0-4.068.122-6.025.306C25.593 3.423 23.896 2 21.867 2c-2.312 0-4.191 1.843-4.191 4.109c0 .146.028.285.043.427c-3.661.762-6.088 1.583-6.088 1.887v.694c-.396.124-.77.248-1.113.369c-1.466.519-3.29 1.165-3.29 2.89l.002 17.868c-.03.039-.066.07-.095.111a2.115 2.115 0 0 0-.35 1.596l.384 2.124c.014.077.039.149.062.222v6.069h-.003v8.107c0 1.44 1 2.339 2.839 2.959L2 62h5.771l6.235-9.497v.165c0 1.284.793 2.338 2.341 3.167L12.439 62H51.56l-3.906-6.166c1.549-.828 2.34-1.882 2.34-3.166m-7.863-14.307v.199c0 .689-1.045 1.156-1.596 1.248c-.754.126-1.662.228-2.66.308v-1.755h4.256m-4.256-2.09v-1.756a32.68 32.68 0 0 1 2.66.309c.551.092 1.596.559 1.596 1.248v.199h-4.256m18.357-4.497l-.385 2.124a1.172 1.172 0 0 1-1.365.931l-9.273-1.594a1.153 1.153 0 0 1-.957-1.331l.385-2.122a1.17 1.17 0 0 1 1.367-.931l9.273 1.592c.641.112 1.069.706.955 1.331M42.135 3c1.762 0 3.191 1.392 3.191 3.109s-1.43 3.109-3.191 3.109s-3.191-1.393-3.191-3.109C38.943 4.392 40.373 3 42.135 3M21.867 3c1.762 0 3.191 1.392 3.191 3.109s-1.43 3.109-3.191 3.109s-3.191-1.393-3.191-3.109C18.676 4.392 20.105 3 21.867 3m-2.585 6.32a4.2 4.2 0 0 0 6.03-.88A64.077 64.077 0 0 1 32 8.066h.006c2.259 0 4.514.144 6.684.373a4.202 4.202 0 0 0 6.03.881c5.848 1.095 10.054 2.581 10.054 3.058v16.966l-8.601-1.477a2.29 2.29 0 0 0-.376-.032a2.167 2.167 0 0 0-2.145 1.772l-.384 2.121a2.11 2.11 0 0 0 .354 1.601c.334.478.838.795 1.418.894l9.272 1.594c.127.021.251.032.374.032c.029 0 .057-.007.086-.007v.431h-10.52v-.832c0-1.039-1.262-1.742-1.928-1.879c-1.215-.253-2.752-.444-4.449-.575v-9.903c0-2.539-11.748-2.539-11.748 0v9.903c-1.698.131-3.235.322-4.449.575c-.666.137-1.928.84-1.928 1.879v.832H9.23v-.431c.028 0 .056.007.084.007c.123 0 .248-.011.373-.032l9.273-1.594a2.17 2.17 0 0 0 1.418-.893a2.12 2.12 0 0 0 .354-1.601l-.385-2.124a2.165 2.165 0 0 0-2.143-1.771c-.124 0-.25.011-.376.032l-8.6 1.477V12.377c0-.477 4.206-1.962 10.054-3.057M32 32.063c-2.705 0-4.898-2.137-4.898-4.772s2.193-4.772 4.898-4.772s4.898 2.137 4.898 4.772s-2.193 4.772-4.898 4.772m3.344 4.208c0 1.801-1.498 3.26-3.344 3.26s-3.342-1.459-3.342-3.26c0-1.797 1.496-3.256 3.342-3.256s3.344 1.46 3.344 3.256m-11.879 3.538c-.551-.092-1.594-.559-1.594-1.248v-.199h4.256v1.755c-1-.081-1.906-.182-2.662-.308m-1.594-3.538v-.199c0-.689 1.043-1.156 1.594-1.248a32.737 32.737 0 0 1 2.662-.309v1.756h-4.256M8.152 33.898l-.384-2.124a1.152 1.152 0 0 1 .956-1.331l9.273-1.592a1.167 1.167 0 0 1 1.365.931l.385 2.122a1.15 1.15 0 0 1-.957 1.331L9.519 34.83a1.177 1.177 0 0 1-1.367-.932m39.842 18.77c0 1.7-4.498 2.763-10.121 3.188v-2.889H26.127v2.889c-5.623-.425-10.121-1.487-10.121-3.188v-2.161c-4.078-.459-6.778-1.137-6.778-2.032V45.15h15.54v3.725h3.02v2.686h2.143v-2.686h4.141v2.686h2.145v-2.686h3.018V45.15h15.541v3.324c0 .896-2.699 1.573-6.779 2.032v2.162z" fill="#000000"></path>
    <path d="M10.049 34.15l8.008-1.376c.553-.097.934-.549.85-1.011l-.283-1.568c-.084-.461-.6-.76-1.154-.664l-8.01 1.376c-.552.095-.934.546-.851 1.008l.284 1.571c.084.461.602.758 1.156.664" fill="#000000"></path>
    <path d="M21.865 8.235c1.205 0 2.184-.951 2.184-2.126s-.979-2.127-2.184-2.127c-1.203 0-2.182.952-2.182 2.127s.979 2.126 2.182 2.126" fill="#000000"></path>
    <ellipse cx="42.135" cy="6.109" rx="2.184" ry="2.126" fill="#000000"></ellipse>
  </svg>
);

const CarIcon = () => (
  <svg fill="#000000" width="35px" height="35px" viewBox="0 -5 34 34" xmlns="http://www.w3.org/2000/svg">
    <path d="m25.678 24v-3.298h-17.819v3.298h-6.306v-8.728c.041-1.668.748-3.164 1.863-4.238l.002-.002-1.823-.3c-.909-.153-1.594-.934-1.594-1.875 0-1.049.851-1.9 1.9-1.9.108 0 .214.009.318.026l-.011-.002 3.127.51c.051.01.095.022.137.036l-.007-.002 2.014-5.126h6.434l.48-2.4h6l.48 2.4h6.062l2.015 5.13c.034-.012.076-.024.12-.033l.008-.001 3.13-.51c.091-.015.196-.024.302-.024.942 0 1.725.684 1.878 1.583l.002.011c.015.091.024.196.024.303 0 .941-.683 1.722-1.579 1.876l-.011.002-2.532.415c1.044 1.065 1.7 2.514 1.739 4.115v.007 3.707c0 .129-.015.254-.043.374l.002-.011v4.655zm-3.884-7.617c.002.699.568 1.265 1.266 1.266h5.087c.699 0 1.266-.567 1.266-1.266s-.567-1.266-1.266-1.266h-5.085c-.698.003-1.264.568-1.266 1.266zm-17.745 0c.001.699.568 1.265 1.266 1.266h5.087c.699 0 1.266-.567 1.266-1.266s-.567-1.266-1.266-1.266h-5.086c-.698.002-1.264.567-1.266 1.265zm2.973-6.608h20.264c.034 0 .067.006.099.006l-2-5.106h-16.354z"></path>
  </svg>
);

const LocationIcon = () => (
  <svg height="24px" width="24px" viewBox="0 0 512 512" fill="#000000">
    <path d="M255.996,0C145.058,0,55.138,89.929,55.138,200.866c0,68.454,34.648,128.363,86.55,165.174 c47.356,33.594,57.811,41.609,74.462,73.4c13.174,25.147,34.541,69.279,34.541,69.279c1.004,2.008,3.052,3.281,5.306,3.281 c2.244,0,4.31-1.274,5.313-3.281c0,0,21.368-44.132,34.541-69.279c16.642-31.791,27.106-39.806,74.454-73.4 c51.91-36.811,86.558-96.72,86.558-165.174C456.862,89.929,366.925,0,255.996,0z M255.996,335.473 c-74.331,0-134.599-60.268-134.599-134.608c0-74.339,60.268-134.607,134.599-134.607c74.339,0,134.606,60.268,134.606,134.607 C390.602,275.205,330.335,335.473,255.996,335.473z"></path>
  </svg>
);

const WayIcon = () => (
  <svg fill="#000000" width="24px" height="24px" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet">
    <path d="M23.43,16.83A1,1,0,0,0,22,18.24L25.72,22H7.83a1,1,0,0,0,0,2H25.72L22,27.7a1,1,0,1,0,1.42,1.41L29.53,23Z"></path>
    <path d="M13.24,18.45a1,1,0,0,0,.71-1.71L10.24,13H28.12a1,1,0,0,0,0-2H10.24l3.71-3.73a1,1,0,0,0-1.42-1.41L6.42,12l6.11,6.14A1,1,0,0,0,13.24,18.45Z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"></path>
  </svg>
);

const RentLocationIcon = () => (
  <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xmlSpace="preserve" width="35px" height="35px" fill="#000000">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <style type="text/css">
        {`.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}
      </style>
      <path d="M29.9,17.5C29.7,17.2,29.4,17,29,17c-2.2,0-4.3,1-5.6,2.8L22.5,21c-1.1,1.3-2.8,2-4.5,2h-3c-0.6,0-1-0.4-1-1s0.4-1,1-1h1.9 c1.6,0,3.1-1.3,3.1-2.9c0,0,0-0.1,0-0.1c0-0.5-0.5-1-1-1l-6.1,0c-3.6,0-6.5,1.6-8.1,4.2l-2.7,4.2c-0.2,0.3-0.2,0.7,0,1l3,5 c0.1,0.2,0.4,0.4,0.6,0.5c0.1,0,0.1,0,0.2,0c0.2,0,0.4-0.1,0.6-0.2c3.8-2.5,8.2-3.8,12.7-3.8c3.3,0,6.3-1.8,7.9-4.7l2.7-4.8 C30,18.2,30,17.8,29.9,17.5z"></path>
      <path d="M19,15c0.9,0,1.8,0.5,2.3,1.1c1.7-2,3.7-4.9,3.7-8.1c0-3.9-3.1-7-7-7s-7,3.1-7,7c0,2.6,1.3,5.1,2.7,7H19z M18,5 c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S16.3,5,18,5z"></path>
    </g>
  </svg>
);

const MOCK_TRAIN_ROUTES = [
  { id: 1, title: 'Hanoi', price: 350000, image: 'https://images.unsplash.com/photo-1555944630-da23b9d107c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Hue', price: 420000, image: 'https://images.unsplash.com/photo-1560662241-11d7c07ce2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Da Nang', price: 480000, image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Nha Trang', price: 560000, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Hai Phong', price: 220000, image: 'https://images.unsplash.com/photo-1562794850-cc5ba1035da3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Ho Chi Minh City', price: 620000, image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 7, title: 'Nghe An', price: 280000, image: 'https://images.unsplash.com/photo-1620959049103-6f345a9fc27c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 8, title: 'Sapa', price: 390000, image: 'https://images.unsplash.com/photo-1508804052314-11d867317ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const FILTER_BUTTONS = [
  "Ha Noi", "Hue", "Da Nang", "Nha Trang", "Hai Phong", "Ho Chi Minh City", "Nghe An", "Other Places"
];

const WORLD_TRAIN_PASSES = [
  { id: 1, title: 'Japan Rail Pass', price: 1890000, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop', filterKey: 'Japan' },
  { id: 2, title: 'Tokyo Wide Pass', price: 520000, image: 'https://images.unsplash.com/photo-1542051841857-5f900e8e17f1?w=800&h=600&fit=crop', filterKey: 'Japan' },
  { id: 3, title: 'Osaka-Kyoto Pass', price: 380000, image: 'https://images.unsplash.com/photo-1559061220-6c96c9dcb6b3?w=800&h=600&fit=crop', filterKey: 'Japan' },
  { id: 4, title: 'Eurail Global Pass', price: 2350000, image: 'https://images.unsplash.com/photo-1519456264917-42d0b52e3d0e?w=800&h=600&fit=crop', filterKey: 'Europe' },
  { id: 5, title: 'France Rail Pass', price: 890000, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop', filterKey: 'Europe' },
  { id: 6, title: 'Germany Rail Pass', price: 980000, image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop', filterKey: 'Europe' },
  { id: 7, title: 'Korail Pass', price: 750000, image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop', filterKey: 'South Korea' },
  { id: 8, title: 'Seoul-Busan Pass', price: 420000, image: 'https://images.unsplash.com/photo-1504035468969-4b268613ed5f?w=800&h=600&fit=crop', filterKey: 'South Korea' },
  { id: 9, title: 'Hong Kong MTR Pass', price: 180000, image: 'https://images.unsplash.com/photo-1518620531417-8ef20b5f8b75?w=800&h=600&fit=crop', filterKey: 'Hong Kong (China)' },
  { id: 10, title: 'Taiwan TR-Pass', price: 320000, image: 'https://images.unsplash.com/photo-1513706510235-c63c9dda6c76?w=800&h=600&fit=crop', filterKey: 'Taiwan (China)' },
  { id: 11, title: 'Taipei-Kaohsiung Pass', price: 290000, image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&h=600&fit=crop', filterKey: 'Taiwan (China)' },
  { id: 12, title: 'Thai Railway Pass', price: 250000, image: 'https://images.unsplash.com/photo-1583491470869-d4677e11c5f0?w=800&h=600&fit=crop', filterKey: 'Thailand' },
  { id: 13, title: 'Bangkok-Chiang Mai Pass', price: 310000, image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop', filterKey: 'Thailand' },
  { id: 14, title: 'Indonesia Rail Pass', price: 280000, image: 'https://images.unsplash.com/photo-1564665285942-68a85ded4b0f?w=800&h=600&fit=crop', filterKey: 'Indonesia' },
  { id: 15, title: 'Java Explorer Pass', price: 390000, image: 'https://images.unsplash.com/photo-1523707611943-e935f0eb5da3?w=800&h=600&fit=crop', filterKey: 'Indonesia' }
];

const WORLD_FILTER_BUTTONS = [
  "Japan", "Europe", "South Korea", "Hong Kong (China)", "Taiwan (China)", "Thailand", "Indonesia"
];

const MOCK_HOT_LOCATIONS = [
  "Noi Bai International Airport",
  "Tan Son Nhat International Airport",
  "Da Nang International Airport",
  "Hanoi Old Quarter",
  "Ben Thanh Market"
];

const MOCK_RENTAL_LOCATIONS = [
  { id: 1, title: 'Hanoi', available: 'Over 20 idle vehicles are waiting for you', image: 'https://images.unsplash.com/photo-1555944630-da23b9d107c9?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Ho Chi Minh City', available: 'Over 35 idle vehicles are waiting for you', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Da Nang', available: 'Over 15 idle vehicles are waiting for you', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Hue', available: 'Over 10 idle vehicles are waiting for you', image: 'https://images.unsplash.com/photo-1560662241-11d7c07ce2c8?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Nha Trang', available: 'Over 18 idle vehicles are waiting for you', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Hoi An', available: 'Over 12 idle vehicles are waiting for you', image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=800&q=80' },
  { id: 7, title: 'Phu Quoc', available: 'Over 25 idle vehicles are waiting for you', image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=800&q=80' },
  { id: 8, title: 'Da Lat', available: 'Over 14 idle vehicles are waiting for you', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&w=800&q=80' }
];

const HomepageTransport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeFilter, setActiveFilter] = useState("Ha Noi");
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const [activeWorldFilter, setActiveWorldFilter] = useState("Japan");
  const worldScrollRef = useRef(null);
  const [worldShowLeftArrow, setWorldShowLeftArrow] = useState(false);
  const [worldShowRightArrow, setWorldShowRightArrow] = useState(true);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [wayType, setWayType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const carBookRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (carBookRef.current && !carBookRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRoutes = MOCK_TRAIN_ROUTES.filter(route =>
    activeFilter === "Other Places"
      ? !FILTER_BUTTONS.slice(0, -1).includes(route.title)
      : route.title === activeFilter
  );

  const filteredWorldPasses = WORLD_TRAIN_PASSES.filter(pass => pass.filterKey === activeWorldFilter);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const checkWorldScrollButtons = () => {
    if (worldScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = worldScrollRef.current;
      setWorldShowLeftArrow(scrollLeft > 0);
      setWorldShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380 + 20;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollWorld = (direction) => {
    if (worldScrollRef.current) {
      const scrollAmount = 375 + 20;
      const newScrollLeft = direction === 'left'
        ? worldScrollRef.current.scrollLeft - scrollAmount
        : worldScrollRef.current.scrollLeft + scrollAmount;
      worldScrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      setTimeout(checkWorldScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [filteredRoutes]);

  useEffect(() => {
    checkWorldScrollButtons();
    window.addEventListener('resize', checkWorldScrollButtons);
    return () => window.removeEventListener('resize', checkWorldScrollButtons);
  }, [filteredWorldPasses]);

  const formatVND = (price) => price.toLocaleString('vi-VN') + ' VND';

  const handleCardClick = (title, price) => {
    console.log(`Booking for ${title} - ${formatVND(price)}`);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const weekDays = getWeekDays('en');

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isPast = date < today;
      const isSelected = selectedDate && date.getTime() === selectedDate.getTime();

      days.push(
        <button
          key={`day-${i}`}
          disabled={isPast}
          onClick={() => {
            setSelectedDate(date);
            setActiveDropdown(null);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-100 text-black'}
            ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
          `}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentMonth(new Date(year, month - 1, 1));
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-semibold text-lg">{getMonthName(currentMonth, 'en')}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentMonth(new Date(year, month + 1, 1));
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 w-8">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </div>
    );
  };

  return (
    <main className="w-full flex flex-col items-center bg-gray-50/30 pb-20 overflow-visible">
      <div className="relative w-full min-h-[500px] flex flex-col items-center justify-start z-30 overflow-visible">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://cdn-media.sforum.vn/storage/app/media/ctvseo_maihue/hinh-nen-nui-doi/hinh-nen-nui-doi-41.jpg')"
          }}
        ></div>

        <div className="relative z-20 w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center px-4 md:px-6 py-12 md:py-20 overflow-visible">
          <div className="w-full max-w-[1400px] overflow-visible">
            <TransportSearchBox />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] px-4 pt-8 relative z-20">

        <div className="w-full flex flex-col gap-4 mb-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <TrainIcon />
              <h2 className="text-[#180B51] font-bold text-[25px]">
                Popular train routes
              </h2>
            </div>
            <p className="text-[#180B51] text-[16px] opacity-80 pl-1">
              Explore Vietnam's most beautiful routes by rail or road with our extensive network.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {FILTER_BUTTONS.map((city) => (
              <button
                key={city}
                onClick={() => setActiveFilter(city)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === city
                  ? "bg-[#7C70EB] text-white shadow-md"
                  : "bg-white border border-gray-200 text-[#180B51] hover:bg-gray-50"
                  }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="relative group mt-4">
            {showLeftArrow && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all -translate-x-3 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollButtons}
              className="flex overflow-x-auto scroll-smooth gap-5 pb-4 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="w-[380px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col"
                  >
                    <div className="h-[180px] overflow-hidden">
                      <img
                        src={route.image}
                        alt={route.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-black">{route.title}</h3>
                        <button
                          onClick={() => handleCardClick(route.title, route.price)}
                          className="text-black hover:scale-110 transition-transform"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-2">
                        <p className="text-yellow-400 font-bold text-lg">{formatVND(route.price)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-500">No train routes available for {activeFilter}</p>
                </div>
              )}
            </div>
            {showRightArrow && filteredRoutes.length > 3 && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all translate-x-3 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mb-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <TrainIcon />
              <h2 className="text-[#180B51] font-bold text-[25px]">
                Explore worldwide with train travel passes
              </h2>
            </div>
            <p className="text-[#180B51] text-[16px] opacity-80 pl-1">
              Discover convenient and affordable train passes for your next international adventure.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {WORLD_FILTER_BUTTONS.map((country) => (
              <button
                key={country}
                onClick={() => setActiveWorldFilter(country)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeWorldFilter === country
                  ? "bg-[#7C70EB] text-white shadow-md"
                  : "bg-white border border-gray-200 text-[#180B51] hover:bg-gray-50"
                  }`}
              >
                {country}
              </button>
            ))}
          </div>

          <div className="relative group mt-4">
            {worldShowLeftArrow && (
              <button
                onClick={() => scrollWorld('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all -translate-x-3 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div
              ref={worldScrollRef}
              onScroll={checkWorldScrollButtons}
              className="flex overflow-x-auto scroll-smooth gap-5 pb-4 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredWorldPasses.length > 0 ? (
                filteredWorldPasses.map((pass) => (
                  <div
                    key={pass.id}
                    className="w-[375px] h-[460px] bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col"
                  >
                    <div className="h-[190px] overflow-hidden">
                      <img
                        src={pass.image}
                        alt={pass.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <h3 className="text-center text-2xl font-bold text-black mt-2">{pass.title}</h3>
                      <div className="flex items-center justify-between mt-6">
                        <p className="text-yellow-400 font-bold text-lg">{formatVND(pass.price)}</p>
                        <button
                          onClick={() => handleCardClick(pass.title, pass.price)}
                          className="text-black hover:scale-110 transition-transform"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-500">No train passes available for {activeWorldFilter}</p>
                </div>
              )}
            </div>
            {worldShowRightArrow && filteredWorldPasses.length > 3 && (
              <button
                onClick={() => scrollWorld('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all translate-x-3 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3">
            <CarIcon />
            <h2 className="text-[#180B51] font-bold text-[25px]">
              Book a car online
            </h2>
          </div>

          <div className="w-full max-w-[1100px] bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row gap-8 shadow-sm mt-2">
            <div className="w-full md:w-[500px] h-[350px] flex-shrink-0 rounded-xl overflow-hidden">
              <img
                src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/172150/Originals/taxi-dien-vinfast-1-1.png"
                alt="Car Rental"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-5" ref={carBookRef}>

              <div className="relative">
                <div
                  onClick={() => setActiveDropdown(activeDropdown === 'pickup' ? null : 'pickup')}
                  className="flex items-center gap-3 w-full border border-gray-300 rounded-xl p-3 cursor-pointer bg-white"
                >
                  <LocationIcon />
                  <span className={`flex-1 text-base ${pickup ? 'text-black' : 'text-gray-400'}`}>
                    {pickup || "Enter pickup location"}
                  </span>
                </div>
                <div className={`absolute left-0 right-0 top-full mt-2 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === 'pickup' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                  {MOCK_HOT_LOCATIONS.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setPickup(loc); setActiveDropdown(null); }}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 text-black"
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  onClick={() => setActiveDropdown(activeDropdown === 'dropoff' ? null : 'dropoff')}
                  className="flex items-center gap-3 w-full border border-gray-300 rounded-xl p-3 cursor-pointer bg-white"
                >
                  <LocationIcon />
                  <span className={`flex-1 text-base ${dropoff ? 'text-black' : 'text-gray-400'}`}>
                    {dropoff || "Enter drop-off location"}
                  </span>
                </div>
                <div className={`absolute left-0 right-0 top-full mt-2 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === 'dropoff' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                  {MOCK_HOT_LOCATIONS.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setDropoff(loc); setActiveDropdown(null); }}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 text-black"
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  onClick={() => setActiveDropdown(activeDropdown === 'way' ? null : 'way')}
                  className="flex items-center gap-3 w-full border border-gray-300 rounded-xl p-3 cursor-pointer bg-white"
                >
                  <WayIcon />
                  <span className={`flex-1 text-base ${wayType ? 'text-black' : 'text-gray-400'}`}>
                    {wayType || "One-way / Two-way"}
                  </span>
                </div>
                <div className={`absolute left-0 right-0 top-full mt-2 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === 'way' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                  {["One-way", "Two-way"].map((type, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setWayType(type); setActiveDropdown(null); }}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 text-black"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
                  className="flex items-center gap-3 w-full border border-gray-300 rounded-xl p-3 cursor-pointer bg-white"
                >
                  <CalendarIcon />
                  <span className={`flex-1 text-base ${selectedDate ? 'text-black' : 'text-gray-400'}`}>
                    {selectedDate ? formatDate(selectedDate, 'en') : "Select Date"}
                  </span>
                </div>
                <div className={`absolute left-0 right-0 top-full mt-2 z-50 transition-all duration-300 ease-in-out ${activeDropdown === 'date' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                  {renderCalendar()}
                </div>
              </div>

              <button className="w-full bg-[#180B51] text-white font-bold py-3 px-4 rounded-xl hover:bg-opacity-90 transition-all mt-2">
                Check Price
              </button>

            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3">
            <RentLocationIcon />
            <h2 className="text-[#180B51] font-bold text-[25px]">
              Where do you need to rent a car?
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-[20px] w-full mt-2">
            {MOCK_RENTAL_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="relative w-full h-[290px] rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={loc.image}
                  alt={loc.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 w-full pr-4">
                  <h3
                    className="text-white font-bold text-xl"
                    style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                  >
                    {loc.title}
                  </h3>
                  <p
                    className="text-white text-[11px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                  >
                    {loc.available}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default HomepageTransport;