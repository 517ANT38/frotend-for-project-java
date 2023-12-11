import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"
function RouteRefBack({str,className}){
    return (
        <p className={className}>
                <Link to={str} className="">
                    <FontAwesomeIcon icon={faAngleLeft} style={{color: "#000000",}} />
                </Link>
        </p>
    )
}
export default RouteRefBack;