import './election-card.css'
import { faCalendarDay, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getEventTiming from '../../../services/general';
import { IElection } from '../../../interfaces';
import { useNavigate } from 'react-router';

interface IProps {
  election: IElection.Election,
  status: IElection.EVENT_STATUS
  className?: string,
}

const CardHeader = ({ election }: { election: IElection.Election }) => {
  const { eventStatus, dateString } = getEventTiming({ startDate: election.dates.start, endDate: election.dates.finish });
  return <div className='header'>
    <div className='timing'>
      <FontAwesomeIcon icon={faCalendarDay} />
      <p>{dateString}</p>
    </div>
    {(eventStatus == IElection.EVENT_STATUS.STARTING_SOON || eventStatus == IElection.EVENT_STATUS.SCHEDULED) && <div className='heart'><FontAwesomeIcon icon={faHeart} /></div>}
  </div>
}

const CardBody = ({ election }: { election: IElection.Election }) => {
  return <>
    <p>{election.title}</p>
    <p>{election.candidates.map((candidate, i) => (candidate.name + (i != election.candidates.length - 1 ? ` vs. ` : ``)))}</p>
  </>
}

const CardFooter = ({ election }: { election: IElection.Election }) => {
  const { eventStatus } = getEventTiming({ startDate: election.dates.start, endDate: election.dates.finish });
  return <div className="footer">
    {(eventStatus == IElection.EVENT_STATUS.STARTED || eventStatus == IElection.EVENT_STATUS.ENDING_SOON || eventStatus == IElection.EVENT_STATUS.ENDED) ?
      <p>{(election.votes.length || IElection.EVENT_STATUS.ENDED) ? `${election.votes.length} Votes` : `Be the first to vote!`} </p>
      : <p>{election.interests.length} Interests</p>}
  </div>
}

const ElectionCard = ({ election, status, className }: IProps) => {
  const navigate = useNavigate();

  return <div className={`election-card ${className ? `${className} ` : ``} ${IElection.EventStatusInfo[status].color}`} onClick={() => { navigate(`/elections/${election._id}`) }}>
    <div className='content'>
      <CardHeader election={election}></CardHeader>
      <CardBody election={election}></CardBody>
    </div>
    <CardFooter election={election}></CardFooter>
  </div>
}

export default ElectionCard