import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useRootSelector, useRootDispatch } from './store/hooks';
import { selectAuthLoading, selectAuthLoggedIn, selectAuthToken } from './store/selectors';
import { createAuthenticateActionThunk } from './store/action-creators';

import HomePage from './pages/home-page';
import GalleryPage from './pages/gallery-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page/index';
import ProfilePage from './pages/profile-page';
import OrderPage from './pages/order-page';
import AdminPage from './pages/admin-page';
import AdminProductPage from './pages/admin-page/admin-products-page';
import CreateNewProductPage from './pages/admin-page/admin-products-page/create-new-product-page';
import UpdateProductPage from './pages/admin-page/admin-products-page/update-product-page';

import VisitorLayout from './layouts/visitor-layout';
import RequireAuth from './routing/require-auth';
import RequireVisitor from './routing/require-visitor';

const App: React.FC = () => {
  const location = useLocation();
  const token = useRootSelector(selectAuthToken);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const loading = useRootSelector(selectAuthLoading);
  const dispatch = useRootDispatch();

  if (!loggedIn && token) {
    if (!loading) {
      dispatch(createAuthenticateActionThunk(token, location.pathname));
    }
    return <div />;
  }

  return (
    <Routes>
      <Route path="/" element={<VisitorLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/admin" element={<RequireAuth><AdminPage /></RequireAuth>} />
        <Route path="/admin/products" element={<RequireAuth><AdminProductPage /></RequireAuth>} />
        <Route path="/admin/products/create" element={<RequireAuth><CreateNewProductPage /></RequireAuth>} />
        <Route path="/admin/products/update/:id" element={<RequireAuth><UpdateProductPage /></RequireAuth>} />
        <Route path="/auth/gallery-page" element={(<GalleryPage />)} />
        <Route path="/auth/order-page" element={(<RequireAuth><OrderPage /></RequireAuth>)} />
        <Route path="auth/login" element={(<RequireVisitor><LoginPage /></RequireVisitor>)} />
        <Route path="auth/register" element={(<RequireVisitor><RegisterPage /></RequireVisitor>)} />
        <Route path="profile" element={(<RequireAuth><ProfilePage /></RequireAuth>)} />
      </Route>
    </Routes>
  );
};

export default App;
