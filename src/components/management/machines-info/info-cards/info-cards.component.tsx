import { faChartLine, faCircle, faClock, faServer, faShoppingCart, faThermometerHalf, faUserClock } from '@fortawesome/free-solid-svg-icons';
import InfoCard from './info-card/info-card.component';
import './info-cards.css'
import { useParams } from 'react-router';
import { IElection } from '../../../../interfaces';
import { useEffect, useState } from 'react';
import { getElection, getStatistics } from '../../../../controllers/election.controller';
import getEventTiming from '../../../../services/general';
import useTimer from '../../../../hooks/timer.hook';

interface IProps {
  className?: string,
}

const InfoCards = ({ className }: IProps) => {

  const { id } = useParams();
  const [currentElection, setCurrentElection] = useState<IElection.Election | null>(null);
  const [curretnStatistics, setCurrentStatistics] = useState<{ totalVotes: number, votesLast24Hours: number, votesLast7Days: number } | null>(null);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
  }, [time]);

  useEffect(() => {

    getElection(id as string).then((res) => {
      let election = res.data;
      const et = getEventTiming({ startDate: election.dates.start, endDate: election.dates.finish });
      election = { ...election, eventStatus: et.eventStatus };
      console.log({ election });
      setCurrentElection(election);
      setTime(Date.now() - election.dates.start);
      setInterval(() => {
        setTime(prevTime => prevTime + 1000);
      }, 1000)
    })

    getStatistics(id as string).then((res) => {
      console.log(`ress: `, res.data);
      setCurrentStatistics(res.data);
    })
  }, [])

  const getStringET = () => {
    if (currentElection?.eventStatus == IElection.EVENT_STATUS.STARTED) {
      return `Started`
    } else if (currentElection?.eventStatus == IElection.EVENT_STATUS.ENDED) {
      return `Ended`
    } else if (currentElection?.eventStatus == IElection.EVENT_STATUS.ENDING_SOON) {
      return `Ending Soon`
    } else if (currentElection?.eventStatus == IElection.EVENT_STATUS.SCHEDULED) {
      return `Scheduled`
    } else if (currentElection?.eventStatus == IElection.EVENT_STATUS.STARTING_SOON) {
      return `Starting Soon`
    } else {
      return `None`
    }
  }

  const runTime = Math.ceil(((time / 1000) / 3600));

  return <div className={`machine-info-cards-container ${className}`}>
    <InfoCard icon={faServer} content={<div><div className={`status${true ? ` online` : ` offline`}`}></div> <p>{getStringET()}</p></div>} >Status</InfoCard>
    <div className='border'></div>
    <InfoCard icon={faThermometerHalf} content={<p>{curretnStatistics?.votesLast24Hours}</p>}>Daily votes</InfoCard>
    <div className='border'></div>
    <InfoCard icon={faChartLine} content={<p>{curretnStatistics?.votesLast7Days}</p>}>Weekly votes</InfoCard>
    <div className='border'></div>
    <InfoCard icon={faShoppingCart} content={<p>{curretnStatistics?.totalVotes}</p>}>Total votes</InfoCard>
    <div className='border'></div>
    <InfoCard icon={faUserClock} content={<p>{runTime >= 0 ? `${runTime} hours` : `Not yet running`}</p>}>Running since</InfoCard>
  </div>
}

export default InfoCards;