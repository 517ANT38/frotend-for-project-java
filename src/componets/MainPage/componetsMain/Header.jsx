import SearchBar from "./componetsHeader/SearchBar"
import Logo from "./componetsHeader/Logo"
import ButtonGetKarta from "./componetsHeader/ButtonGetKarta";
import LogIn from "./componetsHeader/LogIn";
import { CtxMapOpen } from "../../../Contexts/Contexts";
import { useState } from "react";
import Prealoder from "../map/Prealoder";
import { useAuth } from "../../../security/auth";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import imgPerson from "./../../../images/Person.svg"
import { useNavigate } from "react-router-dom";

function Header(){
    const [state,setState]=useState();
    const {user}=useAuth();
    const nav=useNavigate();
    return (
        <CtxMapOpen.Provider value={setState}>
            <header className="mainHeader">
                <div className="unificationDiv">
                    <Logo/>
                    <SearchBar />
                    <ButtonGetKarta/>
                </div>
                {(!user)&&<LogIn/>}
                
                    <div>
                       {(user)&&<img src={imgPerson} onClick={()=>nav('/profile')} alt="" srcset=""  style={{
                        width:"55px",
                        cursor:"pointer"
                       }}/>}
                    </div>
                

            </header>
            {state&&<Prealoder/>}
        </CtxMapOpen.Provider>
    );
}
export default Header;