import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from'./pages/Signup'
import Allpost from './pages/Allpost';
import Addpost from './pages/Addpost'
import Editpost from './pages/Editpost';
import { createBrowserRouter } from 'react-router-dom';
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/all-post',
        element:<Allpost/>
      },
      {
        path:'/add-post',
        element:<Addpost/>
      },
      {
        path:'/edit-post',
        element:<Editpost/>
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
