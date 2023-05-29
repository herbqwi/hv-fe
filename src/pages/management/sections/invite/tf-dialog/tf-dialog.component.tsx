import { useNavigate } from 'react-router';
import ShowTimer from '../../../../../components/base/show-timer/show-timer.component';
import Button from '../../../../../components/common/button/button.component';
import { acceptInvite } from '../../../../../controllers/election.controller';
import ContentContainer from '../../account-settings/content-container/content-container.component';
import './tf-dialog.css'

interface IProps {
  className?: string,
  electionId: string,
  fetchData: any,
}

const TFDialog = ({ className, electionId, fetchData }: IProps) => {
  const navigate = useNavigate();
  return <ShowTimer timeout={0}>
    <ContentContainer title="Election participation invite" subtitle="Please choose whether you want to accept this election or not" savable={false}>
      <p>You've been invited to represent your party in asdasd election, please accept or deny this request</p>
      <div className='tf'>
        <Button>Decline</Button>
        <Button onClick={() => { acceptInvite(electionId); navigate(`/management/election/${electionId}`); setTimeout(() => {
          fetchData();
        }, 1000); }}>Accept</Button>
      </div>
    </ContentContainer>
  </ShowTimer>
}

export default TFDialog;