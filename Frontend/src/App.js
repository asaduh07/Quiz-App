import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { useEffect } from 'react';
import axios from 'axios';
import { data } from './data/data';
const App = () => {

  useEffect(() => {
    // Define an async function to post data
    const postData = async () => {
      const { uniqueTags, questions } = data;
      try {
        // Post tags
        const tagsResponse = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/tags`, {
          uniqueTags
        });
        // Check if the response indicates success
        if (tagsResponse.data.success) {
          console.log("Tags loaded successfully");
        } else {
          console.error("Failed to load tags:", tagsResponse.data.message || "No message provided");
        }

        // Post questions
        const questionsResponse = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/questions`, { questions });
        // Check if the response indicates success
        if (questionsResponse.data.success) {
          console.log("Questions loaded successfully");
        } else {
          console.error("Failed to load questions:", questionsResponse.data.message || "No message provided");
        }

      } catch (error) {
        console.error("Something went wrong while loading data:", error);
      }
    };

    // Call the async function
    postData();
  }, []); // Empty dependency array to run only once




  // Creating the router with the imported routes
  const router = createBrowserRouter(routes);


  // Rendering the RouterProvider component with the created router
  return <RouterProvider router={router} />;

};

export default App;
