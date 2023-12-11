import { useContext } from "react";
import { CtxForActiv, CtxForActivReg } from "../../../Contexts/Contexts";

function RegStepFirst(){
    let setActiv=useContext(CtxForActivReg);
    let activ=useContext(CtxForActiv);
    return (
        <div className="authForm regAuth">
            <fieldset className="fieldsetLogIn">
                <label htmlFor="Family">Фамилия</label> 
                <input type="text" name="Family"/>
            </fieldset>
            <fieldset className="fieldsetLogIn">
                    <label htmlFor="Name">Имя</label> 
                    <input type="text" name="Name"/>
            </fieldset>
            <fieldset className="fieldsetLogIn">
                    <label htmlFor="Patronymic">Отчество</label> 
                    <input type="text" name="Patronymic"/>
            </fieldset>
            <button type="button" className="butAuth" onClick={()=>setActiv(activ+1)}>Далее</button>
        </div>   
    )
}
export default RegStepFirst;