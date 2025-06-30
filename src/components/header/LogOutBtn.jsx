import { useDispatch } from "react-redux";
import authUser from "../../appwrite/auth";
import { logOut } from "../../fetures/authentication/authSlice";
import { useNavigate } from "react-router-dom";

function LogOutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
   await authUser.logOut().then(() => {
      dispatch(logOut());
    });
    navigate("/")
  };

  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-[#f3d8c7] rounded-full" onClick={handleLogOut}>
      Log out
    </button>
  );
}

export default LogOutBtn;
