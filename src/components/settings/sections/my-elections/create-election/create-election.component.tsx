import { IconDefinition, faCheckToSlot, faEarth, faGlobe, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import SectionContainer from '../../section-container/section-container.component';
import './create-election.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../../common/button/button.component';
import { useEffect, useState, useContext } from 'react';
import SelectElectionType from './select-election-type/select-election-type.component';
import InputElectionInfo from './input-election-info/input-election-info.component';
import CandidateCard from './candidates-info/candidate-card/candidate-card.component';
import { IElection } from '../../../../../interfaces';
import CandidatesInfo from './candidates-info/candidates-info.component';
import VotePage from '../../../../../pages/vote/vote.component';
import { createNewElection } from '../../../../../controllers/election.controller';
import { generatePaillierKeys } from '../../../../../services/paillier.service';
import { NotificationType } from '../../../../base/notification/notification-body/notification-body.component';
import { NotificationContext } from '../../../../base/notification/notification-container/notification-container.component';
import { useNavigate } from 'react-router';

const CreateElection = () => {
  const [phase, setPhase] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [title, setTitle] = useState(``);
  const [description, setDescription] = useState(``);
  const [date, setDate] = useState<any>(null);
  const [candidates, setCandidates] = useState<IElection.Candidate[]>([]);

  console.log(`candidates: `, candidates)

  const { pushNotification } = useContext(NotificationContext)
  const navigate = useNavigate();

  const updateCandidates = (newTags: string[]) => {
    setCandidates(newTags.map(tag => ({ id: tag, name: ``, description: ``, image: `` })))
  }

  const updateCandidate = ({ candidateId, name, description, image }: { candidateId: string, name?: string, description?: string, image?: string }) => {
    let newObj: { name?: string, description?: string, image?: string } = {}
    if (name != null) newObj.name = name
    if (description != null) newObj.description = description
    if (image != null) newObj.image = image

    const newCandidates = candidates.map(candidate => (candidate.id == candidateId ? { ...candidate, ...newObj } : candidate))
    setCandidates(newCandidates);
  }

  const submitHandler = async () => {
    try {
      if (selected == null || title == `` || description == `` || date == null || candidates.length == 0) return;
      const keys = await generatePaillierKeys();
      const response = await createNewElection(title, candidates, date, keys, 2, selected);
      const { _id } = ((await response).data) as IElection.Election;
      pushNotification(NotificationType.Success, "You have successfully created a new election")
      navigate(`/settings/my-elections`)
    } catch (e) {
      pushNotification(NotificationType.Failed, "Something wrong happened")
      console.log(e);
    }
  }

  return <>
    <SectionContainer className='create-election' title='Creating election'>
      <div className="content">
        {phase == 0 && <SelectElectionType phase={{ value: phase, set: setPhase }} selected={{ value: selected, set: setSelected }}></SelectElectionType>}
        {phase == 1 && <InputElectionInfo title={{ value: title, set: setTitle }} description={{ value: description, set: setDescription }} date={{ value: date, set: setDate }} candidates={{ value: candidates, set: updateCandidates }} phase={{ value: phase, set: setPhase }}></InputElectionInfo>}
        {phase == 2 && <CandidatesInfo submitHandler={submitHandler} candidates={{ value: candidates, set: updateCandidate }} phase={{ value: phase, set: setPhase }}></CandidatesInfo>}
      </div>
    </SectionContainer>
  </>
}

export default CreateElection;