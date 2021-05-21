import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios'
import Campgrounds from './Campgrounds.jsx'
import StateFilter from './StateFilter.jsx'
import RenderSchedule from './RenderSchedule.jsx'
import Parks from './Parks.jsx'
import npsAPI from '../../../config.js'
import { ThemeProvider } from 'styled-components';
import { Body, dark, light } from '../Styles';

const App = () => {
  const [theme, setTheme] = useState(dark);
  const [parks, setParks ] = useState([]);
  const [stateFilter, setStateFilter] = useState('CA')
  const [parkSearch, setParkSearch] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [renderResults, setRenderResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])


  const getParks = async () => {
    return await axios.get('https://developer.nps.gov/api/v1/parks', {
      params: {
        stateCode: stateFilter,
        api_key: npsAPI
      }
    })
    .then((response) => {
      setParks(response.data.data)
      setParkSearch(true)
    })
  }

  const handleStateChange = (state) => {
    setStateFilter(state);
  }

  const getNPSPlans = (e, email) => {
    if (email === null) {
      e.preventDefault();
      let getEmail = document.getElementById('getEmail')
      if (getEmail.validity.valid){
        axios.get(`/npsItinerary?email=${getEmail.value}`)
        .then((data) => {
          if (data.data.length < 1) {
            console.log('HELLO')
            setNoResults(true)
          } else {
            setNoResults(false)
            setRenderResults(true)
            setSearchResults(data.data)
          }
        })
      }
    } else {
      axios.get(`/npsItinerary?email=${email}`)
      .then((data) => {
        if (data.data.length < 1) {
          console.log('HELLO')
          setNoResults(true)
        } else {
          setNoResults(false)
          setRenderResults(true)
          setSearchResults(data.data)
        }
      })
    }

  }

  const deleteEvent = (e, event) => {
    e.preventDefault();
    axios.delete('/npsItinerary', {
      params: {
        username: event.username,
        email: event.email,
        park: event.park,
        campsite: event.campsite,
        startDate: event.startDate,
        endDate: event.endDate
      }
    })
    .then(() => {
      console.log('success')
      getNPSPlans(null, event.email)
    })
  }

  useEffect(() => {
    getParks();
  }, [stateFilter]);

  return (
    <ThemeProvider theme={theme}>
    <Body/>
    <div style={{display:'flex', float: 'left', flexDirection: 'column', maxWidth: '200px', marginTop: '5%', marginLeft: '5%'}}>
    <h1>Park.io</h1>
    <h4>Choose a state!</h4>
    <StateFilter theme={theme} state={stateFilter} onChange={(state) => handleStateChange(state)}/>
    <form style={{float: 'left',  maxWidth: '200px', marginTop: '50%'}}>
      <label>Enter your email to retrieve your schedule!</label><br></br>
      <input id='getEmail' type="email" placeholder="Email: " required></input>
      <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '40px 0 0 0', border: 'none', cursor: 'pointer', width: '80%'}}
      type='submit' onClick={(e) => {getNPSPlans(e, null)}}>Get Schedule</button>
      {noResults ? <p style={{color: 'red'}}>No schedules associated with this email!</p> : null}
    </form>
    </div>
    <div style={{display: 'flex'}}>
    {renderResults ? <RenderSchedule schedule={searchResults} results={renderResults} deleteEvent={deleteEvent}/> : null}
    {parkSearch ? <Parks theme={theme} state={parks}/> : null}
    </div>
    </ThemeProvider>
  );
};


export default App;