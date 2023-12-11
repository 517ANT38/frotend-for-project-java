import { useContext } from "react";
import { CtxForRestorauntBlock } from "../../../../../Contexts/Contexts";
import dimg from "./../../../../../images/DefaultRestaurant.png"
function ImgRestorant(){
    const {mainRestr}=useContext(CtxForRestorauntBlock);
    return (
        <div className="restoranImg" style={{height:"222px"}}>
            <img src={mainRestr.img?mainRestr.img:dimg} alt="" srcset="" />
        </div>
    )
}
export default ImgRestorant;