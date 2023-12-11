import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { error_handler } from "../../util/util";
import { Feedback } from "./FeedBack";
import { CtxFFEb, CtxOverFlow } from "../../Contexts/Contexts";

export function Feedbacks({id}){
    const [feedbacks,setF]=useState([]);
    const setOver=useContext(CtxOverFlow);
    const setFF=useContext(CtxFFEb);
    useEffect(()=>{
        fetch(`http://localhost:4545/api/feedbacks/restaurant/${id}`)
        .then(x=>{error_handler(x);return x.json();})
        .then(x=>setF(x))
        .catch(x=>console.log(x));
    },[])
    return (
        <div style={{
            position:"absolute",
            zIndex:"1000",
            width:"900px",
            height:"600px",
            background:"#FFF",
            overflowX:"hidden",
            overflowY:"auto",
            borderRadius:"20px",
            left:"400px",
            top:"130px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <p style={{paddingLeft:"820px"}}>
                <FontAwesomeIcon icon={faMultiply} style={{color:"#000",width:"32px",height:"32px"}} onClick={()=>{setFF(false);setOver(false)}}/>
            </p>
            <h3 className="prop" style={{fontSize:"30px"}}>
                Отзывы
            </h3>
            <div>
                {feedbacks.map(x=><Feedback data={x}/>)}
                {feedbacks.length==0&&<p className="prop" style={{
                    fontWeight:"bold",
                    fontSize:"30px",
                    marginTop:"150px"
                }}>Отзывов нет</p>}
            </div>
        </div>
    )
}