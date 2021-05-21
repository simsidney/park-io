import React, {useEffect, useState, Fragment} from 'react'
import Campsite from './Campsite.jsx'
import Modal from 'react-modal'
import { dark } from '../Styles'

const Campgrounds = ({camps, name}) => {
  const [open, setOpen] = useState(false);
  const [renderCamp, setRenderCamp  ] = useState(false);

  useEffect(() => {
    setOpen(true)
    setRenderCamp(true);
  }, [camps]);

  const closeForm = () => {
    setOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <Fragment>
      {camps.length < 1 ?
        <Modal
        ariaHideApp={false}
        isOpen={open}
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
            maxHeight: '500px',
            margin: 'auto',
            border: `10px solid grey`
          }
        }}
        onRequestClose={() => closeForm()}
        >
       <h2 style={{margin: 'auto'}}>Please check the park website for camping details</h2>
       </Modal>
      :
      <Modal
        ariaHideApp={false}
        isOpen={open}
        style={{
          overlay: {
            backgroundColor: 'rgba(17, 17, 17, 0.75)',
            backdropFilter: 'blur(5px)'
          },
          content: {
            position: 'relative',
            backgroundColor: `${dark.bg}`,
            width: '25%',
            minWidth: '1100px',
            height: '60%',
            minHeight: '500px',
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
    <table style={{maxWidth: '1000px', marginLeft: '50px', borderCollapse: 'collapse'}}>
      <tbody>
        <tr style={{borderBottom: '1px solid white', padding: '5px'}}>
            <th>Name</th>
            <th style={{width: '300px'}}>Description</th>
            <th style={{width: '100px'}}>Fees</th>
            <th style={{width: '220px'}}>Hours</th>
            <th style={{width: '200px'}}>Dates Closed</th>
            <th>RSVP</th>
        </tr>
        {renderCamp ? <Fragment>
          {camps.map((camp, i) =>
          (<Campsite key={i} camp={camp} name={name}/>
          ))}
        </Fragment> : null}
      </tbody>
    </table>
    </Modal>
      }
    </Fragment>

  );
};


export default Campgrounds;