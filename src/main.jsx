import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import ErrorPage from './ErrorPage';
import HomePage from './components/HomePage/HomePage';
import BlogPage from './components/BlogPage/BlogPage';
import FunctionPage from './components/Function/FunctionPage';

import store from './app/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PostPage, {loader as postLoader} from './features/blog/components/PostPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: '/blog/:slug',
        element: <PostPage />,
        loader: postLoader
      },
      {
        path: 'function',
        element: <FunctionPage />
      }
    ]
  }
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
)
