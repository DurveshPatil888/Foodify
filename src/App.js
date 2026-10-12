import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import { Outlet } from 'react-router-dom';
import RestaurantMenu from './components/RestaurantMenu';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import appStore from './utils/redux/appStore';
import Cart from './components/Cart';
import Login from './components/Login'; //not using key ( not acceptable )<<<< index as key <<<<<<<<<<<< unique id (best practice) if u not have id then use index
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app min-h-screen bg-white font-sans text-slate-900">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/restaurants/:resId/:resName',
        element: <RestaurantMenu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
