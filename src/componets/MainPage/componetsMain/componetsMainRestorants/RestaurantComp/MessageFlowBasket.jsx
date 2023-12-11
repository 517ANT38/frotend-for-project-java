import { useContext, useEffect, useState } from "react";
import { CtxBasket, CtxMessageWrite, CtxOverFlow } from "../../../../../Contexts/Contexts";

export function MessageFlowBasket({cancel=()=>{}}){
    const [obj,setObj]=useContext(CtxMessageWrite);
    const ba=useContext(CtxBasket);
   
    const setOver=useContext(CtxOverFlow);
    return (
        obj.st&&<div className="prel" style={{            
            position:"fixed",
            zIndex:"3000",
            width:"100%",
            height:"100%",
            top:"0px",
            left:"0px",  
        }}>
            <div style={{
                position:'absolute',
                top:"300px",
                left:"500px",
                background:"#FFF",
                borderRadius:"30px",
                padding:"20px"
            }}>
                <h3 className="prop">
                    Оформить заказ из ресторана {obj.name}
                </h3>
                <p className="prop">
                    Все ранее добавленные блюда из ресторана {ba.name}  будут удалены из корзины
                </p>
                <div style={{
                    width:"300px",
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center"
                }}>
                    <button onClick={()=>{                        
                        ba.removeBasket();
                        obj.ok();
                        obj.st=false;
                        setObj({...obj});
                        setOver(false);
                        }} className="btn">
                        Продожить
                    </button>
                    <button className="btn" onClick={()=>{
                        cancel();
                        obj.st=false;
                        setOver(false);
                        setObj({...obj})
                    }}>
                        Отмена
                    </button>
            </div>
            </div>
        </div>
    )
}