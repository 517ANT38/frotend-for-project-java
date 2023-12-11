import { useState } from "react";
import { CtxForActiv, CtxForActivReg } from "../../../Contexts/Contexts";
import RegStepFirst from "./RegStepFirst";
import RegStepSecond from "./RegStepSecond";
import RegStepThird from "./RegStepThird";
import { Link } from "react-router-dom";

import RouteRefBack from "./RouteRefBack";
function Registaration({lst,typeReg}){
    let [activ,setActiv]=useState(0);
    const receiver={};
    
    return (
        <div className="mainAuth regAuth">
            <RouteRefBack str={"/auth/login"} className={"routeRefBack"}/>
            <h3 className="h_main">{typeReg}</h3>
            <form action="" method="post">
                <CtxForActivReg.Provider value={setActiv}>
                  <CtxForActiv.Provider value={activ}> 
                    {lst[activ]}
                </CtxForActiv.Provider> 
                </CtxForActivReg.Provider>
            </form> 
        </div>
    )
}
export default Registaration;