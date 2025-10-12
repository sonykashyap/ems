import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
const Setting = React.lazy(()=> import('@/pages/settings/Setting'));
const Login = React.lazy(()=> import('@/pages/login/Login'));
const Home = React.lazy(()=> import('@/pages/home/Home'));
const PageNotFound = React.lazy(()=> import('@/pages/PageNotFound')); 
const Signup = React.lazy(()=> import('@/pages/signup/Signup'))
const PrivateAdminRoute = React.lazy(()=> import('@/PrivateRoute'));
const Profile = React.lazy(()=> import('@/pages/profile/Profile'));
const Spinner = React.lazy(()=> import('@/components/spinner/Spinner'));
const User = React.lazy(() => import('./pages/users/User'));
const Reports = React.lazy(() => import('./pages/reports/Reports'));
const Dashboard = React.lazy(()=> import('@/pages/dashboard/Dashboard'));
const Roles = React.lazy(() => import('./pages/roles/Role'));
const Events = React.lazy(() => import('./pages/events/Event'));
const Announcements = React.lazy(() => import('./pages/announcements/Announcement'));
const Leaves = React.lazy(() => import('./pages/leaves/Leave'));
const Notifications = React.lazy(() => import('./pages/notifications/Notification'));

function App() {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Toaster position="top-center" theme="light" />
          <Routes>
            {/* User protected Routes */}
            <Route path="/" element={<PrivateAdminRoute />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
               <Route path="users" element={<User />} />
              <Route path="settings" element={<Setting />} />
              <Route path="profile" element={<Profile />} />
              <Route path="reports" element={<Reports />} />
              <Route path="roles" element={<Roles />} />
              <Route path="events" element={<Events />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/notifications" element={<Notifications />} />
              {/* <Route element={<Home />} /> */}
              {/* <Route path="profile" element={<UserProfile />} /> */}
            {/* </Route> */}
            {/* User Route end here */}
            {/* Admin protected Route start here */}
            {/* <Route path="/admin" element={<PrivateAdminRoute />}> */}
              {/* <Route index element={<Navigate to="/admin/dashboard" />} /> */}
              {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
             
            </Route>
            {/* Admin Route end here */}

            {/* unprotected routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
            {/* <Route path='/admin/login' element={<AdminLogin />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
