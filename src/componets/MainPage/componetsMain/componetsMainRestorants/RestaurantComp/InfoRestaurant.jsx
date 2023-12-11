import { faCross, faCrosshairs, faMultiply, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DegreeOfHighCost from "../componetsRestaorantBlock/DegreeOfHighCost";

export function InfoRestaurant({x,info,onClose}){
    return (
        <div className="infr" style={
            {
                width:"300px",
                height:'max-content',
                background:"#FFF",
                position:"absolute",
                zIndex:"1000" ,
                top:"380px"
                   
            }
        }>
            <p style={{marginLeft:"280px"}} onClick={onClose}>
                <FontAwesomeIcon icon={faMultiply} style={{
                    width:"30px",
                    height:"30px",
                    color:"#dfd8d8fc"
                }} />
            </p>
            <h3>
                {x.name}
            </h3>
            <p>
             {x.address}                
            </p>
            <hr />
            <p>
                {x.kitchenTypes.join("-")+"-"}
                <DegreeOfHighCost avg={info.avgDishPrice} lenthSecq={3} fl={true}/>                
            </p>   
            <hr /> 
            <p>
                <span>Исполнитель продавец: </span>
                <span>{x.sender} </span>
                <span>{x.addressSender}</span>
            </p>
            <hr />
            <p>
                <span>Режим работы с </span>
                <span>{x.from}</span>
                <span> до</span>
                <span> {x.to}</span>
            </p>
        </div>
    )
}