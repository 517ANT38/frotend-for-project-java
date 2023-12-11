import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/auth";

let listeners = [];
let state = { counter: 0 };

const setState = (newState) => {
  state = { ...state, ...newState };
  listeners.forEach((listener) => {
    listener(state);
  });
};

const useCustom = () => {
  const newListener = useState()[1];
  useEffect(() => {
    listeners.push(newListener);
  }, []);
  return [state, setState];
};

export default useCustom;


export const useCheckAuth=(callback)=>{
  const { user } = useAuth();
  const navigate=useNavigate();
  return ()=>{
    console.log(user["jwtToken"])
    if (!user) {
      return navigate("/auth/login");
    }
    return callback();
  }
}