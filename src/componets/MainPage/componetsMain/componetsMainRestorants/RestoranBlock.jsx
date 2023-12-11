import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { CtxBasket, CtxForRestorauntBlock, CtxMessageWrite, CtxOverFlow } from "../../../../Contexts/Contexts";
import ImgRestorant from "./componetsRestaorantBlock/ImgRestorant";
import Description from "./componetsRestaorantBlock/Description";
import { MessageFlowBasket } from "./RestaurantComp/MessageFlowBasket";
function RestoranBlock({x=[{},{}]}){
    const r=x[0];
    const info=x[1];
    const ba=useContext(CtxBasket);
    const nav=useNavigate();
    const ok=()=>{nav(`/restaurants/${r.id}`,{state:{info:info,r:r}})};
    const [objM,setObjM]=useContext(CtxMessageWrite);
    const setOver=useContext(CtxOverFlow);
    return (
        
            <div className="restoran" style={{height:"max-content"}}>
                <a  onClick={()=>{
                    if(ba.id!=r.id&&ba.basket.length!=0){
                        objM.ok=ok;
                        objM.st=true;
                        objM.name=r.name;
                        setObjM({...objM});
                        setOver(true);
                        return;
                    }                            
                    ok();
                }}>
                    <CtxForRestorauntBlock.Provider value={{mainRestr:r,addInfo:info}}>
                        <ImgRestorant/>
                        <Description/>                        
                    </CtxForRestorauntBlock.Provider>
                </a>
            </div>
    )
        
}
export default RestoranBlock;