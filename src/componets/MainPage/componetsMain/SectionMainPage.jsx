import { useContext, useEffect, useState } from "react";
import MainRestoranBlocks from "./MainRestoranBlocks";
import Navigation from "./Navigation";
import { CtxFilter, CtxMapOpen, CtxMapOpenStyle } from "../../../Contexts/Contexts";
import { useParams } from "react-router-dom";
import { error_handler } from "../../../util/util";

function SectionMainPage(){
    const [kitchens,setKitchens]=useState([]);
    const [restaurants,setRest]=useState([]);
    const [infos,setInfos]=useState([]);
    const {name,ord}=useParams();
    useEffect(()=>{
        fetch("http://localhost:4545/api/restaurants/kitchen/types")
        .then(x=>{
            error_handler(x);                
            return x.json();
        })
        .then(x=>setKitchens(x))
        .catch(x=>console.log(x))
        if(!name&&!ord){
            fetch("http://localhost:4545/api/restaurants/enables")
            .then(x=>{
                error_handler(x);                
                return x.json();
            })
            .then(x=>setRest(x))
            .catch(x=>console.log(x))
        }
        fetch("http://localhost:4545/api/restaurants/information/all")
        .then(x=>{
            error_handler(x);                
            return x.json();
        })
        .then(x=>setInfos(x))
        .catch(x=>console.log(x))
    },[])
    return (
        <CtxFilter.Provider value={setRest}>
            <section className='sectionMainPage' >        
                <Navigation arr={kitchens}/>
                <MainRestoranBlocks arryes={[restaurants,infos]}/>
            </section>
        </CtxFilter.Provider>
    )
}
function* gen(){
    for(let i=0;i<9;i++)yield {ref:"/kitchen"+i,name:"Кухня"+i};
}
export default SectionMainPage;