import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SectionsNav from '../../components/management/dashboard/sections-nav/sections-nav.componnet';
import { IElection } from '../../interfaces';
import './management.css'
import AccountSettingsSection from './sections/account-settings/account-settings.component';
import NewElectionSection from './sections/create-election/new-election.component';
import DashboardSection from './sections/dashboard/dashboard.component';
import MachinesInfoSection from './sections/machines/machines-info.component';
import InviteSection from './sections/invite/invite.component';
import { getElectionInvites, getUserElections } from '../../controllers/election.controller';

interface IProps {
  electionName: { value: string, set: any },
  electionType: { value: IElection.ElectionType, set: any },
  electionDescription: { value: string, set: any },
  numberOfCandidates: { value: number, set: any }
  electionDate?: { value: IElection.Date | null, set: any }
  maxVotes: { value: number, set: any }
}

const ManagementPage = ({ electionName, electionType, electionDescription, numberOfCandidates, electionDate, maxVotes }: IProps) => {
  const { section } = useParams();
  const [elections, setElections] = useState<IElection.Election[]>([]);
  const [invites, setInvites] = useState<IElection.Election[]>([]);

  const fetchData = () => {
    getUserElections().then((res) => {
      setElections(res.data);
    }).catch(() => {
      setElections([]);
    })
    getElectionInvites().then((res) => {
      console.log(`invites: `, res.data);
      setInvites(res.data);
    }).catch(() => {
      setInvites([]);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <div className="management-page">
    <div className="management-container">
      <SectionsNav elections={elections} setElections={setElections} invites={invites} setInvites={setInvites}></SectionsNav>
      {section == `dashboard` && <DashboardSection></DashboardSection>}
      {section == `account` && <AccountSettingsSection></AccountSettingsSection>}
      {section == `new-election` && electionDate && <NewElectionSection electionName={electionName} electionType={electionType} electionDescription={electionDescription} numberOfCandidates={numberOfCandidates} electionDate={electionDate} maxVotes={maxVotes}></NewElectionSection>}
      {section == `election` && <MachinesInfoSection fetchData={fetchData}></MachinesInfoSection>}
      {section == `invite` && <InviteSection fetchData={fetchData}></InviteSection>}
    </div>
  </div>
}

export default ManagementPage;