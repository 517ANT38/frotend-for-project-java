import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../componetsMain/componetsHeader/SearchBar";
import SearchForMap from "./SearchForMap";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { CtxGeoCode, CtxMapAddress, CtxMapLonLan, CtxMapObjAddress, CtxMapOpen } from "../../../Contexts/Contexts";
import React, { useContext, useEffect, useState } from "react";
import { GeolocationControl, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";

function BoxMap({styl={}}){
    const [ymaps,setYmaps] = useState({});
    const setState=useContext(CtxMapOpen);
    const [lat,setLan]=useState(51.32);
    const [lon,setLon]=useState(46.00);
    const mapRef = React.useRef(null);
    const [address, setAddress] = React.useState("");
    const [objAddress,setObjA]=useState({
        address:"",
        geoPoint:{lat:0,lon:0}
    });
    const mapOnChange = (event) => {
        const oldStateMap = {
          center: event.originalEvent.oldCenter,
          zoom: event.originalEvent.oldZoom,
          bounds: event.originalEvent.oldBounds,
        }
        const newStateMap = {
          center: event.originalEvent.newCenter,
          zoom: event.originalEvent.newZoom,
          bounds: event.originalEvent.newBounds,
        }
        setLan(event.originalEvent.newCenter[0]);
        setLon(event.originalEvent.newCenter[1]);
        getAddress(event.originalEvent.newCenter);
      }
    const createFullAddress=(firstGeoObject)=>{
        const newAddress = [
            firstGeoObject.getLocalities().length
                ? firstGeoObject.getLocalities()
                : firstGeoObject.getAdministrativeAreas(),
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            firstGeoObject.getPremiseNumber()||""
            ]
            .filter(Boolean)
            .join(", ");
        return newAddress;    
    }
    const createSimpleAddress=(firstGeoObject)=>{
        let simpleA=firstGeoObject.getThoroughfare()
        let n=firstGeoObject.getPremiseNumber();
        simpleA+=(!n)?"":","+n;
        return simpleA;
    }
   
    const getAddress = (coords) => {
      
      ymaps.geocode(coords).then((res) => {
       
        const firstGeoObject = res.geoObjects.get(0);        
        if(firstGeoObject.getThoroughfare()){            
            objAddress.address=createFullAddress(firstGeoObject);
            objAddress.geoPoint.lat=coords[0];
            objAddress.geoPoint.lon=coords[1];
           
            setObjA({...objAddress})            
            setAddress(createSimpleAddress(firstGeoObject));
            return;
        }
        setAddress("");
      });
    };
    
    const onMapClick = (e) => {
      const coords = e.get("coords");
      setLan(coords[0]);
      setLon(coords[1]);
      getAddress(coords);
    };
    return (
        <CtxMapObjAddress.Provider value={objAddress}>
            <CtxGeoCode.Provider value={ymaps}>
                <CtxMapLonLan.Provider value={[setLan,setLon]}>
                    <CtxMapAddress.Provider value={[address,setAddress]}>
                        <div className="boxMap" style={styl}>
                            <div className="headDisp">
                                <div className="headDispsdafdsf">
                                        <div className="dsfsgs">
                                            <h3  className="dicp ">
                                                Укажите адрес доставки
                                                
                                            </h3>
                                            <p className="pFaCl" onClick={()=>{setState(false);}}>
                                                <FontAwesomeIcon icon={faWindowClose} className="faCl"/>
                                            </p>
                                        </div>
                                        <p className="dicp">
                                            Чтобы курьер смог вас найти
                                        </p>
                                    </div>
                                    <SearchForMap/>
                            </div>
                            <div className="box-min-map">
                                
                                <Map                     
                                modules={["Placemark","geocode","geoObject.addon.balloon"]}
                                onLoad={(ympasInstance) => (setYmaps( ympasInstance))}
                                state={{ center: [lat, lon], zoom: 10,controls:[] }}
                                instanceRef={mapRef}
                                onClick={onMapClick}
                                onBoundsChange={mapOnChange}
                                options={{yandexMapDisablePoiInteractivity: true}}
                                className="map">
                                    <GeolocationControl options={{ float: "left" }} />
                                    <ZoomControl options={{ float: "right" }} />
                                    <Placemark geometry={[lat, lon]} options={{draggable:true,
                                        iconColor:"#F6AC1C",
                                        
                                        
                                        }} />
                                </Map>
                            </div>
                        </div>
                    </CtxMapAddress.Provider>
                </CtxMapLonLan.Provider>
            </CtxGeoCode.Provider>
        </CtxMapObjAddress.Provider>
    )
   
}
export default BoxMap;