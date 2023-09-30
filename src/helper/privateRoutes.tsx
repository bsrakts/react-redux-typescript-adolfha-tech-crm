import React from "react";
import { Navigate } from "react-router-dom";



interface Props {
    isAuthenticated: boolean
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({isAuthenticated, children}) => {
    if(isAuthenticated){
        return <>{children}</>
    }

    return <Navigate to='/login'/>
}

export default PrivateRoute