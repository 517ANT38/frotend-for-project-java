import { useContext } from "react";
import { CtxForActiv, CtxForActivReg } from "../../../Contexts/Contexts";
function RegStepThird(){
    let setActiv=useContext(CtxForActivReg);
    let activ=useContext(CtxForActiv);
    
    return (
        <div className="authForm regAuth">
            <fieldset className="fieldsetLogIn">
                    <label htmlFor="password">Пароль</label> 
                    <input type="password" name="password"/>
            </fieldset>
            <fieldset className="fieldsetLogIn" >
                    <label htmlFor="password" style={{width:"200px"}}>Повторить пароль</label> 
                    <input type="password" name="password"/>
            </fieldset>
            <div className="divNavReg">
                    <input 
                className="butAuth"
                type="submit" 
                value="Зарегистрироваться" 
                id="RegBut"
                />
                <button type="button" className="butAuth" onClick={()=>setActiv(activ-1)}>Назад</button>
            </div>
        </div>
    )
}
export default RegStepThird;