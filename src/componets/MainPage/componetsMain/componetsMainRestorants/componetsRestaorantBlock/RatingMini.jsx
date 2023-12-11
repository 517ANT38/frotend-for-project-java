import { useContext } from "react";
import { CtxForRestorauntBlock } from "../../../../../Contexts/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
function RatingMini(){
    const {addInfo}=useContext(CtxForRestorauntBlock);
    
    return(
       <>
            
            
            {
                
                    (!addInfo?.avgRating>0)?<>
                    <p className="flexIfoRate">
                    <FontAwesomeIcon icon={faStar} style={{color:"#c4c2be"}}/>
                    <span className="mtetx">Мало оценок</span>
                    </p>
                    </>:
                    <>
                        <p className="flexIfoRate" style={{width:"70px",justifyContent:"space-evenly",marginRight:"190px"}}>
                        <FontAwesomeIcon 
                        icon={faStar} 
                        style={{color: "#F6AC1C"}}
                         className="starRate"/> 
                            <span>{"("+addInfo?.countFeedbacks+")"}</span>
                        </p>     
                        {/* <p> <span >{rating?.textStatys}</span></p> */}
                    </>
                
            }
        </>
    )
}
export default RatingMini;