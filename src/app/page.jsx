"use client";

import ProtectedRoute from "./components/ProtectionRoute/ProtectionRoute";
import Login from "./login/page";
export default function Home() {

    // const dispatch = useDispatch();
    // const { status, entities, error } = useSelector((state) => state.userListSlice);
    // useEffect(() => {
    //     dispatch(listUser({}))
    // }, []);

  return (
           <ProtectedRoute>
               <Login/>
           </ProtectedRoute>
  );
}
