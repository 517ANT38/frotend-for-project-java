import { useContext } from "react";
import { CtxForActiv, CtxForActivReg } from "../../../Contexts/Contexts";
function RegAddCourier(){
    let setActiv=useContext(CtxForActivReg);
    let activ=useContext(CtxForActiv);
    return (
        <div className="authForm regAuth">
            <fieldset className="fieldsetLogIn dataPas">
                <label htmlFor="NumPas">Номер паспорта</label> 
                <input type="text" name="NumPas" style={{width:"80px"}}/>
            </fieldset>
            <fieldset className="fieldsetLogIn dataPas">
                    <label htmlFor="seriesPas">Серия паспорта</label> 
                    <input type="text" name="seriesPas" style={{width:"90px"}}/>
            </fieldset>
            <fieldset className="fieldsetLogIn dataPas">
                    <label htmlFor="INN">ИНН</label> 
                    <input type="text" name="INN"/>
            </fieldset>
            <div className="navButAuth">                
                <button type="button" className="butAuth" onClick={()=>setActiv(activ-1)}>Назад</button>
                <button type="button" className="butAuth" onClick={()=>setActiv(activ+1)}>Далее</button>
            </div> 
         </div>   
    )
}
export default RegAddCourier;