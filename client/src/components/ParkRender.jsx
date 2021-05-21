import React from 'react'

const ParkRender = ({park, getCampgrounds}) => {

  return (
    <tr style={{textAlign: 'center'}}>
    <td style={{borderBottom: '1px solid white', padding: '20px'}}>{park.fullName}</td>
    <td style={{borderBottom: '1px solid white', padding: '20px'}}>{park.description}</td>
    {park.activities.map((activity, i) => {
      if (activity.name === 'Camping') {
        return (<td key={i} style={{borderBottom: '1px solid white'}}><button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0 0 8px',
        border: 'none', cursor: 'pointer', width: '100%'}} onClick={(e) => getCampgrounds(e, park.parkCode, park.fullName)}>Get Campgrounds</button></td>)
      }
    })}
    <td style={{borderBottom: '1px solid white'}}></td>
    </tr>
  );
};


export default ParkRender;