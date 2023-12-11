import { useEffect, useMemo, useState } from "react";
import { CtxCountStar } from "../../Contexts/Contexts";
import { StarClick } from "./StarClick";

export function StarContainar(){
    
    
    const res=useMemo(()=>{
        const arr=[];
        for (let index = 0; index < 5; index++) {
            arr.push(<StarClick i={index+1}/>);
            
        }
        return arr;
    });
    
    return (
        <>
            <span className="prop" style={{color:"#F6AC1C",fontWeight:"700",fontSize:"24px"}}>Баллы: </span>
            <span>
                {res}
            </span>
        </>    
        
    )

}