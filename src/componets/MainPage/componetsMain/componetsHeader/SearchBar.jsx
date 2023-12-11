import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { error_handler } from "../../../../util/util";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CtxSearchR } from "../../../../Contexts/Contexts";

const SearchBar = () =>{ 
    
    const nav=useNavigate();
    const [search,setSearch]=useContext(CtxSearchR);
    const [text,setText]=useState(search);
    useEffect(()=>{
        setSearch(text);
    },[text])
    useEffect(()=>{
        if(text.length!=0){
           nav(`/search/${text}`)     
        }
    },[])
    return (
   
        <div className="input-box">      
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svgSearh" /> 
            {(text.length>0)&&<FontAwesomeIcon style={{left:"490px"}} icon={faMultiply} onClick={()=>{
                setText("");
                nav("/restaurants");
                }} className="mplCL"/>  }     
       
            <input type="text" placeholder="Найти ресторан" value={text} onChange={e=>setText(e.target.value)} className="searchInput"/>
            <button type="button"
            onClick={()=>nav(`/search/${text}`)}
            
            className="searchButton">Найти</button>
        </div>
    )
};

export default SearchBar;


