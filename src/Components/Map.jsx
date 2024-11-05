import React, { useEffect } from "react"
import { useState } from "react"
import styles from "./Map.module.css"

import {useNavigate, useSearchParams} from "react-router-dom"

import {MapContainer,TileLayer,Marker,Popup,useMap, useMapEvents} from "react-leaflet"
import { useCities } from "../Contexts/CitiesProvider"
import { useGeolocation } from "../hooks/useGeolocation"

import Button from "./Button"
import { useUrlPosition } from "../hooks/useUrlPosition"

const Map = () => {

  const [mapPosition,setMapPosition] = useState([40,0])

  const {cities} = useCities()

  const navigate = useNavigate()

  const {isLoading:positionLoading,position:geolocationPosition,getPosition} = useGeolocation()

   const [lat,lng] = useUrlPosition()

   useEffect(() => {

     if(lat!==null && lng!==null)
      setMapPosition([lat,lng])

   },[lat,lng])


   useEffect(() => {

      if(geolocationPosition)
       setMapPosition([geolocationPosition.lat,geolocationPosition.lng])


   },[geolocationPosition])


   console.log(mapPosition)


   return (
 
      <div className={styles.mapContainer} > 
      {!geolocationPosition && <Button type= "position" onClick={getPosition}>{positionLoading?("Loading..."):("use your position")}</Button> }   
      <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     {
      cities.map((city) => {

      return  (<Marker key={city.id} position={[city.position.lat,city.position.lng]}>
        <Popup>
          <span>{city.emoji}</span>
           <span>{city.cityName}</span>
        </Popup>
      </Marker>)
   
   })}

   <ChangeCenter position = {mapPosition} />

    <DetectClick />
    </MapContainer>     

      </div>

   )

}

const  ChangeCenter = ({position}) => {

    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick()
{

   const navigate = useNavigate()
   
   useMapEvents({
      click : (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
      }
   })


}

export default Map