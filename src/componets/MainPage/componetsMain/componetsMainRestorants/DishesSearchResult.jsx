import { useState } from "react";
import { DishSearchResult } from "./DishSearchResult";
import { CtxMessageWrite } from "../../../../Contexts/Contexts";

export function DishesSearchResult({arr=[]}){
    const [objM,setObjM]=useState({
        st:false,
        ok:()=>{},
        name:"",
    });
    return (
        <CtxMessageWrite.Provider value={[objM,setObjM]}>
            <div>
                {arrDishes.map(x=><DishSearchResult data={x} />)}
            </div>
         </CtxMessageWrite.Provider>
    )


}