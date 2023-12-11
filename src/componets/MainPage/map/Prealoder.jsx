import BoxMap from "./BoxMap";

function Prealoder(){
    try{
    return (
        <div className="prealoader">
            <BoxMap />
        </div>
    );
    }catch(e){
        return null;
    }
}
export default Prealoder;