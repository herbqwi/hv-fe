import { useParams } from 'react-router';
import './invite.css'
import TFDialog from './tf-dialog/tf-dialog.component';
import ShowTimer from '../../../../components/base/show-timer/show-timer.component';
import { IElection } from '../../../../interfaces';

interface IProps {
  fetchData: any,
}

const InviteSection = ({ fetchData }: IProps) => {
  const { id } = useParams();
  return <div className="contents">
    <ShowTimer timeout={0}><TFDialog fetchData={fetchData} electionId={id as string}></TFDialog></ShowTimer>
  </div>
}

export default InviteSection;