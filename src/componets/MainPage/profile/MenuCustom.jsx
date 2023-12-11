import { useState } from "react";
import { useEffect } from "react";
import { error_handler, getMapTrans } from "../../../../util/util";
import { useContext } from "react";
import { OrderCtx, SearchMapCtx } from "../../../../contexts/contexts";
import { useAuth } from "../../../../security/auth";
import Search from "./Search";
import { parseJwt } from "../../../util/util";

function MenuCustom(){
    const [stId,setId]=useState('');
    const [menu,setMenu]=useState(null);
    const {logout,user}=useAuth();
    const setArrOrder=useContext(OrderCtx);    
    const [arrNameNormal,setNamesMap]=useState(new Map());
    const headers={'Authorization':"Bearer "+user["jwtToken"]}
    const json=parseJwt(user["jwtToken"])
    const allOrders=x=>{fetch(
        `http://localhost:1212/api/orders/${x.length!=0?(`/status/${x}`):''}/client/${json.id}`,
        {
            method:"GET",
            headers:headers
        }
    )
        .then(x=>{error_handler(x,logout);return x;})
        .then(x=>x.json())
        .then(x=>{
            {console.log(x)}
            x.forEach((x,i)=>{
                let normId=x.uuid.substring(0,4)+x.uuid.substring(29);
                normId=normId.toUpperCase() 
                arrNameNormal.set(normId,x.uuid);
                x.normId=normId;
            });
            setNamesMap(new Map(arrNameNormal))
            setArrOrder(x)
        })
        .catch(x=>console.log(x))}
    const allStateOrder=()=>fetch("http://localhost:4545/api/orders/states",{
        method:"GET",
        headers:headers
    })
    .then(x=>{error_handler(x,logout);return x;})
    .then(x=>x.json())    
    .then(x=>setMenu([...x,""]))    
    .catch(x=>console.log(x));  
    useEffect(()=>{
       allStateOrder();  
       allOrders("")   
    },[])
    return (
        <SearchMapCtx.Provider value={[arrNameNormal,setNamesMap]}>
            <Search/>
            <nav className="navStateOrd">
                {menu?.map((x)=><p className="stateCL" style={(stId==x)?{background:"#FFF"}:{}} onClick={()=>{setArrOrder([]);setId(x);allOrders(x)}}>{getMapTrans(x)}</p>)}
            </nav>
        </SearchMapCtx.Provider>
    )
}
export default MenuCustom;