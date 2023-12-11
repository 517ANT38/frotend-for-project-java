import { useState, useEffect } from "react";
 
function getStorageValue(key, defaultValue) {
  try{
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
  }catch(e){}
  return {}
}
 
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });
 
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    
  }, [key, value]);
  const remove=()=>{
    console.log(key)
    localStorage.removeItem(key);
    console.log(getStorageValue(key))

  }
  return [value, setValue,remove];
}

export function useInput(initialValue) {
  const [value,setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e);
  }

  return [value,handleChange];
}

export function parseJwt (token) {
  if(token.length==0)return {};
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
export function error_handler(x,...preLogout){
  let fl=true;
  if(x.status==401){            
      
     // preLogout.forEach(y=>y())
      fl=false;
  }
  else if(x.status==404){
      // alert("Ресторан(ы) не найден")
      //preLogout.forEach(y=>y())
      fl=false;
  }
  else if(x.status==403)
  {
     preLogout.forEach(y=>y())
      fl=false;
  }
  else if(x.status==500){
      //preLogout.forEach(y=>y())
      alert("У нас не поладки");
      fl=false;
  }
  else if(x.status==400){
      //preLogout.forEach(y=>y())
      alert("Неправильный логин или пароль")
      fl=false;
  }
  return fl;
}
const map=new Map()
map.set("FORMALIZED","Оформлен");
map.set("BUILD","Сборка");
map.set("READY","Готов")
map.set("DELIVERY","Доставка")
map.set("SUCCESSFULLY","Успешно завершен")
map.set("COURIER","Курьером")
map.set("PICKUP","Самовывоз")
map.set("COMMON","Простая")
map.set("EAGER","Быстрая")
map.set("RATING","По рейтингу")
map.set("PRICE","По стоимости блюд")
map.set("ABC","По названию")

map.set("DELIVERED","Доставлен")
map.set("SUCCESSFULLY","Успешно завершен")
map.set("","Все")
export const getMapTrans=(x)=>map.get(x);
export function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function avgCountWr(avg,countMax){
  if(750<=avg){
      return countMax;
  }
  else if(avg>=300&&avg<750){
      return countMax*Math.round(avg/750);
  }
  else return 1;
}
export const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest;



