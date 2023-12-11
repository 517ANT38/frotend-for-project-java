import { faCutlery, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { error_handler, getMapTrans } from "../../../util/util";
import { OrderShow } from "./OrderShow";
import { useContext, useEffect, useState } from "react";
import { CtxMapIds, CtxSum } from "../../../Contexts/Contexts";
import { DishList } from "./DishList";
import { useAuth } from "../../../security/auth";

export function Order(){
    const {data,newId}=useContext(CtxMapIds);
    const [st,setState]=useState(false);
    const [stD,setStateD]=useState(false);
    const [sum,setSum]=useState(0);
    const hiddenElem=()=>setState(false);
    const hiddenElemA=()=>setStateD(false);
    const [stO,setSto]=useState(data.status);
    const {user,logout}=useAuth();
    
    const suc=()=>fetch(`http://localhost:1212/api/customs/${data.id}`,{
        method:"PATCH",
        headers:{
            'Authorization':"Bearer "+user["jwtToken"]
        }
    }).then(x=>error_handler(x,logout))
    
    useEffect(()=>{
        fetch(`http://localhost:1212/api/customs/${data.id}/calculate/sum`,{
            method:"POST",
            headers:{
                'Authorization':"Bearer "+user["jwtToken"]
            }})
        .then(x=>{error_handler(x,logout);return x.json()})
        .then(x=>setSum(x.result))
        .catch(x=>console.log(x))

    },[])
    
    useEffect(()=>{
        document.body.addEventListener('mouseup',()=>{hiddenElem();hiddenElemA()});        
    },[])
    useEffect(()=>{
        if(stD){
            setState(false);
        }
    },[stD])
    useEffect(()=>{
        if(st){
            setStateD(false)
        }
    },[st])
    return(
        <div className="stripOrder" style={{
            display:"flex",
            flexDirection:'row',
            alignItems:"center",
            position:"relative"
        }}>
            <p className="prop">
              <span className="clOr weigthVal">Код заказа: </span><span>{newId}</span>
            </p>
            <p className="prop">
                <span className="clOr weigthVal">Статус: </span>
                <span>{getMapTrans(stO)}</span>
            </p>
            <p className="prop">
                <span className="clOr weigthVal">Дата создания: </span>
                <span>{data.dateFrom}</span>
            </p>
            
            {
                (stO=='DELIVERED'||(stO=='READY'&&data?.categoryDelivery=='PICKUP')
                
                )&&<button className="changeBut" onClick={()=>{
                    suc();
                    setSto("SUCCESSFULLY")
                }}>
                    Ok
                </button>
               
            }
            <p>
                <span style={{cursor:'pointer'}} onMouseEnter={() => setStateD(true)}>
                    <FontAwesomeIcon icon={faCutlery} style={{color:"#F7AC1C",height:"32px"}}/>
                </span>
            </p>
            <p>
                <span style={{cursor:'pointer'}}  onMouseEnter={() => setState(true)}
                >
                    <FontAwesomeIcon icon={faInfoCircle} style={{color:"#F7AC1C",height:"32px"}}/>
                </span>
                <CtxSum.Provider value={sum}>
                    {st&&<OrderShow setState={setState}/>}
                    {stD&&<DishList dishes={data.dishDtoList} setState={setStateD}/>}
                </CtxSum.Provider>
            </p>
        </div>
    )
}