import React, { Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import FortgotPassword from './pages/forgot-password/index';
import Chatbot from './components/chatbot/Chatbot';
import { Button } from './components/ui/button';
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
const Projects = React.lazy(() => import('./pages/projects/Projects'));
const Dashboard = React.lazy(()=> import('@/pages/dashboard/Dashboard'));
const Roles = React.lazy(() => import('./pages/roles/Role'));
const Events = React.lazy(() => import('./pages/events/Event'));
const Announcements = React.lazy(() => import('./pages/announcements/Announcement'));
const Leaves = React.lazy(() => import('./pages/leaves/Leave'));
const Notifications = React.lazy(() => import('./pages/notifications/Notification'));
const Policies = React.lazy(() => import('./pages/policies/Policy'));
const Attendance = React.lazy(() => import('./pages/attendance/Attendance'));

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Toaster position="top-center" theme="light" />
          <Button 
            className="fixed bottom-4 z-1 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg" 
            onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
            ChatBot
          </Button>
          {isChatbotOpen && <Chatbot />}
          <Routes>
            {/* User protected Routes */}
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route path="/" element={<PrivateAdminRoute />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
               <Route path="users" element={<User />} />
              <Route path="settings" element={<Setting />} />
              <Route path="users/profile" element={<Profile />} />
              <Route path="reports" element={<Reports />} />
              <Route path="roles" element={<Roles />} />
              <Route path="events" element={<Events />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="leaves" element={<Leaves />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="policies" element={<Policies />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="projects" element={<Projects />} />
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

            {/* unprotected public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<FortgotPassword />} />
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
