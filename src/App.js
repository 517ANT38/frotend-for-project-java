import logo from './logo.svg';
import './App.css';
import Main from './componets/MainPage/componetsMain/MainRestoranBlocks';

import "./style/mainStyle.css"
import React, { useEffect, useRef, useState } from "react"
import "./style/auth.css"
import Header from './componets/MainPage/componetsMain/Header';

import Footer from './componets/MainPage/componetsMain/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import SectionMainPage from './componets/MainPage/componetsMain/SectionMainPage';
import LogIn from './componets/MainPage/auth/LogIn';
import Registaration from './componets/MainPage/auth/Registaration';

import { YMaps } from '@pbe/react-yandex-maps';
import { CtxBasket, CtxClient, CtxGeoCode, CtxMapOpen, CtxOverFlow, CtxSearchR  } from './Contexts/Contexts';
import { Restaurant } from './componets/MainPage/componetsMain/componetsMainRestorants/Restaurant';
import { AuthLayout } from './componets/MainPage/auth/AuthLayout';
import { useLocalStorage } from './util/util';
import { SearchResult } from './componets/MainPage/componetsMain/componetsMainRestorants/SearchResult';
import { ProtectedLayout } from './componets/MainPage/auth/ProtectedLayout';
import ScrollLayout from './componets/MainPage/componetsMain/ScrollLayout';
import NavMain from './componets/MainPage/profile/NavMain';
import { DataClient } from './componets/MainPage/profile/DataClient';
import { Addresses } from './componets/MainPage/profile/Addresses';
import { Orders } from './componets/MainPage/profile/Orders';
import { lstCourierReg, lstSimpleReg, objWithData } from './util/AppUtil';
require('dotenv').config()
function App() {
  
  const [ovefflow,setOver]=useState(false);

  useEffect(()=>{
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = ovefflow ? "hidden" : "auto";
    }
  },[ovefflow]);
  const [search,setSearch]=useLocalStorage("seacrhR","");
  
  const [client,setClient]=useState({});
  const [basket,setBasket]=useLocalStorage("basket",[]);
const [id,setId]=useLocalStorage("idR",null);
const [category,setCategory]=useLocalStorage("category",null);
const [type,setType]=useLocalStorage("type",null);
const [name,setName]=useLocalStorage("restaurantName",null);
const [text,setText]=useLocalStorage("textCou",null);

  const removeBasket=()=>{
      setBasket([])
      setId(null)
      setCategory(null)
      setType(null)
      setName(null)
      setText(null)
  }

  const objWithData = {
      basket:basket,
      setBasket:setBasket,
      id:id,
      setId:setId,
      category:category,
      setCategory:setCategory,
      type:type,
      setType:setType,
      name:name,
      setName:setName,
      text:text,
      setText:setText,
      removeBasket:removeBasket
  }
  return (
    <CtxSearchR.Provider value={[search,setSearch]}>
    <CtxClient.Provider value={{client,setClient}}>
      <CtxOverFlow.Provider value={setOver}>
        <CtxBasket.Provider value={objWithData}>
          <YMaps query={{ 
            apikey: process.env.API_KEY,
            load: "package.full" 
            }} >
            <Routes>
              <Route element={<AuthLayout/>}>
                  <Route element={ <><Header/><Outlet/> <Footer/></>}>
                    <Route path='/restaurants' element={<SectionMainPage/>}/>
                    <Route path='/restaurants/sort/:ord' element={<SectionMainPage/>}/>
                    <Route path='/restaurants/kitchen/:name' element={<SectionMainPage/>} />
                    <Route path='/restaurants/kitchen/:name/sort/:ord' element={<SectionMainPage/>} />
                    <Route path='/restaurants/:id' element={<Restaurant/>}/>
                    <Route path='/search/:query' element={<SearchResult/>}/>                 
                </Route>
                <Route element={<ProtectedLayout/>}>
                      <Route path='/profile' element={<><NavMain/><Outlet/></>}>
                        <Route element={<ScrollLayout/>}>
                          <Route path='data' element={<DataClient/>}/>
                          <Route path='orders' element={<Orders/>}/>
                          <Route path='orders#:state' element={<Orders/>}/>
                          <Route path='address' element={<Addresses/>}/>
                        </Route>
                      </Route>
                </Route>
                <Route path='/auth/login' element={<LogIn/>}/>
                
                <Route path='/auth/registaration' element={
                  <Registaration lst={lstSimpleReg} typeReg={"Регистрация"}/>}/>
                <Route path='/auth/registaration/courier' 
                element={
                  <Registaration lst={lstCourierReg} typeReg={"Стать курьером"}/>
                  }/>
              </Route>
            </Routes>
            </YMaps>  
          </CtxBasket.Provider>
        </CtxOverFlow.Provider>
      </CtxClient.Provider>
      </CtxSearchR.Provider>
  );
}

export default App;
