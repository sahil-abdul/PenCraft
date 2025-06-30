import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import { LogIn, Protected, SignUp } from "./components/index.js";
// import Post from "./components/pages/LogIn.jsx";
import Post from "./components/pages/Post.jsx"
import AllPost from "./components/pages/AllPost.jsx";
import AddPost from "./components/pages/AddPost.jsx";
import EditPost from "./components/pages/EditPost.jsx"


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
        path: "logIn",
        element: (
          <Protected autheticated={false}>
            <LogIn />
          </Protected>
        ),
      },
      {
        path: "signUp",
        element: (
          <Protected autheticated={false}>
            <SignUp />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: <AddPost />,
      },
      {
        path: "all-post",
        element: (
          <Protected autheticated>
            <AllPost />
          </Protected>
        ),
      },
      {
        path: "post/:slug",
        element: <Post />,
      },
      {
        path: "edit-post/:slug",
        element: (
          <Protected autheticated>
            <EditPost/>
          </Protected>
        )
      },
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
