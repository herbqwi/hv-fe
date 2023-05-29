import './elections-list.css'
import IconButton from '../../../../common/icon-button/icon-button.component';
import { faCopy, faLink } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { acceptInvite, declineInvite, getElectionInvites, getElections, getUserElections } from '../../../../../controllers/election.controller';
import { IElection } from '../../../../../interfaces';
import ShowTimer from '../../../../base/show-timer/show-timer.component';
import { useNavigate } from 'react-router';
import getEventTiming, { copyData } from '../../../../../services/general';
import { isApproved } from '../../../../../services/elections.service';

const ElectionInvitationsContainer = ({ invites, fetchData }: { invites: IElection.Election[], fetchData: any }) => {

  return <>
    {invites.length != 0 && <ShowTimer timeout={0}><div className="election-invitations-container">
      <h1>My invitations</h1>
      <h2>Manage your election invitations</h2>
      {invites.map((invite, i) => <ElectionInfoCard key={invite._id} election={invite} isInvitation={true} index={i} fetchData={fetchData}></ElectionInfoCard>)}
    </div></ShowTimer>}
  </>
}

const ElectionInfoCard = ({ election, isInvitation, index = 0, fetchData }: { election: IElection.Election, isInvitation?: boolean, index?: number, fetchData?: any }) => {
  const navigate = useNavigate();
  const { dateString } = getEventTiming({ startDate: election.dates.start, endDate: election.dates.finish });
  const approved = isApproved(election);

  return <ShowTimer timeout={60 * index}>
    <div className={`election-info-card${isInvitation ? ` invitation` : ``}${!approved ? ` not-approved` : ``}`}>
      <div onClick={() => { !isInvitation && approved && navigate(`/settings/my-elections/${election._id}`) }} className="info">
        <h1 className='title'>{election.title}</h1>
        {isInvitation ? <>
          <h2>{dateString}</h2>
        </> : <>
          <h2>{dateString}</h2>
          <h2>{election.candidates.length} Participants</h2>
        </>}
      </div>
      <div className="inputs-group">
        {isInvitation ?
          <>
            <IconButton onClick={async () => { acceptInvite(election._id as string); await fetchData() }}>Accept</IconButton>
            <IconButton onClick={async () => { declineInvite(election._id as string); await fetchData() }}>Decline</IconButton></>
          : (approved ? <><IconButton onClick={() => { navigate(election.electionType == IElection.ELECTION_TYPE.ONLINE? `/elections/${election._id}` : `/verify/${election.verifyId}`) }} icon={faLink}>Election Room</IconButton>
            {election.electionType != IElection.ELECTION_TYPE.ONLINE ? <IconButton onClick={() => { copyData(election.verifyId) }} icon={faCopy}>Copy Key</IconButton> : null}</> : <p className='not-approved'>Not yet approved</p>)}
      </div>
    </div>
  </ShowTimer>
}

const ElectionsList = () => {
  const [elections, setElections] = useState<IElection.Election[]>([]);
  const [invites, setInvites] = useState<IElection.Election[]>([]);

  useEffect(() => {
    const searchInvites = (electionId: string) => invites.find(invite => (invite._id == electionId));
    const newElections = elections.filter(election => !searchInvites(election._id as string))
    setElections(newElections);
  }, [invites])

  const fetchData = async () => {
    console.log(`fetching data...`)
    try {
      const elections = await getUserElections();
      setElections(elections.data);
    } catch {
      setElections([]);
    }

    try {
      const invites = await getElectionInvites();
      setInvites(invites.data);
    } catch {
      setInvites([]);
    }

    console.log(`fetched data!`)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return <>
    <ElectionInvitationsContainer invites={invites} fetchData={fetchData}></ElectionInvitationsContainer>
    {elections.length != 0 && elections.map((election, i) => <ElectionInfoCard key={election._id} election={election} index={i}></ElectionInfoCard>)}
  </>
}

export default ElectionsList;