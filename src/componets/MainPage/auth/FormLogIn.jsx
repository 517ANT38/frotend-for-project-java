import { useState } from "react";
import { error_handler } from "../../../util/util";
import { useAuth } from "../../../security/auth";

function FormLogIn(){
    const [email,setEmail]=useState("");
    const [pwd,setPwd]=useState("");
    const {login}=useAuth();
    const onFormSubmit = e => {
        e.preventDefault();
        
    };
    const account=()=>fetch("http://localhost:1212/api/auth/login",{
        method:"POST",
        headers:{
            'Content-Type':'application/json;charset=utf-8',
        },
        body:JSON.stringify({
            email:email,
            password:pwd
        })
    }).then(x=>error_handler(x)?x.json():null)
    .then(x=>login(x))
    .catch(x=>console.log(x))
    return (
        <form action="" method="POST" className="authForm" onSubmit={onFormSubmit}>
           <fieldset className="fieldsetLogIn">
            <label htmlFor="email">Почта</label> 
            <input type="email" name="email" onChange={e=>setEmail(e.target.value)}/>
           </fieldset>
           <fieldset className="fieldsetLogIn">
                <label htmlFor="password">Пароль</label> 
                <input type="password" name="password" onChange={e=>setPwd(e.target.value)}/>
           </fieldset>
           <input className="butAuth" type="submit" value="Войти" onClick={account} />
        </form>
    )
}
export default FormLogIn;