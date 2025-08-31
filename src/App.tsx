import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
const Setting = React.lazy(()=> import('@/pages/admin/settings/Setting'));
const Login = React.lazy(()=> import('@/pages/login/Login'));
const Home = React.lazy(()=> import('@/pages/home/Home'));
const PageNotFound = React.lazy(()=> import('@/pages/PageNotFound')); 
const Signup = React.lazy(()=> import('@/pages/signup/Signup'))
const AdminDashboard = React.lazy(()=> import('@/pages/admin/dashboard/Dashboard'))
const AdminLogin =  React.lazy(()=> import('@/pages/admin/login/Login'));
const PrivateAdminRoute = React.lazy(()=> import('@/PrivateRoute'));
const Profile = React.lazy(()=> import('@/pages/admin/profile/Profile'));
const Spinner = React.lazy(()=> import('@/components/spinner/Spinner'));
import { Toaster } from '@/components/ui/sonner'
const User = React.lazy(() => import('./pages/admin/users/User'));
const Dashboard = React.lazy(()=> import('@/pages/dashboard/Dashboard'));
function App() {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Toaster position="top-center" theme="light" />
          <Routes>
            {/* User protected Routes */}
            <Route path="/" element={<PrivateAdminRoute />} >
              <Route index element={<Home />} />
              <Route element={<Dashboard />} />
            </Route>
            {/* User Route end here */}
            {/* Admin protected Route start here */}
            <Route path="/admin" element={<PrivateAdminRoute />}> 
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<User />} />
              <Route path="settings" element={<Setting />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* Admin Route end here */}

            {/* unprotected routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path='/admin/login' element={<AdminLogin />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
