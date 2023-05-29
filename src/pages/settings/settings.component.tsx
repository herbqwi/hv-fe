import { useNavigate, useParams } from 'react-router'
import ShowTimer from '../../components/base/show-timer/show-timer.component'
import MyDetailsSection from '../../components/settings/sections/my-details/my-details.component'
import SideBar from '../../components/settings/side-bar/side-bar.component'
import './settings.css'
import MyElectionsSection from '../../components/settings/sections/my-elections/my-elections.component'
import useSection from '../../hooks/pages/section.hook'
import { IElection, ISection } from '../../interfaces'
import Button from '../../components/common/button/button.component'
import { IconDefinition, faBoxOpen, faCopy, faLink } from '@fortawesome/free-solid-svg-icons'
import { generateRandomUUID } from '../../services/general.service'
import { copyData } from '../../services/general'
import IconButton from '../../components/common/icon-button/icon-button.component'
import CompletedVotesSection from '../../components/settings/sections/completed-votes/my-elections.component'
import { useEffect, useState } from 'react'
import { getElection } from '../../controllers/election.controller'

const PageHeader = ({ buttons }: { buttons?: { title: string, icon: IconDefinition, action: any }[] }) => {
  const { sectionType } = useSection();
  const sectionInfo = ISection.SectionInfo[sectionType];
  return <div className="header">
    <div className="info">
      <h1>{sectionInfo.title}</h1>
      <h2>{sectionInfo.description}</h2>
    </div>
    <div className="inputs-group">
      {buttons && buttons.map(button => <IconButton key={button.title} onClick={button.action} icon={button.icon}>{button.title}</IconButton>)}
    </div>
  </div>
}

const PageBody = () => {
  const { sectionType } = useSection();
  return <div className="body">
    <SideBar></SideBar>
    <div className="section-content">
      {sectionType == ISection.SectionType.MY_DETAILS && <MyDetailsSection></MyDetailsSection>}
      {sectionType == ISection.SectionType.MY_ELECTIONS && <MyElectionsSection></MyElectionsSection>}
      {sectionType == ISection.SectionType.COMPLETED_VOTES && <CompletedVotesSection></CompletedVotesSection>}
    </div>
  </div>
}

const SettingsPage = () => {
  const navigate = useNavigate();
  const { sectionType, id } = useSection();
  const [currentElection, setCurrentElection] = useState<IElection.Election>();

  useEffect(() => {
    if (sectionType == ISection.SectionType.MY_ELECTIONS && id != null && id != `new`) {
      getElection(id as string).then(res => setCurrentElection(res.data));
    }
  }, [id]);

  const createElectionButtons = [{ title: `Create New Election`, icon: faBoxOpen, action: () => { navigate(`/settings/my-elections/new`) } }]

  const hybridElectionButtons = [{ title: `Copy Key`, icon: faCopy, action: () => { copyData(currentElection?.verifyId as string) } },
  { title: `Copy Verify Link`, icon: faCopy, action: () => { copyData(`http://localhost:3000/verify/${currentElection?.verifyId}`) } },
  { title: `Election Room`, icon: faLink, action: () => { navigate(`/verify/${currentElection?.verifyId}`) } }]

  const onlineElectionButtons = [{ title: `Election Room`, icon: faLink, action: () => { navigate(`/elections/${currentElection?._id}`) } }]

  return <ShowTimer timeout={0}>
    <div className="settings-page">
      <div className="content">
        {sectionType == ISection.SectionType.MY_ELECTIONS ? <PageHeader buttons={id == null ? createElectionButtons : (id != `new` && currentElection != null ? (currentElection?.electionType == IElection.ELECTION_TYPE.ONLINE ? onlineElectionButtons : hybridElectionButtons) : [])}></PageHeader>
          : <PageHeader></PageHeader>}
        <PageBody></PageBody>
      </div>
    </div>
  </ShowTimer>
}

export default SettingsPage;