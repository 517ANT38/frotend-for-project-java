import FormLogIn from "./FormLogIn";
import NavAuth from "./NavAuth";
import RouteRefBack from "./RouteRefBack";

function LogIn(){
  return (
    <div className="mainAuth">
        <RouteRefBack str={"/restaurants"} className={"routeRefBack"}/>
        <h3 className="h_main">Вход</h3>    
        <FormLogIn/>
        <NavAuth/>
    </div>
  )  
}
export default LogIn;