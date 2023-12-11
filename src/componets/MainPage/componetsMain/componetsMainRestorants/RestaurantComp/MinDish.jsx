import { useContext, useEffect, useState } from "react"
import { CtxCountDish, CtxNSum } from "../../../../../Contexts/Contexts";

export function MinDish({x}){
    const [count,setCount]=useState(x.count?x.count:1);
    const [map,setMap,sum,setSum,serviceFee,dishes,setDishes]=useContext(CtxCountDish);
    const [fl,setFL]=useState(true);   
    const [disc,setDisc]=useState(1);
    const [sumN,setSumN]=useContext(CtxNSum);
    useEffect(()=>{
        
        setDisc(dis((x.dtos?.length>0)?x.dtos:x.dtoSet,count));
      
        
    },[])
    
        
    
    useEffect(()=>{
        if(count>=1){
            dishes.set(x.id,{
                id_dishes:x.id,
                name:(x.name)?x.name:x.nameDish,
                cost:x.cost,
                count:count,
                disc:1-disc,
                dtoSet:(x.dtos?.length>0)?x.dtos:x.dtoSet
            })
        }
        else dishes.delete(x.id);
        setDishes(new Map(dishes))      
    },[count])
    return(
        fl&&<div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"space-evenly"
        }}>
        <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-evenly",
            textOverflow:"unset"
        }}>
            <p>
                <img src={x.img} alt="" style={
                    {
                        width:"80px"
                    }
                }/>
             </p> 
            <p className="prop" style={{marginLeft:"5px"}}>
                <p className="prop" style={{marginLeft:"0px",fontSize:"20px"}}>{x.nameDish}</p>                
                <p className="prop weigthVal" style={disc!=1?{textDecoration:'line-through'}:{}}>
                    <span>{x.cost*count} </span>
                    <span>₽</span>                    
                </p>
                {(disc!=1)&&<p className="prop weigthVal">
                    <span>{x.cost*count*disc} </span>
                    <span>₽</span>
                </p>}
                <p className="prop" style={{fontSize:"15px"}}>
                    <span>{x.weight} </span>
                    <span>г</span>
                </p>
            </p> 
        
            <p  className="prop" style={{
                display:"flex",
                "width":"120px",
               "justify-content": "space-evenly"
            }}>
                <span className="butInc" onClick={()=>{
                    if(count>1){
                        
                        setCount(count-1)
                        setSumN(sumN-x.cost*(disc!=1?disc:0)); 
                        setDisc(dis((x.dtos?.length>0)?x.dtos:x.dtoSet,count-1))                                            
                        serviceFee(sum-x.cost)
                        setSum(sum-x.cost)
                        map.set(x.id,x);
                        setMap(new Map(map));
                        return;
                    }
                    setSumN(sumN-x.cost*(disc!=1?disc:0));
                    setDisc(dis((x.dtos?.length>0)?x.dtos:x.dtoSet,count)) 
                    serviceFee(sum-x.cost)
                    setSum(sum-x.cost) 
                        map.delete(x.id)
                        setMap(new Map(map))
                        setFL(false)
                        return;
                    }}>-</span>
                <span className="butInc">{count}</span>
                <span className="butInc" onClick={()=>{if(count<30){
                    setCount(count+1);
                   
                    setDisc(dis((x.dtos?.length>0)?x.dtos:x.dtoSet,count+1))                    
                    serviceFee(sum+x.cost)
                    setSum(sum+x.cost) 
                    setSumN(sumN+x.cost*(disc!=1?disc:0));
                    map.set(x.id,x);
                    setMap(new Map(map));
                    return ;
                }alert("Не больше 30 блюд");
            }}>+</span>
            </p>   
        </div>
        </div>
    )
}

function dis(arr=[],count=0){
    let r=1;
   
   if(!arr)return 1; 
   for(let a of arr){
    if(a.onCountDish<=count){
        
        r*=(1-a.percent/100)==0?1:1-a.percent/100;

    }
   }   
   
   return r;
}