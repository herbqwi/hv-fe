import { IElection } from '../../../../../../../interfaces';
import './candidate-card.css'

interface IProps {
  candidate: IElection.Candidate,
  candidates: { value: IElection.Candidate[], set: any },
}

const CandidateCard = ({ candidate, candidates }: IProps) => {
  return <div className="candidate-card">
    <img src="https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-user-mysterious-anonymous-account-vector-png-image_4816288.png" alt="" />
    <div className="info">
      <input value={candidates.value.find(cdt => cdt.id == candidate.id)?.name} onChange={(e) => { candidates.set({ candidateId: candidate.id, name: e.target.value }) }} placeholder="John Smith" className='title' />
      <input value={candidates.value.find(cdt => cdt.id == candidate.id)?.description} onChange={(e) => { candidates.set({ candidateId: candidate.id, description: e.target.value }) }} placeholder="Hey, I'm john smith" className='description' />
    </div>
  </div>
}

export default CandidateCard;