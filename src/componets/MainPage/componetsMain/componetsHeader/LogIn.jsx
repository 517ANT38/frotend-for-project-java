import { Link } from "react-router-dom";

function LogIn(){
    return (
        <div className="logIn">
            <Link to="/auth/login" className="link">Войти</Link>
        </div>
    );
}
export default LogIn;