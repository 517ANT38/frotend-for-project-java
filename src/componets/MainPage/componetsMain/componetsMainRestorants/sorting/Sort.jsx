import { useContext, useEffect } from "react";
import { SortElement } from "./SortElement";
import { CtxFilter, CtxSort } from "../../../../../Contexts/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { error_handler } from "../../../../../util/util";

export function Sort({commands=[]}){
    const [setSort,sortCom,setCom,selectAndSordAndKtName,selectAndSord]=useContext(CtxSort);
    const {name,ord}=useParams();    
    const ctx=useContext(CtxFilter);
    const nav=useNavigate()
    return (
        <div style={{
            background:"#FFF",
            display:'flex',
            height:"250px",
            width:"350px",
            flexDirection:"column",
            position:"absolute",
            zIndex:"100",
            left:"1300px",
            boxShadow:"0 4px 16px rgba(0, 0, 0, .2)",
            borderRadius:"20px",
            
            paddingLeft:"8px",
            paddingBottom:"10px",
            alignItems:"center"
            }}>
            <p style={{paddingLeft:"290px",cursor:"pointer"}}><FontAwesomeIcon icon={faMultiply} style={{color:"#000",width:"20px",height:"20px"}} onClick={()=>setSort(false)} /></p>    
            <h3 className="prop" style={{fontSize:"25px",color:"#F6AC1C",textAlign:"center"}}>Что сначала показать ?</h3>
            {commands.map(x=><SortElement data={x}/>)}
            <button type="button" className="changeBut" style={{marginLeft:"20px",marginTop:"10px"}} onClick={()=>{
                (name)?selectAndSordAndKtName(sortCom,name):selectAndSord(sortCom);
                setSort(false);
                nav((name)?`/restaurants/kitchen/${name}/sort/${sortCom}`:`/restaurants/sort/${sortCom}`);
            }}>
                Показать
            </button>
        </div>
    )
}