import { useContext, useEffect, useState } from "react";
import { CtxOrdersComp } from "../../../Contexts/Contexts";
import { error_handler, getMapTrans } from "../../../util/util";
import { Link, useNavigate } from "react-router-dom";

export function MenuOrder(){
    const getOrdersState=useContext(CtxOrdersComp);
    const [states,setStates]=useState([]);
    const [stId,setId]=useState('');
   
    useEffect(()=>{
        fetch("http://localhost:1212/api/customs/states")
        .then(x=>{if(error_handler(x))return x.json()})
        .then(x=>setStates(x))
        .catch(x=>console.log(x));
    },[])
    return (
        <nav className="navStateOrd">
            <Link className="stateCL" to='/profile/orders' style={(stId=='')?{background:"#FFF"}:{}} onClick={()=>{getOrdersState("");setId("")}}>Все</Link>
            {states?.map((x)=><Link className="stateCL" to={`/profile/orders#${x}`} style={(stId==x)?{background:"#FFF"}:{}} onClick={()=>{getOrdersState(x);setId(x);}}>{getMapTrans(x)}</Link>)}
            
        </nav>
    )
}