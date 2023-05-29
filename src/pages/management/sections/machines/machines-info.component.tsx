import './machines-info.css'

import SlidingList from '../../../../components/management/dashboard/sliding-list/sliding-list.component';
import { faCheck, faCopy, faLink, faMarker, faTruckMedical, faWarning } from '@fortawesome/free-solid-svg-icons';
import DaySalesChart from '../../../../components/management/dashboard/charts/day-sales-chart/day-sales-chart.component';
import ChartContainer from '../../../../components/management/dashboard/charts/chart-container.component';
import PieChart from '../../../../components/management/dashboard/charts/best-selling-machines/best-selling-machines.component';
import BestSellingFood from '../../../../components/management/dashboard/charts/best-selling-food/best-selling-food.component';
import ShowTimer from '../../../../components/base/show-timer/show-timer.component';
import Map from './map/map.component';
import InfoCards from '../../../../components/management/machines-info/info-cards/info-cards.component';
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { IElection } from '../../../../interfaces';
import { getElection, publishKey } from '../../../../controllers/election.controller';
import getEventTiming, { copyData } from '../../../../services/general';
import IconButton from '../../../../components/common/icon-button/icon-button.component';
import { copyFile } from 'fs';
import ContentContainer from '../account-settings/content-container/content-container.component';
import lockedImage from '../../../../assets/locked.png';
import Button from '../../../../components/common/button/button.component';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/user.context';
import { generateRandomUUID } from '../../../../services/general.service';

interface IProps {
  fetchData: any,
}

const MachinesInfoSection = ({ fetchData }: IProps) => {

  const { id } = useParams();
  const [currentElection, setCurrentElection] = useState<IElection.Election | null>(null);
  const navigate = useNavigate();

  const isPublished = currentElection?.candidates.find(candidate => ((candidate.id == localStorage.getItem(`id`) ?? '') && candidate.keyPublished))

  const fetchCurrent = () => {
    getElection(id as string).then((res) => {
      let election = res.data;
      const et = getEventTiming({ startDate: election.dates.start, endDate: election.dates.finish });
      election = { ...election, eventStatus: et.eventStatus };
      console.log({ election });
      setCurrentElection(election);
      console.log(`verifyId: `, currentElection?.verifyId);
    })
  }

  useEffect(() => {
    fetchCurrent();
  }, [])

  useEffect(() => {
    fetchCurrent();
  }, [id]);

  const data = [
    { day: 'Mon', count: 5 },
    { day: 'Tue', count: 10 },
    { day: 'Wed', count: 7 },
    { day: 'Fri', count: 3 },
  ];

  return <div className="contents">
    <ShowTimer timeout={0}>
      <div className='header'>
        <div className='callout'>
          <p>Election Info</p>
          <p>{currentElection?.title}</p>
        </div>
        <div className='ct'>
          <IconButton onClick={() => { copyData(generateRandomUUID()) }} icon={faCopy}>Copy Key</IconButton>
          <IconButton onClick={() => { copyData(`http://localhost:3000/verify/${currentElection?.verifyId}`) }} icon={faCopy}>Copy Verify Link</IconButton>
          <IconButton onClick={() => { navigate(`/verify/${currentElection?.verifyId}`) }} icon={faLink}>Election Room</IconButton>
        </div>
      </div>
    </ShowTimer>
    <ShowTimer timeout={0}>
      <InfoCards></InfoCards>
    </ShowTimer>
    <ShowTimer timeout={100}>
      <SlidingList icon={faWarning} title="Warnings"></SlidingList>
    </ShowTimer>
    {!isPublished && <ShowTimer timeout={0}>
      <ContentContainer title="Election Keys" subtitle="Don't share your keys unless you know what you're doing!">
        <div className='key-lock'>
          <img className='lock' src={lockedImage} alt="" />
          <div>
            <h1 className='private'>Your key is Private</h1>
            <Button onClick={async () => {
              await publishKey(id); setTimeout(() => {
                fetchCurrent();
              }, 300);
            }}>Publish your key</Button>
          </div>
        </div>
      </ContentContainer>
    </ShowTimer>}
    <ShowTimer timeout={150}>
      <Map className={null}></Map>
    </ShowTimer>
  </div>
}

export default MachinesInfoSection;