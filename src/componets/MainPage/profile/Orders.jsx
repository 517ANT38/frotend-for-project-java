import { useEffect, useState } from "react"
import { useAuth } from "../../../security/auth";
import { error_handler, parseJwt } from "../../../util/util";
import { Order } from "./Order";
import { CtxMapIds, CtxOrdersComp } from "../../../Contexts/Contexts";
import { MenuOrder } from "./MenuOrders";

export function Orders(){
    const [orders,setOrders]=useState([]);
    const {user,logout}=useAuth();
    const [mapIds,setMapIds]=useState(new Map());
    const json=parseJwt(user["jwtToken"]);
    const getOrdersState=(x)=>{
        setOrders([])
        fetch(`http://localhost:1212/api/customs${x.length!=0?"/"+x:""}/client/${json.id}`,{
        method:"GET",
        headers:{
            'Authorization':"Bearer "+user["jwtToken"]
        }
    })
    .then(x=>{error_handler(x,logout);return x.json();})
    .then(x=>setOrders(x))
    .catch(x=>console.log(x))
    }
    useEffect(()=>{
        fetch(`http://localhost:1212/api/customs/client/${json.id}`,{
            method:"GET",
            headers:{
                'Authorization':"Bearer "+user["jwtToken"]
            }
        }).then(x=>{error_handler(x,logout);return x.json();})
        .then(x=>setOrders(x))
        .catch(x=>console.log(x));
    },[])
    useEffect(()=>{
        orders.forEach(x=>{
            console.log(x)
            let id=newId(x.uuid);
            mapIds.set(id,x.id)});
        setMapIds(new Map(mapIds));
    },[orders])
    const newId=(uuid="")=>{
        let normId=uuid.substring(0,4)+uuid.substring(32);
        normId=normId.toUpperCase() 
        return normId;
    }
    const findCode=(id)=>{
        
        let a=[...mapIds.entries()]
        .filter(([a,b])=>b==id)
        .pop();
        return (a)?a[0]:null;
    }
    return (
        <CtxOrdersComp.Provider value={getOrdersState}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                marginTop:"30px"
                
            }}>
                <h2 className="prop" style={{fontSize:"30px"}}>
                    Мои заказы
                </h2>
                <MenuOrder/>
                {orders.map(x=><CtxMapIds.Provider value={{data:x,newId:findCode(x.id)}}>
                            <Order />
                    </CtxMapIds.Provider>)}
                    {orders.length==0&&<h3 className="prop" style={{fontSize:"30px"}}>Заказов пока нет</h3>}
            </div>
        </CtxOrdersComp.Provider>
    )
}