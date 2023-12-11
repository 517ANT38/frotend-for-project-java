import { useContext } from "react"
import { CtxForRestorauntBlock } from "../../../../../Contexts/Contexts";
import DegreeOfHighCost from "./DegreeOfHighCost";
import RatingMini from "./RatingMini";

function Description(){
    const {mainRestr,addInfo}=useContext(CtxForRestorauntBlock);
    return (
        <div className="description" style={{width:"500px",flexDirection:"row",height:"80px",marginTop:"90px"}}>
            <p className="descripParagph">
                <span style={{marginLeft:"30px"}}>{mainRestr.name}</span>
                <span style={{width: "180px",marginLeft:"10px"}}><DegreeOfHighCost avg={addInfo?.avgDishPrice} lenthSecq={3}/></span>
            </p>  
            <p className="descripParagph">
               <RatingMini/>
            </p>
            {/* <p className="descripParagph">
                <span className="orangeDeliv">{ctx.aboutDeliviryText}</span>
            </p>     */}
        </div>
    )
}
export default Description;