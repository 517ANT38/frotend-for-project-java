import { Link } from "react-router-dom";

function NavAuth(){
    return (
        <div className="navAuth">
            <p> <span> Не зарегистрированы?</span>   <Link to="/auth/registaration" className='authRef'>Регистрация</Link></p>
            <p><span>Хотите стать курьером ?</span> <Link to="/auth/registaration/courier" className="authRef">Стать курьером</Link></p>
        </div>
    )
}
export default NavAuth;