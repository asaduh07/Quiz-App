import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import routes from './routes';

const App = () => {
  
// Creating the router with the imported routes
  const router = createBrowserRouter(routes);


   // Rendering the RouterProvider component with the created router
  return <RouterProvider router={router} />;

};

export default App;
