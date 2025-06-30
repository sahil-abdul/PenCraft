import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, autheticated = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (autheticated && authStatus !== autheticated) {
      console.log("navigating to logIn");
      navigate("/logIn");
    } else if (!autheticated && authStatus !== autheticated) {
      console.log("navigating to home page");
      navigate("/");
    }

    setLoader(false);
  }, [navigate, authStatus, autheticated]);
  return loader ? <div>Loading...</div> : <div>{children}</div>;
}
