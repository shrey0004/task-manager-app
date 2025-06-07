import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import Dashboard from '../pages/Dashboard';
import TasksPage from '../pages/TasksPage';
import TaskDetailPage from '../pages/TaskDetailPage';
import UsersPage from '../pages/UsersPage';
import NotFound from '../pages/NotFound';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);
  return token && user.role === 'admin' ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks/:id"
        element={
          <PrivateRoute>
            <TaskDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
