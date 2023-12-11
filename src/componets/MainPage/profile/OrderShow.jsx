import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { error_handler, getMapTrans } from "../../../util/util";
import { CtxMapIds, CtxSum } from "../../../Contexts/Contexts";
import { useAuth } from "../../../security/auth";

export function OrderShow({setState}){
    
    const sum=useContext(CtxSum);
    const {data,newId}=useContext(CtxMapIds);
    return (
        <div style={{position:"absolute",
        width:"330px",
        top:"90px",
        borderRadius:"20px",
        right:"-80px",
        backgroundColor:"#FFF",
        textAlign:"center",
        zIndex:"100"
        }} onMouseLeave={()=>setState(false)}>
            <p className="prop">
                <span>Код заказа: </span>
                <span>{newId}</span>
            </p>
            <p className="prop">
                <span>Вид доставки: </span>
                <span>
                    {getMapTrans(data?.categoryDelivery)}
                </span>
            </p>
            <p className="prop">
                <span>
                    Тип доставки: </span>
                <span>
                    {getMapTrans(data?.typeOfDelivery)}
                </span>
            </p>
            <p className="prop">
                <span>Статус: </span>
                <span>
                    {getMapTrans(data.status)}
                </span>
            </p>
            <p className="prop">
                <span>Списанные бонусы: </span>
                <span>{data.writOffBonuses}</span>
            </p>
            <p className="prop">
                <span>Стоимость заказа: </span>
                <span>{sum}</span>
                <span>₽</span>
            </p>
        </div>
    )
}