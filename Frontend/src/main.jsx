import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import EmailVerify from './components/EmailVerify.jsx'

import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      }, 
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "emailVerify",
        element: <EmailVerify />,
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />

    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
      transition:Bounce
    />
    
    </Provider>
  </React.StrictMode>,
)