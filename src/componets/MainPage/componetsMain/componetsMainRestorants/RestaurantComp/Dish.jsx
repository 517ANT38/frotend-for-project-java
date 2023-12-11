import { useContext, useEffect, useState } from "react"
import { CtxCountDish } from "../../../../../Contexts/Contexts"
import useCustom from "../../../../../util/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { error_handler } from "../../../../../util/util";

export function Dish({d}){

    const [st,setSt]=useState(true);
    const [data,setData]=useState(d);
    const {map,setMap,sum,setSum,serviceFee}=useContext(CtxCountDish);
    useEffect(()=>{
        if(!map.has(data.id)){
            setSt(true)
        }
        else setSt(false)
    },[map])
    useEffect(()=>{
        fetch(`http://localhost:4545/api/discounts/enables/dish/${d.id}`)
        .then(x=>{error_handler(x);return x.json()})
        .then(x=>setData({...d,dtos:x}))
        .catch(x=>console.log(x))
    },[])
    return (
        <div style={
            {
                backgroundColor:"#FFF",
                width:"230px",
                height:"max-content",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                paddingTop:"20px",
                paddingBottom:"10px",
                marginLeft:"10px"
            }
        }>
            <div>
                <img src={data.img} alt="" style={
                    {
                        height:"100px",
                        width:"150px"
                    }
                } />
            </div>
            <p className="prop weigthVal" style={{
                display:"flex",
                width:"60px",
                fontSize:"25px"
            }}>
                <span>{data.cost}</span>
                <span>₽</span>
            </p>
            {data.dtos?.length>0&&<p className="prop">
                <span style={{display:'block',marginLeft:"30px",fontWeight:"bold"}}>Скидки: </span>
                
            {data.dtos?.map(x=><span  style={{display:'block',}}>
                Скидка {x.percent}% с {x.onCountDish} блюд
            </span>)}
                    
            </p>}
            <p className="prop" ><span>{data.nameDish}</span></p>
            <p  className="prop" style={
                {
                    "font-family": 'Roboto',
                    "font-style": "normal",
                    "font-weight": "400",
                    "font-size":" 20px",
                    "color":"#B1B1B1"
                }
            }><span>{data.weight}</span><span>г</span></p>           
         
            {(st)&&<button className="changeBut" style={
                {
                    'color':"#000",
                    "width":" 123px",
                    "height": "38px",                    
                    "background": "#E5E4E4",
                    "border-radius": "20px",
                    border:"none",
                    cursor:"pointer",
                    fontFamily:"'Roboto'",
                    fontSize:"20px"
                }
            }
            
            
            onClick={()=>{setSt(false) ;map.set(data.id,data);setMap(new Map(map));setSum(sum+data.cost);serviceFee(data.cost)}}><FontAwesomeIcon icon={faPlus} color="#000"/> Добавить</button>}
            {(!st&&map.size>0)&&<p className="prop" style={
                {
                    "color":"rgb(177, 177, 177)"
                }
            }>Заказ добавлен в корзину</p>}
        </div>
    )
} 