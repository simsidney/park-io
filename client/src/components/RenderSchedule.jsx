import React, { Fragment, useState, useEffect } from 'react'
import Modal from 'react-modal'
import { dark, RSVPModalInput } from '../Styles'
import RenderEvent from './RenderEvent.jsx'

const RenderSchedule = ({schedule, results, deleteEvent }) => {
  const [scheduleFound, setScheduleFound] = useState(results)


  useEffect( async () => {
    setScheduleFound(true)

  }, [schedule]);

  const closeResults = () => {
    setScheduleFound(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <Fragment>
      <Modal
        ariaHideApp={false}
        isOpen={scheduleFound}
        style={{
          overlay: {
            backgroundColor: 'rgba(17, 17, 17, 0.75)',
            backdropFilter: 'blur(5px)'
          },
          content: {
            position: 'relative',
            backgroundColor: `${dark.bg}`,
            width: '50%',
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
        onRequestClose={() => closeResults()}
        >

      <table>
        <tbody>
          <tr>
            <th>Park</th>
            <th>Campsite</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
      {schedule.map((event) =>
         (<RenderEvent event={event} deleteEvent={deleteEvent}/>)
       )}
        </tbody>
      </table>
       </Modal>
    </Fragment>
  );
};


export default RenderSchedule;