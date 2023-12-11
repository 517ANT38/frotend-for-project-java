import { useContext, useEffect, useState } from "react"
import { CtxBasket, CtxCountDish, CtxNSum } from "../../../../../Contexts/Contexts"
import { counter } from "@fortawesome/fontawesome-svg-core";
import { useParams } from "react-router-dom";
import { MinDish } from "./MinDish";
import { error_handler, parseJwt, removeProperty, round } from "../../../../../util/util";
import { useCheckAuth } from "../../../../../util/hooks";
import { useAuth } from "../../../../../security/auth";

export function Basket(){
    const {map,setMap,sum,setSum,serviceFee,fee,feeOld,typeP,pCD,pTD,setPCD,setPTD,
        categoryP}=useContext(CtxCountDish);
    const {id}=useParams();
    const onFormSubmit = e => {
        e.preventDefault();
        
    };
    const ba=useContext(CtxBasket);
    const [bonuses,setBon]=useState(0);
    const [changeB,setChB]=useState();
    const [dishes,setDishes]=useState(new Map()); 
    const [typeDelivery,setTd]=useState(ba.type?ba.type:"COMMON");    
    const [categoryDelivery,setCd]=useState(ba.category?ba.category:"PICKUP");   
    const [oldB,setOldB]=useState(0);
    const [tCH,setTCH]=useState(false);
    const {user,logout}=useAuth();
    const json=parseJwt((user)?user["jwtToken"]:"");
    const [sumN,setSumN]=useContext(CtxNSum);
    const [textC,setTextC]=useState((ba?.text)?ba?.text:"");
    useEffect(()=>{
        ba?.setText(textC);
    },[textC])
    useEffect(()=>{
        ba?.setBasket([...map].map(([id,x])=>{ return[id,{
            id:id,
            img:x.img,
            name:x.nameDish,
            weight:x.weight,
            cost:x.cost,
            disc:(dishes.get(id)?.disc)?dishes.get(id).disc:1,
            count:dishes.get(id)?.count?dishes.get(x.id)?.count:1,
            dtoSet:(x.dtos?.length>0)?x.dtos:x.dtoSet
        }]}));
    },[map,dishes]);
    useEffect(()=>{
        fetch("http://localhost:1212/api/customs/calculate/off_bonuses_in_many",{
            method:"POST",
            headers:{
                'Content-Type':'application/json;charset=utf-8',
            },
            body:JSON.stringify({
                result:Number(bonuses)
            })
        })
        .then(x=>{error_handler(x); return x.json()})
        .then(x=>{setSum((sum+oldB-x.result)>0?sum+oldB-x.result:0);setOldB(sum<x.result?sum:x.result);})
        .catch(x=>console.log(x));
        if(!changeB){
            setSum(sum-oldB);
            setOldB(0);
        }
    },[bonuses])
    useEffect(()=>{
        ba.setType(typeDelivery);
        typeP(typeDelivery);
    },[typeDelivery])
    useEffect(()=>{  
        ba.setCategory(categoryDelivery);      
        categoryP(categoryDelivery);
        if(categoryDelivery=="PICKUP"){            
            setSum(sum-pTD);
            setTCH(false);
        }
        else if(categoryDelivery=="COURIER"){
            setTCH(true);
        }
    },[categoryDelivery]);
    useEffect(()=>{
        setSum(sum-feeOld+fee);
    },[fee])
    useEffect(()=>{
        if(map.size==0){
            setTd("COMMON");
            setCd("PICKUP");
            typeP(typeDelivery);
            categoryP(categoryDelivery);
            ba?.setText("");
        }
    },[map]);
    const insert=()=>{
        
        fetch(`http://localhost:1212/api/customs/new?clientId=${json.id}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'Authorization':"Bearer "+user["jwtToken"]
        },
        body:JSON.stringify({
                       
            idRestaurant:Number(id),            
            typeOfDelivery:typeDelivery,
            writOffBonuses:bonuses,
            categoryDelivery:categoryDelivery,
            textOrder:textC,
            dishDtoList:[...dishes.values()].map(({disc,...x})=>x),
        })
    }) .then(x=>{error_handler(x,logout); return x.json()})
    .then(x=>{
        setTextC("")
        setMap(new Map());
        setSum(0);
        setPCD(0);
        setPTD(0)
        return x})
    .catch(x=>console.log(x))
    setDishes(new Map());
    };     
    const check=useCheckAuth(insert);
    
    return (
       
            <form action="" onSubmit={onFormSubmit} style={{}}>
                <div
                    style={{
                        width:"340px",
                        backgroundColor:"#FFF",
                        height:'750px',
                        marginTop:"30px",
                        borderRadius:"20px",
                    }} 
                    >
                        <CtxCountDish.Provider value={[map,setMap,sum,setSum,serviceFee,dishes,setDishes]} >   
                            <h3 className="prop" style={{marginLeft:"40px",marginTop:"30px",fontSize:"27px"}}>Корзина</h3> 
                            {(map.size==0)&&<p className="prop" style={{
                                "marginTop":"200px",
                                "marginLeft":"60px",
                                fontSize:"30px"
                            }}>Корзина пуста</p>}
                            {(map.size>0)&&<>  
                                <div style={{
                                    overflowY:"visible",
                                    overflowX:"hidden",
                                    height:"200px",
                                    marginBottom:"15px",
                                    marginLeft:"10px"
                                }}>
                                    
                                    {
                                        [...map.entries()].map(([id,a])=> <MinDish key={id} x={a}/>)
                                
                                    }
                                </div>
                                <hr />
                                <div className="tdst" style={{
                                    display:"flex",
                                    marginLeft:"20px",
                                    justifyContent:"space-around",
                                    width:"300px"
                                }}>
                                    <div>
                                        <label className="prop"  htmlFor="typeDelivery">Тип доставки</label>
                                        <select disabled={!tCH} name="typeDelivery" id="" onChange={e=>{setTd(e.target.value);}}>
                                            <option className="prop" selected={typeDelivery=="COMMON"} value="COMMON">Простая</option>
                                            <option className="prop" selected={typeDelivery=="EAGER"} value="EAGER">Быстрая</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="prop" htmlFor="categoryDelivery">Вид доставки</label>
                                        <select name="categoryDelivery" id="" onChange={e=>{setCd(e.target.value);}}>                     
                                            <option className="prop" selected={categoryDelivery=="PICKUP"} value="PICKUP">Самовызов</option>
                                            <option className="prop" selected={categoryDelivery=="COURIER"} value="COURIER">Курьером</option>
                                        </select>
                                    </div>    
                                </div>
                                <div style={{
                                    display:"flex",
                                    width:"300px",
                                    justifyContent:"space-around",
                                    marginTop:"20px"
                                }}>
                                    
                                    <label className="prop" htmlFor="bonuses">Бонусы</label>
                                    <input className="prop" type="checkbox" name="bonusesWriteOff" id="" onChange={(x)=>setChB(x.target.checked)} />
                                    <label className="prop" htmlFor="bonusesWriteOff">Списать</label>
                                    <input className="prop" type="number" disabled={!changeB} min="1" onChangeCapture={e=>setBon(e.target.value)} style={{
                                        width:"100px"
                                    }} name="bonuses" id="" />
                                    
                                </div>
                                <hr />
                                
                                <div>
                                    <p className="prop">{`Сервиcный сбор ${round(fee,2)} ₽`}</p>
                                    <p className="prop">{`Доставка ${pCD+pTD} ₽`}</p>
                                </div>
                                <hr />
                                <div>
                                    <label htmlFor="textOrd" className="prop">
                                        Сообщение курьеру
                                    </label>
                                    <textarea defaultValue={textC} disabled={categoryDelivery!="COURIER"} onChange={e=>setTextC(e.target.value)} className="prop" style={{height:"100px",width: "280px",resize:"none"}} name="textOrd" id="" cols="30" rows="10"/>

                                </div>
                                <hr />
                                {(sum>0)&&<input type="submit" style={
                                    {
                                        cursor:"pointer",
                                        marginLeft:"30px",
                                        fontSize:"23px",
                                        color:"#FFF",
                                        border:"none",
                                        background: "#F6AC1C",
                                        'border-radius': '20px',
                                        width:"max-content"
                                    }
                                } className="changeBut" value={`Верно к оплате ${round(sum-sumN,2)+round(fee,2)} ₽`}
                                
                                onClick={check}
                                />}
                            </>}
                        </CtxCountDish.Provider>
                </div>
            </form>
       
    )
}