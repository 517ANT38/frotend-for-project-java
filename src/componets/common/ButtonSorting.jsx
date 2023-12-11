import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
function ButtonSorting({openMenuSortOrStart}){
    return (
        <button 
            type="button"
            className="buttonSort" 
            onClick={openMenuSortOrStart}>
            <span><FontAwesomeIcon icon={faSliders} style={{color: "#030407",}} /></span>    
            <span>Сортировка</span>
        </button>
    )
}
export default ButtonSorting;