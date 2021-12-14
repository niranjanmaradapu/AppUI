import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = "token from cookie";
    return <Route {...rest} render={(props) => (
        user !== null
            ? <Component {...props} user={user} />
            : <Redirect to='/' /> 
        )} 
    />
}
export default  PrivateRoute;