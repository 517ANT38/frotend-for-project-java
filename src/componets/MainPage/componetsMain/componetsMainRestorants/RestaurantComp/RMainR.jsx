import { useLocation } from "react-router-dom"
import { DishCategory } from "./DishCategory"
import { useEffect, useState } from "react"
import { CtxCountDish, CtxFFEb, CtxFFEbIns, CtxOverFlow, CtxUpload } from "../../../../../Contexts/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { InfoRestaurant } from "./InfoRestaurant";
import { RatingRestaurant } from "./RatingRestaurant";
import defImg from "./../../../../../images/DefaultRestaurant.png"
import { Feedbacks } from "../../../../feedbacks/Feedbacks";
import { NewFeedback } from "../../../../feedbacks/NewFeedback";

export function RMainR({r={},info={},cateories=[]}){
    const [st,setSt]=useState(false);
    const [stR,setStR]=useState(false);
    const [flFeedB,setFlf]=useState(false);
    const [flFeeBInsert,setFF]=useState(false);
    return (
        <CtxFFEbIns.Provider value={setFF}>
            <CtxFFEb.Provider value={setFlf}>
                    <div style={{
                        width:"900px",
                        height:"max-content",
                        display:"flex",
                        flexDirection:"column",
                        marginTop:"30px" ,
                        marginBottom:"40px"
                    }}>
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",               
                            position:"relative"    
                        }}  >
                            <img src={r.img?r.img:defImg} alt="" style={
                                {
                                    width:'800px',
                                    height:"400px",
                                    borderRadius:"20px"
                                }
                            }/>
                            <span style={{
                                position:"absolute",
                                fontFamily: 'Roboto',
                                fontStyle: "normal",
                                fontWeight: "700",
                                fontSize: "128px",
                                color:" #FFFFFF",
                                top:"100px",
                            }}>{r.name}</span> 
                            <div style={{display:"flex"}}>
                                <button className="butMainInfo" onClick={()=>setStR(true)}>
                                    <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="UiKitUiKitIcon_xl UiKitUiKitIcon_root"><path d="m12 16-5.878 4.09 2.074-6.854L2.489 8.91l7.16-.146L12 2l2.351 6.764 7.16.146-5.707 4.326 2.074 6.854L12 16Z" fill="currentColor"></path></svg>
                                    {(!("countFeedbacks" in info)||info?.avgRating==0)?<>
                                        <p className="flexIfoRate"style={{width:"50px"}}>
                                    
                                        <span className="mtetx" style={{width:"50px",fontSize:"15px"}}>Мало оценок</span>
                                        </p>
                                        </>:
                                        <>
                                            <p className="flexIfoRate" style={{width:"50px",display:'flex',flexDirection:"column",marginLeft:"2px",textAlign:"center"}}>
                                              
                                                <span className="mtetx" style={{width:"50px",fontSize:"15px"}}>{info?.avgRating}</span>
                                                <span className="mtetx" style={{width:"50px",fontSize:"15px"}}>{"("+info?.countFeedbacks+")"}</span>
                                            </p>   
                                            </>
                                    }
                                </button>
                                <button className="butMainInfo" onClick={()=>{setSt(true);}}>
                                    <svg width="38px" height="38px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="UiKitUiKitIcon_xl UiKitUiKitIcon_root RestaurantHeader_informationIcon"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.667 10V7.333h-2v1.334h.666V10h-.666v1.333h2.666V10h-.666ZM8 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12Zm0-1.233a4.767 4.767 0 1 0 0-9.534 4.767 4.767 0 0 0 0 9.534Zm-.667-8.1h1.334V6H7.333V4.667Z" fill="currentColor"></path></svg>
                                </button>
                            </div>
                            {stR&&<RatingRestaurant info={info} onClose={()=>setStR(false)}/>}
                            {st&&<InfoRestaurant x={r} info={info} onClose={()=>setSt(false)}/>}               
                        </div>
                        {flFeedB&&<div className="prealoader" style={{zIndex:"1000"}}><Feedbacks id={r.id}/></div>}
                        {flFeeBInsert&&<div className="prealoader" style={{zIndex:"1000"}}><NewFeedback id={r.id}/></div>}
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            "alignItems":"flex-start",                
                            position:"sticky",
                        }}>
                            
                            
                                {("map" in cateories)&&cateories.map(x=><DishCategory category={x}/>)}
                        
                        </div>
                    </div>
                </CtxFFEb.Provider>
            </CtxFFEbIns.Provider>
    )
}