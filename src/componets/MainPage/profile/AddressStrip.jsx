import { useContext, useEffect, useState } from "react"
import { useAuth } from "../../../security/auth"
import { error_handler, parseJwt } from "../../../util/util";
import { CtxAddresP } from "../../../Contexts/Contexts";

export function AddressStrip({data,i}){
    const {user,logout}=useAuth();
    const json=parseJwt(user["jwtToken"]);
    const {arrAddr,setArrAddr}=useContext(CtxAddresP);
    
    const deleteA=()=>fetch(`http://localhost:1212/api/clients/${json.id}/addresses/${data.id}`,{
        method:"DELETE",
        headers:{'Authorization':"Bearer "+user["jwtToken"]}
    }).then(x=>{
        error_handler(x,logout);
        
        arrAddr.splice(i-1,1);
        
        setArrAddr([...arrAddr]);
        
        return x})
    .catch(x=>console.log(x));
    const updateStateMain=()=>fetch(`http://localhost:1212/api/clients/${json.id}/addresses/${data.id}`,{
        method:"PATCH",
        headers:{'Authorization':"Bearer "+user["jwtToken"]}
    }).then(x=>{
        error_handler(x,logout);
        ;
        let k=i-1;
        arrAddr.forEach((x,j)=>{
            if(k!=j){
                console.log(j)
                x.main=false;
                
            }
            else
                x.main=true;
            
        });
        setArrAddr([...arrAddr]);
        return x})
    .catch(x=>console.log(x));
    return (
        <div className="stripAddress" style={{borderRadius:"20px"}}>
            <p className="prop" >
                <span>№{i}</span> 
                <span style={{marginLeft:"10px"}}>                          
                    <span>
                        Адрес: 
                    </span>
                    <span className="weigthVal" style={{marginLeft:"5px",textOverflow:"ellipsis"}}>
                        {data?.address}
                    </span>
                </span> 
            </p>
            <div className="btnP">
                <button className="btn" disabled={!data.id} style={(!data.id)?{opacity:"0.5"}:{}} onClick={deleteA}>
                    Удалить
                </button>
                <button className="btn" 
                 style={(data?.main)?{opacity:"0.5"}:{}}   
                 disabled={data?.main}
                 onClick={updateStateMain}>
                    Главный  
                </button>
            </div>
        </div>
    )
}