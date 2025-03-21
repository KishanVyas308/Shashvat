import { useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { Navigate, Outlet } from "react-router-dom";

const CheckIsUser = () => {
  const user = useRecoilValue(userAtom);

  if (user === null) {
    // Redirect to login if not logged in
    alert("Please first log-in!");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default CheckIsUser;
