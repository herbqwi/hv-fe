import { useNavigate } from 'react-router';
import { IElection } from '../../../interfaces';
import ShowTimer from '../../base/show-timer/show-timer.component';
import ElectionCard from '../election-card/election-card.component';
import './elections-section.css'

interface IProps {
  elections: IElection.Election[],
  status: IElection.EVENT_STATUS
}

const ElectionsSection = ({ elections, status }: IProps) => {
  return <>
    {(elections.length) ? <section className='elections-section'>
      <p>{IElection.EventStatusInfo[status].title}</p>
      {elections.map((election: IElection.Election, i: number) => <ShowTimer timeout={80 * i}><ElectionCard key={election._id} election={election} status={status} /></ShowTimer>)}
    </section> : null}
  </>
}

export default ElectionsSection;