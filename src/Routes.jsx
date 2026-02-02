import { useEffect } from "react";
import { 
    useNavigate, 
    useRoutes, 
    useLocation,
    Navigate
} 
from 'react-router-dom';

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepository from "./components/repo/CreateRepository";


// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=> {
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage)
        }

        if(!userIdFromStorage && !["/auth", "/signup"].includes(location.pathname) && location.pathname !== "/auth"){
            navigate("/auth", { replace: true });
        }

        if(userIdFromStorage && ["/auth", "/signup"].includes(location.pathname)){
            navigate("/", { replace: true });
        }
    }, [
        currentUser, 
        location.pathname,
        navigate, 
        setCurrentUser
    ]);

    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        },
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/profile",
            element:<Profile/>
        },
        {
            path:"/create",
            element:<CreateRepository/>
        },
        { 
            path: "*", 
            element: <Navigate to="/auth" replace /> 
        }
    ]);


    return element;
}

export default ProjectRoutes;

