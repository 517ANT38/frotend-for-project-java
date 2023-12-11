import { useContext, useEffect, useState } from "react";
import { CtxSort } from "../../../../../Contexts/Contexts"
import { getMapTrans } from "../../../../../util/util";
import { useParams } from "react-router-dom";

export function SortElement({data}){
    const [,sortCom,setCom]=useContext(CtxSort);
    const {ord}=useParams()
    const handleChange = (event) => {
        setCom(event.target.value);
        
      }
    return (
        <p className="prop">
            <input type="radio" defaultChecked={data==ord} name="sort" id="" value={data}  onClick={handleChange} />
            <span onClick={()=>{setCom(data)}}>{getMapTrans(data)}</span>
        </p>
    )
}