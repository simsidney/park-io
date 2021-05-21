import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';

const RenderEvent = ({ event, deleteEvent }) => {

  return (
   <tr>
     <td style={{padding: '20px'}}>{event.park}</td>
     <td style={{padding: '20px'}}>{event.campsite}</td>
     <td style={{padding: '20px'}}>{event.startDate.substring(0,10)}</td>
     <td style={{padding: '20px'}}>{event.endDate.substring(0,10)}</td>
     <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '10px 0 0 0', border: 'none', cursor: 'pointer', width: '100%'}}
      type='submit' onClick={(e) => deleteEvent(e, event)}>Delete</button>
   </tr>
  );
};


export default RenderEvent;