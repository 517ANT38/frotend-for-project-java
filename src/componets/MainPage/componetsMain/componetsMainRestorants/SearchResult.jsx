import { Link, useParams } from "react-router-dom";
import { error_handler } from "../../../../util/util";
import { useEffect, useState } from "react";
import MainRestoranBlocks from "../MainRestoranBlocks";
import imgP from "../../../../images/Rotating-Pizza-Slice-Preloader.gif"

export function SearchResult(){
    const {query}=useParams();
    const [arrRestaurants,setR]=useState([]);    
    const [infos,setInfos]=useState([]);
    const [fl,setFl]=useState(false);
    useEffect(()=>{
        fetch(`http://localhost:4545/api/restaurants/nameStartWith/${query}/enable`)
        .then(x=>{error_handler(x);return x.json()})
        .then(x=>{x.length>0?setR(x):setR({})})
        .catch(x=>console.log(x));
      
        fetch("http://localhost:4545/api/restaurants/information/all")
        .then(x=>{
            error_handler(x);                
            return x.json();
        })
        .then(x=>setInfos(x))
        .catch(x=>console.log(x))
    },[])
    return (

           
            <MainRestoranBlocks arryes={[arrRestaurants,infos]} />
            
       
    )
}