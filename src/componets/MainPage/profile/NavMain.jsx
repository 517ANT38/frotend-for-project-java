import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LoginUser from "./LoginUser";
import { useAuth } from "../../../security/auth";
import { error_handler, parseJwt } from "../../../util/util";
import { CtxClient } from "../../../Contexts/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


function NavMain(){    
    let s="widthSize link";
    let {logout,user}=useAuth();
    let json={};
    const cli=useContext(CtxClient);
    const [name,setName]=useState("");

    if(user){
        
        if(user.jwtToken){
             json=parseJwt(user?.jwtToken);
           
        }
    }
    useEffect(()=>{
        fetch(`http://localhost:1212/api/clients?email=${json.email}`,{
            method:"GET",
            headers:{
                'Authorization':"Bearer "+user["jwtToken"]
            }
        })
        .then(x=>{error_handler(x,logout);return x.json()})
        .then(x=>{
            cli.setClient(x);
            let name=x.name+" "+x.surname;
            setName(name);
        })
        .catch(x=>console.log(x));
    },[cli.client.name,cli.client.surname])
    return (
        <div className="divNavColomn">
            <h2 className="panelH2">Профиль</h2>
            <LoginUser login={name}/>
            <nav>                
                
                    
                    <NavLink to='data' className={
                        ({isActive})=>isActive?(s+" activeLink"):s
                    }>Мои Данные</NavLink>
                    <NavLink to='orders' className={
                        ({isActive})=>isActive?(s+" activeLink"):s
                    }>Мои Заказы</NavLink>
                    <NavLink to='address' className={
                        ({isActive})=>isActive?(s+" activeLink"):s
                    }>Мои Адреса</NavLink>
                    <span className={s} style={{
                        fontSize:"15px",
                        color:"#B5B4B4"
                    }}>
                        <span>Бонусы: </span>
                        <span>{cli.client.countBonuses}</span>
                    </span>
                    <Link to='/restaurants' className={s} style={{width:"200px", background:"#F6F6F6",borderRadius:"10px"}}>
                        <FontAwesomeIcon icon={faArrowLeft} style={{color: "#000000",}} />
                        <span> К ресторанам</span>
                    </Link>
            </nav>
            <div className="logoutCL"><span  className="logOut link" onClick={()=>logout()}>Выйти</span></div>
        </div>
    )/*"widthSize link" */
}
export default NavMain;