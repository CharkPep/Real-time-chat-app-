import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Banner from "./routes/Banner.tsx";

const serverUri = 'localhost:5000'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "httpServer",
        element : <Banner fetchUri={`http://${serverUri}`} ></Banner>
    }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
