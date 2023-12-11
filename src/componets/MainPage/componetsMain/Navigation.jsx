import { Link, useParams } from "react-router-dom";
import ButtonSorting from "../../common/ButtonSorting";
import { useContext, useEffect, useState } from "react";
import { error_handler } from "../../../util/util";
import { CtxFilter, CtxSort } from "../../../Contexts/Contexts";
import { Sort } from "./componetsMainRestorants/sorting/Sort";
//принимает массив элементов типа RefAndNameKitchen
function Navigation({arr=[]}){

    const ctx=useContext(CtxFilter);
    const [sort,setSort]=useState(false);
    const [sortCom,setCom]=useState("");
    const [st,setSt]=useState("all");
    const {name,ord}=useParams()
    const a=useParams();
    const filt=(name)=>fetch(`http://localhost:4545/api/restaurants${name}`)
        .then(x=>{
            error_handler(x);                
            return x.json();
        })
        .then(x=>ctx(x))
        .catch(x=>console.log(x)) 
    const selectAndSord=(c)=>{
        
        ctx([]);
        fetch(`http://localhost:4545/api/restaurants/enables/sorted_by/${c}`)
        .then(x=>{error_handler(x);return x.json()})
        .then(x=>x.length==0?ctx(null):ctx(x))
        .catch(x=>console.log(x))
    };
    const selectAndSordAndKtName=(c,k)=>{        
        ctx([]);    
        fetch(`http://localhost:4545/api/restaurants/enables/sorted_by/${c}/kitchen/${k}`)
        .then(x=>{error_handler(x);return x.json()})
        .then(x=>x.length==0?ctx(null):ctx(x))
        .catch(x=>console.log(x));
    }
    useEffect(()=>{
        if(ord){
            (name)?selectAndSordAndKtName(ord,name):selectAndSord(ord);
        }
    },[ord])    

    useEffect(()=>{
        if(name){
            filt(`/enables/kitchen/${name}`);
            setSt(name)
        }
    },[name]);
    
    return (
        <CtxSort.Provider value={[setSort,sortCom,setCom,selectAndSordAndKtName,selectAndSord]}>
            <nav className="navKitchen">
                
                <p><Link className="kitchen " style={(st=="all")?{'background-color': '#FFF'}:{}}  to="/restaurants" onClick={()=>{setSt("all");ctx([]);filt("/enables")}}>Все</Link></p>
                {arr.filter(x=>x.length!=0).map((x,i)=>{

                    return(
                        <p key={i} >
                            <Link 
                                key={i} 
                                to={`/restaurants/kitchen/${x}`} 
                                style={(st==x)?{'background-color': '#FFF'}:{}}
                                className="kitchen " onClick={()=>{setSt(x);ctx([]);filt("/enables/kitchen/"+x)}}>{x}</Link>
                        </p>
                    )}
                )}
                <ButtonSorting openMenuSortOrStart={()=>setSort(true)}/>
            </nav>
            {sort&&<Sort commands={["RATING","PRICE","ABC"]}/>}
        </CtxSort.Provider>
    );
}
export default Navigation;