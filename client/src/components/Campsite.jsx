import React, {useState, useEffect, Fragment} from 'react'
import CampsiteRSVP from './CampsiteRSVP.jsx'

const Campsite = ({camp, name}) => {
  const [rsvp, setRsvp] = useState(false)

  const makeRSVP = (e, camp) => {
    setRsvp(true)
  }

  const closeForm = () => {
    setRsvp(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <Fragment>
    <tr style={{textAlign: 'center', borderBottom: '1px solid white', padding: '20px'}}>
    <td style={{padding: '20px'}}>{camp.name}</td>
    <td style={{padding: '20px'}}>{camp.description}</td>
    { camp.fees.length !==0 ? <td style={{padding: '20px'}}>{'$' + camp.fees[0].cost}</td> : <td></td> }
    { camp.operatingHours.length !== 0 ? <td style={{padding: '20px'}}>
    Monday:  {camp.operatingHours[0].standardHours.monday} <br></br>
    Tuesday:  {camp.operatingHours[0].standardHours.tuesday} <br></br>
    Wednesday:  {camp.operatingHours[0].standardHours.wednesday} <br></br>
    Thursday:  {camp.operatingHours[0].standardHours.thursday} <br></br>
    Friday:  {camp.operatingHours[0].standardHours.friday} <br></br>
    Saturday:  {camp.operatingHours[0].standardHours.saturday} <br></br>
    Sunday:  {camp.operatingHours[0].standardHours.sunday} <br></br>
    </td> : <td>Check their website</td> }
    { camp.operatingHours.length !== 0 ? <td style={{padding: '20px'}}>{camp.operatingHours[0].exceptions.map((exception) => {return (exception.startDate + '\n to \n' + exception.endDate + '\n')})}</td> : <td>Check their website</td> }
    <td><button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0 0 8px', border: 'none', cursor: 'pointer', width: '100%'}}
      onClick={(e) => {makeRSVP(e, camp)}}>RSVP</button></td>
    </tr>
    {rsvp ? <CampsiteRSVP rsvp={rsvp} closeForm={closeForm} campName={camp.name} parkName={name} exclusions={camp.operatingHours[0].exceptions}/> : null}
    </Fragment>
  );
};


export default Campsite;