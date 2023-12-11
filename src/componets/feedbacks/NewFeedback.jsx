import { useContext, useState } from "react";
import { CtxCountStar, CtxFFEb, CtxFFEbIns, CtxOverFlow } from "../../Contexts/Contexts";
import { StarContainar } from "./StarContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { error_handler } from "../../util/util";

export function NewFeedback({id}){
    const onFormSubmit = e => {
        e.preventDefault();
        
    };
    const setOver=useContext(CtxOverFlow);
    const [count,setCount]=useState(0);
    const setFF=useContext(CtxFFEbIns)
    const [text,setText]=useState("");
    
    const createFeedback=()=>fetch(`http://localhost:4545/api/feedbacks/new/restaurant/${id}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json;charset=utf-8',
        },
        body:JSON.stringify({
            textFeedback:text,
            countRatings:count,
            dateFeedback:null,
        })
    }).then(x=>{error_handler(x);})
    .catch(x=>console.log(x))
    return(
        <CtxCountStar.Provider value={[count,setCount]}>
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
            <h3 className="prop" style={{fontSize:"28px",marginBottom:"3px"}}>
                 Оставить отзыв
            </h3>
                <form action="" style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                        }} onSubmit={onFormSubmit}> 
                    <fieldset  className="propFieldSet" style={{
                        background:"#E9E9E9",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        borderRadius:"20px"
                        }}>               
                        <textarea name="text" className="prop"
                        style={{
                            resize:"none",
                            width:"780px",
                            height:"300px",
                            background:"#E9E9E9",
                            border:"none"
                        }}
                        
                        id="" cols="30" rows="10" onChange={e=>setText(e.target.value)}/>
                        <hr width="100%"/>
                        
                        <StarContainar/>
                    </fieldset>
                    <input type="submit" value="Оставить" style={{width:"max-content",marginTop:"10px"}} className="changeBut" onClick={()=>{
                        createFeedback();setFF(false);setOver(false);}}/>
                </form>
            </div>
        </CtxCountStar.Provider>
    )
}
