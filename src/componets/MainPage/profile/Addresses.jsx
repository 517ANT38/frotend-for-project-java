import { useContext, useEffect, useState } from "react"
import { CtxAddresP, CtxClient, CtxMapOpen } from "../../../Contexts/Contexts";
import { AddressStrip } from "./AddressStrip";
import imgCircle from "../../../images/SVGRepo_iconCarrier.png";
import BoxMap from "../map/BoxMap";
import Prealoder from "../map/Prealoder";
export function Addresses(){
    const cl=useContext(CtxClient);
    const [st,setState]=useState(false);
    const [arrAddr,setArrAddr]=useState([]);
    useEffect(()=>{
        setArrAddr(cl.client.addresses);
    },[cl])
    return (
        <CtxAddresP.Provider value={{arrAddr,setArrAddr}}>
            <CtxMapOpen.Provider value={setState}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    marginTop:"30px"
                    
                }}>
                    <h2  className="prop" style={{fontSize:"30px"}}>Мои адреса</h2>
                    <div style={{
                        height:"200px",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-evenly",
                        alignItems:"center",
                        cursor:'pointer'
                        }}>
                        <img src={imgCircle} onClick={()=>setState(true)}  alt="" style={{height:"100px",width:"100px"}} />
                        <span className="prop" style={{color:"#F6AC1C",fontSize:"24px",fontWeight:"600"}}>Добавить адрес</span>
                    </div>
                {arrAddr?.map((x,j)=><AddressStrip data={x} i={j+1}/>)}  
                {st&&<Prealoder/>}   
                </div>
            </CtxMapOpen.Provider>
        </CtxAddresP.Provider>
    )
}