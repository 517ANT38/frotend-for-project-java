import { NavLink } from "react-router-dom";
function NavInFooter(){
    return (
        <nav className="footerNav" >
                <p>
                    <NavLink className="inFooter colorGray" to={"/contact"}>
                        Контакты
                    </NavLink>
                </p>
                <p>
                    <NavLink className="inFooter colorGray" to={"/BecomeCourier"}>
                        Стать курьером
                    </NavLink>
                </p>
        </nav>
    )
}
export default NavInFooter;