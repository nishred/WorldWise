/* eslint-disable no-empty */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import styles from "./Form.module.css";

import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CitiesProvider";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji,setEmoji] = useState("")

  const navigate = useNavigate()

  const [lat,lng] = useUrlPosition()

  const [isLoadingGeoLocation,setIsLoadingGeoLocation] = useState(false)

  const [geoLocationError,setGeoLocationError] = useState("")

  const {createCity,isLoading} = useCities()



  useEffect(() => {

    if(!lat && !lng)
      return;   

    async function fetchGeoLocation()
    {

      try{

      setIsLoadingGeoLocation(true)

      setGeoLocationError("")

       const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)

       const json = await response.json()

       if(!json.countryCode)
        throw new Error("That doesn't seem like a country. Please click Somewhere else")

       setCityName(json.city || json.locality || "")
       setCountry(json.country)
       setEmoji(convertToEmoji(json.countryCode))

      }
      catch(err)
      {
         setGeoLocationError(err.message)

      }
      finally
      {
        setIsLoadingGeoLocation(false)

      }

    }

    fetchGeoLocation()



  },[lat,lng])


  if(isLoadingGeoLocation)
    return <Spinner />


  if(geoLocationError)
    return <Message message={geoLocationError} />


 async function handleSubmit(e)
  {

     e.preventDefault()

     if(!cityName || !date)
      return;


     const newCity = {

       cityName,
       country,
       emoji,
       date,
       notes,
       position : {lat,lng}
        
     }

    await createCity(newCity)

    navigate("/app")

  }



  return (
    <form className={`${styles.form} ${isLoading?(styles.loading):("")}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span> 
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat = "dd/MM/yyyy" />

      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>

      <Button type="primary">ADD</Button>
       
      <BackButton />
      </div>
    </form>
  );
}

export default Form;
