"use client";

import ProtectedRoute from "./components/ProtectionRoute/ProtectionRoute";
import LogoOnlyLayout from "./components/Lauout";
import Login from "./login/page";
import {useRouter} from "next/navigation";
export default function Home() {
    const router = useRouter();

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
