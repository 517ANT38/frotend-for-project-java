
import React, { useContext, useEffect, useState } from "react"
import { RNav } from "./RestaurantComp/RNav"
import { useLocation } from "react-router-dom";
import { RMainR } from "./RestaurantComp/RMainR";
import { Basket } from "./RestaurantComp/Basket";
import { error_handler, useLocalStorage } from "../../../../util/util";
import { CtxBasket, CtxCheckCateg, CtxCountDish, CtxNSum } from "../../../../Contexts/Contexts";
export function Restaurant(){
    const ba=useContext(CtxBasket);
    
    const [map,setMap]=useState(new Map((ba.basket.length==0)?null:ba.basket));
    const {state}=useLocation();
    const info=state?.info;
    const r=(state?.r)?state?.r:{};
    useEffect(()=>{
        ba.setId(r.id);
        ba.setName(r.name);
    },[])
    const [menu,setMenu]=useState([]);    
    const [sum,setSum]=useState(rR(map));    
    const [fee,setFee]=useState(0);
    const [feeOld,setFeeOld]=useState(0);
    const [pCD,setPCD]=useState(0);
    const [pTD,setPTD]=useState(0);
    const [sumN,setSumN]=useState(rRd(map));
    useEffect(()=>{
        if(sumN<0||sum==0){
          
            setSumN(0);
        }
    },[sumN,sum]);
    useEffect(()=>{
        if(sum==0)
            serviceFee(0)
    },[sum])
    const serviceFee=(sum)=>fetch(`http://localhost:1212/api/customs/calculate/service_fee`,{method:"POST",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        },
        body:JSON.stringify({result:sum})
    })
    .then(x=>{error_handler(x); return x.json()})
    .then(x=>{setFee(x.result);setFeeOld(x.result);})
    .catch(x=>console.log(x));
    const categoryP=(name)=>fetch(`http://localhost:1212/api/customs/calculate/category_delivery/${name}`,{method:"POST"})
    .then(x=>{error_handler(x); return x.json()})
    .then(x=>{setSum(x.result+sum-pCD);setPCD(x.result);})
    .catch(x=>console.log(x));
    const typeP=(name)=>fetch(`http://localhost:1212/api/customs/calculate/type_delivery/${name}`,{method:"POST"})
    .then(x=>{error_handler(x); return x.json()})
    .then(x=>{setSum(x.result+sum-pTD);setPTD(x.result);})
    .catch(x=>console.log(x));
    useEffect(()=>{
        fetch(`http://localhost:4545/api/restaurants/${r.id}/menu`)
        .then(x=>{
            error_handler(x);                
            return x.json();
        })
        .then(x=>setMenu(x))
        .catch(x=>console.log(x))

    },[]);
    useEffect(()=>{
    
        serviceFee(sum-sumN);              
    },[]);
    useEffect(()=>{
        if(sumN>0&&sum>0){
            serviceFee(sum-sumN);
            console.log(sum-sumN)
        }
    },[sum,sumN])
    return (
        <CtxNSum.Provider value={[sumN,setSumN]}>
            <CtxCheckCateg.Provider value={[menu,setMenu]}>
                <CtxCountDish.Provider value={{
                    map:map,
                    setMap:setMap,
                    sum,
                    setSum,
                    serviceFee,
                    fee,
                    feeOld,
                    typeP,
                    categoryP,
                    pCD,
                    pTD,
                    setPCD,
                    setPTD
                }}>
                <div style={
                    {
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"center"
                    }
                }>
                    <RNav arr={menu}/>
                    <RMainR info={info} r={r} cateories={menu}/>
                    <Basket/>
                </div>
                </CtxCountDish.Provider>
            </CtxCheckCateg.Provider>
        </CtxNSum.Provider>
    )
}
const rR=(map)=>[...map.values()]
.map(x=>x.count*x.cost)
.reduce((x,y)=>x+y,0)
const rRd=(map)=>{
    console.log([...map.values()])
    return [...map.values()]
    .filter(x=>x.disc!==1)
.map(x=>x.count*x.cost*x.disc)
    .reduce((x,y)=>x+y,0)
}
