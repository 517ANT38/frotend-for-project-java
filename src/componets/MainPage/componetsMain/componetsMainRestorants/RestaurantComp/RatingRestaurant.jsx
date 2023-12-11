import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProtectedRoute } from "../../../auth/ProtectedRoute";
import { useContext } from "react";
import { CtxFFEb, CtxFFEbIns, CtxOverFlow } from "../../../../../Contexts/Contexts";

export function RatingRestaurant({info,onClose}){
    const setF=useContext(CtxFFEb);
    const setFF=useContext(CtxFFEbIns);
    const setOver=useContext(CtxOverFlow);
    return (
        <div className="infr" style={
            {
                width:"300px",
                height:'max-content',
                background:"#FFF",
                position:"absolute",
                zIndex:"1000" ,
                top:"380px"
                   
            }
        }>
            <p style={{marginLeft:"280px"}} onClick={onClose}>
                            <FontAwesomeIcon icon={faMultiply} style={{
                                width:"30px",
                                height:"30px",
                                color:"#dfd8d8fc"
                            }} />
                        </p>
            <h3 style={{margin:"0px",marginLeft:"30px",fontSize:"25px"}}>Рейтинг</h3>            
            <div style={{
                display:"flex"
            }}> 

               <div>               
                        {(info?.avgRating==0)?<>
                            <p className="flexIfoRate">
                            
                            <span className="mtetx" style={{fontWeight:"bold"}}>Мало оценок</span>
                            </p>
                            </>:
                            <>
                                <p className="flexIfoRate" style={{display:'flex',
                                flexDirection:"column",
                                alignItems:"center",
                                justifyContent:"space-around",
                                height:"80px"
                                }}>
                                
                                    <span className="mtetx" style={{
                                        color:"#000",
                                        fontWeight:"bold",
                                        fontSize:"30px"
                                    }} >{info?.avgRating}</span>
                                    <span className="mtetx" >Отзывов{"("+(!info?.countFeedbacks?0:info?.countFeedbacks)+")"}</span>
                                </p>   
                                </>
                        }
                </div>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    height:"100px",
                    justifyContent:"space-around"

                }}>
                    <ProtectedRoute>
                        <button className="btn" onClick={()=>{setF(true);setOver(true)}}>
                            Смотреть отзывы
                        </button>
                        <button className="btn" onClick={()=>{setFF(true);setOver(true)}}>
                            Оставить отзыв
                        </button>
                    </ProtectedRoute>
                </div>
            </div>
        </div>
    )
}