import { useContext, useEffect, useState } from "react";
import { Dish } from "./Dish";
import { CtxCheckCateg, CtxUpload } from "../../../../../Contexts/Contexts";

import imgP from "./../../../../../images/Rotating-Pizza-Slice-Preloader.gif"
export function DishCategory({category}){
    const [dishes,setDishes]=useState([]);
    const [checkCateg,setCheckCateg]=useContext(CtxCheckCateg);
    const [o,setO]=useState(true);
    useEffect(()=>{
        fetch(`http://localhost:4545/api/dishes/category/${category}`)
        .then(x=>x.json())
        .then(x=>{
            setO(x?.length>0);
            setDishes(x);
            if(x.length==0){
               
                let ind=checkCateg.findIndex(y=>y==category);
                checkCateg.splice(ind,1);
                setCheckCateg([...checkCateg]);
            }
        })
        .catch(x=>console.log(x))
    },[])
    return (
        o&&<div id={category} >
            {<h3 className="prop">{category}</h3>}
            {dishes.length==0&&<img src={imgP} style={{height:"400px",width:"800px",marginTop:"50px",marginBottom:"50px"}}/>}
            <div style={{display:"flex", flexDirection:"row",width:"500px"}}>
            {dishes.length>0&&dishes.map((x,i)=>{return (<Dish key={i} d={x}/>)})}
            </div>
        </div>
    )
}