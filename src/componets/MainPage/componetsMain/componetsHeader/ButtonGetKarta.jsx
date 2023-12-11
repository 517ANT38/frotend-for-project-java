import { useContext } from "react";
import { CtxMapOpen } from "../../../../Contexts/Contexts";

function ButtonGetKarta(){
    const setState=useContext(CtxMapOpen);
    return (
        <button type="button" id="getKarta" onClick={()=>{setState(true);}}>
            Укажите адрес доставки
        </button>
    )
}
export default ButtonGetKarta;