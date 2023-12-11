import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import { avgCountWr } from "../../../../../util/util";

function DegreeOfHighCost({avg,lenthSecq,fl=false}){
    const arr=[];
    const count=avgCountWr(avg);
    const l=(fl)?count:lenthSecq;
    for(let i=0;i<l;i++){
        
        arr.push(<FontAwesomeIcon
             icon={faMoneyBill1Wave} 
             className="moneyImg"
             style={((i<count))?{color: "#000000"}:{color:"#9C9C9C"}} 
            />)
    }
    return arr;
}
export default DegreeOfHighCost;
