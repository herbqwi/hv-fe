import { faAngleLeft, faArchive, faBalanceScale, faBox, faCog, faEnvelope, faExchangeAlt, faHeadset, faIndustry, faPizzaSlice, faPlus, faPoll, faRightFromBracket, faTableColumns, faUserCog, faVoteYea, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ShowTimer from '../../../base/show-timer/show-timer.component';
import './sections-nav.css'
import { IElection } from '../../../../interfaces';
import { getElectionInvites, getElections, getUserElections } from '../../../../controllers/election.controller';

interface IProps {
  elections: IElection.Election[],
  setElections: any,
  invites: any,
  setInvites: any,
}

const SectionsNav = ({ elections, setElections, invites, setInvites }: IProps) => {
  const { section, id } = useParams();
  const [machinesMenu, setMachinesMenu] = useState(false);

  const navigate = useNavigate();
  return <ShowTimer timeout={0}>
    <div className={`sections-nav-container ${machinesMenu == true ? `machine` : ``}`}>
      <div className='nav normal-menu'>
        <div onClick={() => { section?.toLowerCase() != `dashboard` && navigate(`/management/dashboard`) }} className={`section ${section?.toLowerCase() == `dashboard` ? `selected` : ``}`}><p><FontAwesomeIcon icon={faTableColumns}></FontAwesomeIcon> Dashboard</p></div>
        <div onClick={() => { section?.toLowerCase() != `account` && navigate(`/management/account`) }} className={`section ${section?.toLowerCase() == `account` ? `selected` : ``}`}><p><FontAwesomeIcon icon={faUserCog}></FontAwesomeIcon> My Account</p></div>
        <div onClick={() => { setMachinesMenu(true) }} className={`section ${section?.toLowerCase() == `machines-info` ? `selected` : ``}`}><p><FontAwesomeIcon icon={faVoteYea}></FontAwesomeIcon> My Elections</p></div>
        <div onClick={() => { section?.toLowerCase() != `warnings` && navigate(`/management/warnings`) }} className={`section ${section?.toLowerCase() == `warnings` ? `selected` : ``}`}><p><FontAwesomeIcon icon={faWarning}></FontAwesomeIcon> Warnings</p><div className='error'>0</div></div>
        <div onClick={() => { section?.toLowerCase() != `ballots` && navigate(`/management/ballots`) }} className={`section ${section?.toLowerCase() == `ballots` ? `selected` : ``}`}><p><FontAwesomeIcon icon={faBox}></FontAwesomeIcon> Ballots</p></div>
      </div>
      <div className='nav machines-menu'>
        <div onClick={() => { setMachinesMenu(false) }} className={`section ${section?.toLowerCase() == `dashboard` ? `selected` : ``}`}><p><FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon> Back</p></div>
        <div className="scrollable">
          {elections.map((election, i) => {
            return <div onClick={() => { id?.toLocaleLowerCase() != election._id && navigate(`/management/election/${election._id}`) }} className={`section ${(section?.toLowerCase() == `election` && id?.toLocaleLowerCase() == election._id) ? `selected` : ``}`}><p><FontAwesomeIcon icon={faVoteYea}></FontAwesomeIcon> {election.title}</p></div>
          })}
          {invites.map((election: IElection.Election, i: number) => {
            return <div onClick={() => { id?.toLocaleLowerCase() != election._id && navigate(`/management/invite/${election._id}`) }} className={`invite section ${(section?.toLowerCase() == `election` && id?.toLocaleLowerCase() == election._id) ? `selected` : ``}`}><p><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> {election.title}</p></div>
          })}
          <div onClick={() => { section?.toLowerCase() != `new-election` && navigate(`/management/new-election`) }} className={`section ${section?.toLowerCase() == `new-election` ? `selected` : ``}`}><p><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New Election</p></div>
        </div>
      </div>
      <hr />
      <div onClick={() => { navigate(`/management/support`) }} className={`section ${section?.toLowerCase() == `support` ? `selected` : ``}`}><p><FontAwesomeIcon icon={faHeadset}></FontAwesomeIcon> Support</p></div>
      <div className={`section logout`}><p><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon> Logout</p></div>
    </div>
  </ShowTimer>
}

export default SectionsNav;