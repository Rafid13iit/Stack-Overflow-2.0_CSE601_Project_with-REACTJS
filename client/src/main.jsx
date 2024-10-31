import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./pages/HomePage.jsx";
import LoginScreen from "./pages/LoginPage.jsx";
import RegisterScreen from "./pages/RegisterPage.jsx";
import ProfileScreen from "./pages/ProfilePage.jsx";
import CreatePostScreen from "./pages/CreatePostPage.jsx";
import GetPostScreen from "./pages/GetPostPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import NotificationScreen from "./pages/NotificationPage.jsx";
import ViewPostScreen from "./pages/ViewPostPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Protected routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/create-post" element={<CreatePostScreen />} />{" "}
        {/* Create Post is now a private route */}
        <Route path="/posts" element={<GetPostScreen />} />{" "}
        {/* Add GetPostScreen to display posts */}
        <Route path="/posts/:id" element={<ViewPostScreen />} />
        <Route path="/notifications" element={<NotificationScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
