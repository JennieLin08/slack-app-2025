// import { useState } from 'react'
import './App.css'
// import { BrowserRouter, Routes, Route } from "react-router";
import { Routes, Route, Outlet, Navigate } from "react-router";
import { useNavigate } from 'react-router';
import Login from './pages/login/Login';
import Dashboard from './pages/user/Dashboard';
import Nopage from './pages/user/Nopage';
import UserLayout from './templates/UserLayout';
import Registration from './pages/register/Registration';
import Chat from './pages/user/Chat';
import Channel from './pages/user/Channel';
import isLogin from './helpers/isLogin';

function App() {
  // const [count, setCount] = useState(0)
  isLogin();

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="*" element={<Nopage />} />

      <Route path="/pages/user/" element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chat/:id" element={<Chat />} />
        <Route path="channel/:id" element={<Channel />} />
        {/* <Route path="register" element={<Register />} /> */}
      </Route>

      {/* <Route path="/pages/user/" element={<UserMain />} >
        <Route path="dashboard" element={<UserDashboard />} />
        <Route index element={<UserDashboard />} />
        <Route path="transactions" element={<UserTransaction />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="budget" element={<BudgetTx />} />
      </Route> */}

      {/* <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
    </Routes>
  )
}

export default App
