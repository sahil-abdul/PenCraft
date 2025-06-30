import config from "./config/config";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
// import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./fetures/authentication/authSlice";
import authUser from "./appwrite/auth";
import { PostForm } from "./components/index";

function App() {
  // console.log({ config });
  const [loading, setLoading] = useState(true);
  const usedispatch = useDispatch();

  useEffect(() => {
    authUser
      .getCurrentUser()
      .then((user) => {
        if (user) {
          usedispatch(logIn(user));
        } else {
          usedispatch(logOut());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col ">
      <div className="min-h-screen flex items-center bg-[#d0b8ac] flex-col p-1.5 flex-grow gap-3.5">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;

  // return (
  //   <div>
  //     <h1>sarting the new mega project callde : penCraft</h1>
  //     <Header />
  //     todo: {/*<Outlet/> */}
  //     <Footer />
  //   </div>
  // )
}

export default App;
