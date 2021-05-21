import React, { Fragment, useState, useEffect } from 'react'
import Modal from 'react-modal'
import { dark, RSVPModalInput } from '../Styles'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import axios from 'axios';

const CampsiteRSVP = ({rsvp, closeForm, campName, parkName, exclusions}) => {
  const [rsvpDate, setRsvpDate] = useState(rsvp)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [overlap, setOverlap] = useState(false)

  useEffect(() => {
    setRsvpDate(true)
  }, [rsvpDate]);

  useEffect(() => {
    // console.log(exclusions)
  }, [])

  const addExclusions = (date) => {
    var pass = true;
    const allExclusions = exclusions.map((exception) => {
      return ([exception.startDate, exception.endDate])
    })
    for (let i = 0; i < allExclusions.length; i++) {
      if(!(date < new Date(allExclusions[i][0]) || date > new Date(allExclusions[i][1]))) {
        pass = false;
      }
    }
    return pass
  }

  const confirmRSVP = (e) => {
    e.preventDefault();
    setOverlap(false)
    var overlap = false;
    const test = []
    let name = document.getElementById('name')
    let email = document.getElementById('email')
    let startDate = document.getElementById('startDate')
    let endDate = document.getElementById('endDate')
    console.log(name.value, email.value, startDate.value, endDate.value, parkName, campName)
    if (name.validity.valid && email.validity.valid
    && startDate.validity.valid && endDate.validity.valid) {
      axios.get(`/npsItinerary?email=${email.value}`)
      .then((data) => {
        if (data.data.length > 0) {
          data.data.map((event) => {
            test.push([event.startDate, event.endDate])
          })
          // console.log(new Date(startDate.value).toISOString() > test[0][0])
          for (let i=0; i < test.length; i++) {
            if ((new Date(startDate.value).toISOString() >= test[i][0] && new Date(startDate.value).toISOString() <= test[i][1]) ||
            (new Date(endDate.value).toISOString() <= test[i][0] && new Date(endDate.value).toISOString() >= test[i][1])) {
              console.log('CONFLICT')
              setOverlap(true)
              overlap = true
            }
          }
        }
        if (!overlap) {
          axios.post(`/npsItinerary`, {
            username: name.value,
            email: email.value,
            park: parkName,
            campsite: campName,
            startDate: startDate.value,
            endDate: endDate.value
            })
            .then((response) => {
            console.log(response)
            closeForm();
            })
        }
      })
    }
  }

  return (
    <Fragment>
      <Modal
        ariaHideApp={false}
        isOpen={rsvpDate}
        style={{
          overlay: {
            backgroundColor: 'rgba(17, 17, 17, 0.75)',
            backdropFilter: 'blur(5px)'
          },
          content: {
            position: 'relative',
            backgroundColor: `${dark.bg}`,
            width: '25%',
            maxWidth: '1100px',
            height: '60%',
            maxHeight: '700px',
            margin: 'auto',
            border: `10px solid grey`
          }
        }}
        overlayClassName={{
          base: 'rsvpModalOverlay',
          afterOpen: 'rsvpModalOverlay-in',
          beforeClose: 'rsvpModalOverlay-out'
        }}
        onRequestClose={() => closeForm()}
        >
       <form>
       <h3 style={{margin: 'auto'}}>Park: {parkName}</h3><br></br>
       <h3 style={{margin: 'auto'}}>Campsite: {campName}</h3><br></br>
       <label>* What is your username? </label><br></br>
       <RSVPModalInput type="text" id="name" placeholder='Username:' name="name" maxLength='60' required></RSVPModalInput>
       <br></br>
       <br></br>
       <label>* What is your email? </label><br></br>
       <RSVPModalInput type="email" id="email" placeholder='Email:' name="email" maxLength='60' required></RSVPModalInput>
       <div style={{display: 'inline-flex', flexDirection: 'column', float: 'left'}}>
         <p>* Start date: </p><br></br>
         <DatePicker type="date" id='startDate' selected={startDate} onChange={date => {setStartDate(date); setEndDate(date)}} minDate={new Date()}
          filterDate={addExclusions}/>
       </div>
       <div style={{display: 'inline-flex', flexDirection: 'column', float: 'right', marginRight: '10%'}}>
         <p>* End date: </p><br></br>
         <DatePicker type="date" id='endDate' selected={endDate} onChange={date => setEndDate(date)} minDate={startDate}
          filterDate={addExclusions}/>
       </div>
       <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '40px 0 0 0', border: 'none', cursor: 'pointer', width: '40%'}}
      type='submit' onClick={(e) => {confirmRSVP(e)}}>Make RSVP</button>
      {overlap ? <p style={{color: 'red'}}>These dates overlap with another event! Please pick a different time.</p> : null}
       </form>
       </Modal>
    </Fragment>
  );
};


export default CampsiteRSVP;