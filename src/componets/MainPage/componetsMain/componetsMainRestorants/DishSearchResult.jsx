import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CtxBasket, CtxMessageWrite, CtxOverFlow } from "../../../../Contexts/Contexts";

export function DishSearchResult({data,r}){
    const nav=useNavigate();
    const ok=()=>{nav(`/restaurants/${data.idRestaurants}`)};
    const ba=useContext(CtxBasket);
    const [objM,setObjM]=useContext(CtxMessageWrite);
    const setOver=useContext(CtxOverFlow);
    
    return (
        <div style={
            {
                backgroundColor:"#FFF",
                width:"230px",
                height:"280px",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                paddingTop:"20px"
            }
        }>
            <div>
                <img src={data.img} alt="" style={
                    {
                        height:"100px",
                        width:"150px"
                    }
                } />
            </div>
            <p className="prop weigthVal" style={{
                display:"flex",
                width:"60px",
                fontSize:"25px"
            }}>
                <span>{data.cost}</span>
                <span>₽</span>
            </p>
            <p className="prop" ><span>{data.nameDish}</span></p>
            <p  className="prop" style={
                {
                    "font-family": 'Roboto',
                    "font-style": "normal",
                    "font-weight": "400",
                    "font-size":" 20px",
                    "color":"#B1B1B1"
                }
            }><span>{data.weight}</span><span>г</span></p>           
         
            {<button className="changeBut" style={
                {
                    "width":" 123px",
                    "height": "38px",                    
                    "background": "#E5E4E4",
                    "border-radius": "20px",
                    border:"none",
                    cursor:"pointer",
                    fontFamily:"'Roboto'",
                    fontSize:"20px"
                }
            }
            
            
            onClick={()=>{
                if(ba.id!=data.idRestaurants&&ba.basket.length!=0){
                    objM.ok=ok;
                    objM.st=true;
                    objM.name=r.name;
                    setObjM({...objM});
                    setOver(true);
                    return;
                }                            
                ok();

            }}> К ресторану</button>}
           
        </div>
    )
} 