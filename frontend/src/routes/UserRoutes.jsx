import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout/UserLayout';
import HomePage from '../pages/HomePage/HomePage';
import HomepageFlight from '../pages/user/flight/HomepageFlight';
import HomepageTransport from '../pages/user/transport/HomepageTransport';
import TransportSearchResults from '../pages/user/transport/TransportSearchResults';
import TransportDetail from '../pages/user/transport/TransportDetail';
import TransportBooking from '../pages/user/transport/TransportBooking';
import TransportPayment from '../pages/user/transport/TransportPayment';
import TransportBookingSuccess from '../pages/user/transport/TransportBookingSuccess';
import ManageTransportBooking from '../pages/user/transport/ManageTransportBooking';
import FlightSearchResults from '../pages/user/flight/FlightSearchResults';
import FlightDetail from '../pages/user/flight/FlightDetail';
import FlightBooking from '../pages/user/flight/FlightBooking';
import FlightPayment from '../pages/user/flight/FlightPayment';
import FlightBookingSuccess from '../pages/user/flight/FlightBookingSuccess';
import ManageBooking from '../pages/user/flight/ManageBooking';
import HomepageHotel from '../pages/user/hotel/HomepageHotel';
import HotelSearchResults from '../pages/user/hotel/HotelSearchResults';
import HotelDetail from '../pages/user/hotel/HotelDetail';
import HotelBooking from '../pages/user/hotel/HotelBooking';
import HotelPayment from '../pages/user/hotel/HotelPayment';
import HotelBookingSuccess from '../pages/user/hotel/HotelBookingSuccess';
import ManageHotelBooking from '../pages/user/hotel/ManageHotelBooking';
import ToursPage from '../pages/ToursPage/ToursPage';
import Tour from '../pages/ToursDetailPage/Tour';
import ToursBooking from '../pages/ToursBookingPage/ToursBooking';
import TourPayments from '../pages/TourPayments/TourPayments';
import PaymentResult from '../pages/PaymentResult';
import UserAccount from '../pages/PersonalProfile/UserAccount';
import ThingsToDo from '../pages/ThingsToDo/ThingsToDo';
import OAuth2RedirectHandler from '../pages/OAuth2RedirectHandler';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<HomepageFlight />} />
        <Route path="/transport" element={<HomepageTransport />} />
        <Route path="/transport/search" element={<TransportSearchResults />} />
        <Route path="/transport/detail/:id" element={<TransportDetail />} />
        <Route path="/transport/booking" element={<TransportBooking />} />
        <Route path="/transport/payment" element={<TransportPayment />} />
        <Route path="/transport/success" element={<TransportBookingSuccess />} />
        <Route path="/transport/manage" element={<ManageTransportBooking />} />
        <Route path="/hotels" element={<HomepageHotel />} />
        <Route path="/hotels/search" element={<HotelSearchResults />} />
        <Route path="/hotels/detail/:id" element={<HotelDetail />} />
        <Route path="/hotels/booking" element={<HotelBooking />} />
        <Route path="/hotels/payment" element={<HotelPayment />} />
        <Route path="/hotels/success" element={<HotelBookingSuccess />} />
        <Route path="/hotels/manage" element={<ManageHotelBooking />} />
        <Route path="/flights/search" element={<FlightSearchResults />} />
        <Route path="/flights/detail/:id" element={<FlightDetail />} />
        <Route path="/flights/booking" element={<FlightBooking />} />
        <Route path="/flights/payment" element={<FlightPayment />} />
        <Route path="/flights/success" element={<FlightBookingSuccess />} />
        <Route path="/flights/manage" element={<ManageBooking />} />
        <Route path="/profile/:tab" element={<UserAccount />} />
        <Route path="/things-to-do" element={<ThingsToDo />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/payment-result" element={<PaymentResult />} />
      </Route>
      <Route path="/tours" element={<ToursPage />} />
      <Route path="/tour/:id" element={<Tour />} />
      <Route path="/tours-booking" element={<ToursBooking />} />
      <Route path="/tours-payment" element={<TourPayments />} />
    </Routes>
  );
};

export default UserRoutes;
