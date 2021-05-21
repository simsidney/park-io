import React, {useEffect, useState, Fragment} from 'react'
import ParkRender from './ParkRender.jsx'
import axios from 'axios'
import Campgrounds from './Campgrounds.jsx'
import npsAPI from '../../../config.js'

const Parks = ({state, theme}) => {

  const [renderPark, setRenderPark  ] = useState(false);
  const [camp, setCamp ] = useState([]);
  const [campSearch, setCampSearch] = useState(false)
  const [campSearchPark, setCampSearchPark] = useState('')

  const getCampgrounds = (e, code, parkName) => {
    e.preventDefault()
    // console.log(code)
    axios.get('https://developer.nps.gov/api/v1/campgrounds', {
      params: {
        parkCode: code,
        api_key: npsAPI
      }
    })
    .then((response) => {
      console.log(parkName)
      setCampSearchPark(parkName)
      setCamp(response.data.data)
      setCampSearch(true)
    })
  }



  useEffect(() => {
    setRenderPark(true);
  }, [state]);

  return (
    <div style={{display: 'inline', maxWidth: '1000px', height: '700px', marginTop: '9%', marginLeft: 'auto', marginRight: 'auto',
      overflow: 'auto', border: '1px solid white'}}>
      <div style={{display: 'flex', justifyContent: 'right'}}>
        {campSearch ? <Campgrounds camps={camp} name={campSearchPark}/> : null}
      </div>
      <table style={{borderCollapse: 'collapse', width: '99%'}}>
        <tbody>
          <tr>
            <th style={{borderBottom: '1px solid white', padding: '5px'}}>Name</th>
            <th style={ {borderBottom: '1px solid white', padding: '5px'}}>Description</th>
            <th style={ {borderBottom: '1px solid white', padding: '5px'}}>Campgrounds</th>
          </tr>
          {renderPark ? <Fragment>
        {state.map((park, i) =>
        (<ParkRender park={park} getCampgrounds={getCampgrounds} key={i}/>
        ))}
      </Fragment> : null}
      </tbody>
      </table>
    </div>

  );
};


export default Parks;