import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CtxCountStar } from "../../Contexts/Contexts"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";

export function StarClick({i}){
    const [count,setSt]=useContext(CtxCountStar);
    const [fl,setFl]=useState(false);
    useEffect(()=>{
        if(count>=i)
            setFl(true);
        else setFl(false)    
    },[count])
    return (
        <FontAwesomeIcon icon={faStar} onClick={()=>{
           fl?setFl(false):setFl(true);
            setSt(i)
        }} style={(fl)?{color:"#F6AC1C"}:{color:"#000"}}/>
    )
}