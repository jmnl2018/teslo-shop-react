import { createBrowserRouter, Navigate } from "react-router";

import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashBoardPage } from "./admin/pages/dashboard/DashBoardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { lazy } from "react";
import { AdminRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";

/* 
    lazy sirve para cargar el código de un componente solo cuando se necesita, 
    en vez de incluirlo en el bundle inicial. Es lazy loading (carga diferida) aplicado a las rutas.
    Para que la importación del lazy  funcione se tiene que configurar la exportacion por defecto de esos componentes
*/
const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));

export const appRouter = createBrowserRouter([
    // Main routes
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            //Cuando son rutas hijas no inician con /
            {
                path: 'product/:idSlug',
                element: <ProductPage />
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]
    },
    // Auth routes
    {
        path: '/auth',
        element:
            <NotAuthenticatedRoute>
                <AuthLayout />
            </NotAuthenticatedRoute>,
        children: [
            {
                // Esto sirve por si solo ingresan auth automaticamente lo redireccione a /auth/login
                index: true,
                element: <Navigate to="/auth/login" />
            },
            //Cuando son rutas hijas no inician con /
            {
                path: 'login',
                element: <LoginPage />,

            },
            {
                path: 'register',
                element: <RegisterPage />,
            }
        ]
    },
    // Admin routes
    {
        path: '/admin',
        element:
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>,
        children: [
            {
                index: true,
                element: <DashBoardPage />
            },
            //Cuando son rutas hijas no inician con /
            {
                path: 'products',
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }

])