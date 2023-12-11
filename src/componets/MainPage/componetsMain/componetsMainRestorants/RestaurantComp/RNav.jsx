import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Scrollchor } from "react-scrollchor";
import { CtxCheckCateg } from "../../../../../Contexts/Contexts";

export function RNav({arr=[]}){
    const [index,setIndex]=useState();
    const [checkCateg,setCheckCateg]=useContext(CtxCheckCateg);
    return (
        <nav style={
            {
                display:"flex",
                width:"300px",
                flexDirection:"column",
                justifyContent:"flex-start",
                alignItems:"center",
                paddingTop:"30px",
                color:"#000",
                
            }
        }>
            <Link to="/restaurants" style={
                {
                    fontFamily: 'Roboto',
                    fontStyle: "normal",
                    fontWeight:"400",
                    fontSize:"30px",
                    textDecoration:"none",
                    color:"#000",
                    backgroundColor:"#FFFFFF",
                    padding:"10px",
                    borderRadius:"10px"
                }
            }><FontAwesomeIcon icon={faArrowLeft} style={{color: "#000000",}} /><span> Все рестораны</span></Link>
            <span style={{
                fontFamily: 'Roboto',
                fontStyle: "normal",
                fontWeight:"400",
                fontSize:"30px",
                marginTop:"20px",
                
            }}>Меню</span>
            {("map" in arr)&&arr?.map((x,i)=><Scrollchor onClickCapture={()=>setIndex(i)} className={index==i?"bg-weiht":""} to={`#${x}`} style={{
                fontFamily: 'Roboto',
                fontStyle: "normal",
                fontWeight:"400",
                fontSize:"25px",
                marginTop:"20px",
                 textDecoration:"none",
                 color:"#000"
            }}>{x}</Scrollchor>)}
        </nav>
    )
}