import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import ProtectedRoute from "./components/Protectedroute";

// Creating a routes object with routes and their corresponding components
const routes = [
    {
        path: "/", // Route for the home page
        element: <HomePage />, // Component to render for the home page
    },
    {
        path: "/questions", // Route for the quiz page
        element: (
            <ProtectedRoute>
                <QuizPage />
            </ProtectedRoute>
        ), // Protecting the QuizPage route
    },
    {
        path: "/result", // Route for the result page
        element: (
            <ProtectedRoute>
                <ResultPage />
            </ProtectedRoute>
        ), // Protecting the ResultPage route
    },
];

export default routes;