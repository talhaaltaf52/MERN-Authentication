import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, dispatchGetUser } from "../Redux/Actions/AuthActions";

const useAdmin = () => {
  const { token } = useSelector((state) => state.TokenReducer);
  const { isSuperAdmin, isAdmin } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        return await fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return { isSuperAdmin, isAdmin };
};

export default useAdmin;
