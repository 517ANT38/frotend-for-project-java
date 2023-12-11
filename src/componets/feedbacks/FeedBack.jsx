import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function Feedback({data}){
    return (
        <div style={{
            backgroundColor:"#F6F6F6",
            borderRadius:"20px",
            width:"500px",
            padding:"20px",
            margin:"20px"
        }}>
            <p className="prop">
               {data.textFeedback} 
            </p>
            <p className="prop">
               <span> {starGen(data.countRatings)}</span>
               <span>({data.countRatings})</span>
            </p>
            <p className="prop">
                <span>
                    {data.dateFeedback}
                </span>
            </p>
        </div>
    )
}
function starGen(l,lim=5){
    const arr=[];
    for (let index = 0,j=l; index <lim; index++) {
        arr.push(
            <FontAwesomeIcon icon={faStar} style={(j>0)?{color:'#F6AC1C'}:{color:"#000"}}/>
        )
        j--;
        
    }
    return arr;
}