import { IElection } from '../../../../../../interfaces'
import ShowTimer from '../../../../../base/show-timer/show-timer.component'
import Button from '../../../../../common/button/button.component'
import CandidateCard from './candidate-card/candidate-card.component'
import './candidates-info.css'

interface IProps {
  submitHandler: any,
  candidates: { value: IElection.Candidate[], set: any },
  phase: { value: number, set: any }
}

const CandidatesInfo = ({ submitHandler, candidates, phase }: IProps) => {
  return <>
    <h1>Fill out candidates information</h1>
    {candidates?.value?.map(candidate => <CandidateCard candidates={candidates} candidate={candidate}></CandidateCard>)}
    <Button onClick={submitHandler} disabled={candidates.value.find(candidate => (candidate.name?.trim() == `` || candidate.description?.trim() == ``))}>Create</Button>
  </>
}

export default CandidatesInfo;