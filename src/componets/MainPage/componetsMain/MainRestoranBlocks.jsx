import React, { useCallback, useEffect, useState } from "react"
import RestoranBlock from "./componetsMainRestorants/RestoranBlock";
import Restorant from "../../../util/Restorant";
import imgRs from "../../../images/DefaultRestaurant.png"
import Rating from "../../../util/Rating";
import { CtxBasket, CtxMessageWrite } from "../../../Contexts/Contexts";
import { useLocalStorage } from "../../../util/util";
import { MessageFlowBasket } from "./componetsMainRestorants/RestaurantComp/MessageFlowBasket";
import imgP from "../../../images/Rotating-Pizza-Slice-Preloader.gif"
function MainRestoranBlocks({arryes=[[],[]]}){
    const arr=arryes[0];
    const [imgSt,setImgSt]=useState(true);
    const [objM,setObjM]=useState({
        st:false,
        ok:()=>{},
        name:"",
    });
    useEffect(()=>{
        if((arr?.length>0)||!("map"in arr)){
            setImgSt(false)
        }
        else setImgSt(true)
    },[arr])
    const findById=(a,id)=>{
        return a.filter(x=>x.id==id)[0];
        
    }
    return  (
        <CtxMessageWrite.Provider value={[objM,setObjM]}>
            <main className="restorantsMain">
                <MessageFlowBasket />
                {imgSt&&<img src={imgP} style={{height:"30%",marginLeft:"0px",marginTop:"50px",marginBottom:"50px"}}/>}

                {
                    ("map"in arr)?arr.map(elem=><RestoranBlock x={[elem,findById(arryes[1],elem.id)]}/>):(<p
                    style={{marginTop:"200px",height:"200px",marginBottom:"200px"}}
                    
                    className="descripParagph" >
                        Не найдено
                    </p>)
                }
            </main>
            </CtxMessageWrite.Provider>
    );
    
}
export default MainRestoranBlocks;
function* genRestoran(){
    for(let i=0;i<6;i++){
        let str=(i%2==0)?"Доставка бесплатно":"";
        let str1=(i%2==0)?"Хорошо":"Мало отзывов";
        let fl=!i%2;
        yield new Restorant(
                imgRs,
                "Restoran"+i,
                (i>=3)?i%3:i,
                str,
                new Rating(str1,fl,i+i*0.1,i+10)
            );
    }
}