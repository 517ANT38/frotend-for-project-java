import { useContext } from "react";
import { CtxForActiv, CtxForActivReg } from "../../../Contexts/Contexts";

function RegStepSecond(){
    let setActiv=useContext(CtxForActivReg);
    let activ=useContext(CtxForActiv);
    return (
        <div className="authForm regAuth">
            <fieldset className="fieldsetLogIn">
               
                    <label htmlFor="Tel">Телефон</label> 
                    <input type="tel" name="Tel"/>
            </fieldset>
            <fieldset className="fieldsetLogIn">
                <button type="button" className="butAuth keyTel">
                    Получить код 
                </button>
                <input type="text" placeholder="Код из смс"/>
            </fieldset>
            
            <fieldset className="fieldsetLogIn">
                    <label htmlFor="Email">Почта</label> 
                    <input type="email" name="Email"/>
            </fieldset>
            <fieldset className="fieldsetLogIn">
                    <label htmlFor="Karta" style={{width:"120px"}}>Номер карты</label> 
                    <input type="text" name="Karta"/>
            </fieldset>
            <div className="navButAuth">                
                <button type="button" className="butAuth" onClick={()=>setActiv(activ-1)}>Назад</button>
                <button type="button" className="butAuth" onClick={()=>setActiv(activ+1)}>Далее</button>
            </div> 
        </div>   
    )
}
export default RegStepSecond;