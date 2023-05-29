import SectionContainer from '../../section-container/section-container.component';
import lockedImage from '../../../../../assets/locked.png';
import './election-info.css'
import Button from '../../../../common/button/button.component';
import { publishKey } from '../../../../../controllers/election.controller';
import { IElection } from '../../../../../interfaces';

interface IProps {
  election: IElection.Election,
  fetchElection: any,
}

const ElectionInfo = ({ election, fetchElection }: IProps) => {
  const isPublished = election?.candidates.find(candidate => ((candidate.id == localStorage.getItem(`id`) ?? '') && candidate.keyPublished))

  return <SectionContainer className='election-info' title='Election Keys'>
    <img className='lock' src={lockedImage} alt="" />
    <div className="content">
      <div>
        {isPublished ? <h1 className='public'>Your key is Public</h1> : <h1 className='private'>Your key is Private</h1>}
        <Button disabled={isPublished} onClick={async () => {
          await publishKey(election._id); setTimeout(() => {
            fetchElection();
          }, 300);
        }}>Publish your key</Button>
      </div>
    </div>
  </SectionContainer>
}

export default ElectionInfo;