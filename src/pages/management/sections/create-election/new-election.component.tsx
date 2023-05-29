import { faExclamationCircle, faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShowTimer from '../../../../components/base/show-timer/show-timer.component';
import Button from '../../../../components/common/button/button.component';
import DynamicCounter from '../../../../components/common/dynamic-counter/dynamic-counter.component';
import Input from '../../../../components/common/input/input.component';
import TextField from '../../../../components/common/text-field/text-field.component';
import { useEffect, useContext } from 'react';
import './new-election.css'
import { IElection } from '../../../../interfaces';
import DatePick from '../../../../components/common/date-picker/date-picker.component';
import { useNavigate } from 'react-router';
import { NotificationContext } from '../../../../components/base/notification/notification-container/notification-container.component';
import { NotificationType } from '../../../../components/base/notification/notification-body/notification-body.component';

const ContentContainer = ({ className, title, subtitle, savable, children }: { className?: string, title: string, subtitle: string, savable?: boolean, children: any }) => {

  return <div className={`content-container ${className}`}>
    <div className='header'>
      <div>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      {savable && <a href="">Save</a>}
    </div>
    <div className='body'>
      {children}
    </div>
  </div>
}

interface IProps {
  electionName: { value: string, set: any },
  electionType: { value: IElection.ElectionType, set: any },
  electionDescription: { value: string, set: any },
  numberOfCandidates: { value: number, set: any }
  electionDate: { value: IElection.Date | null, set: any }
  maxVotes: { value: number, set: any }
}

const NewElectionSection = ({ electionName, electionType, electionDescription, numberOfCandidates, electionDate, maxVotes }: IProps) => {
  const { pushNotification } = useContext(NotificationContext)

  useEffect(() => {
    electionName.set('');
    electionType.set(IElection.ElectionType.FINGERPRINT);
    electionDescription.set('');
    numberOfCandidates.set(0);
    electionDate.set(null);
  }, [])

  const navigate = useNavigate();
  return <div className="contents new-election">
    <ShowTimer timeout={0}>
      <div className='header'>
        <div className='callout'>
          <p></p>
          <p>Account Settings</p>
        </div>
      </div>
    </ShowTimer>
    <ShowTimer timeout={50}>
      <ContentContainer title="General Information" subtitle="Here's the basic knowledge about your election." savable={true}>
        <div>
          <Input controlled={{ value: electionName.value, set: electionName.set }} label='Election Name'></Input>
          <Input label='Election Type'></Input>
        </div>
        <div>
          <TextField controlled={{ value: electionDescription.value, set: electionDescription.set }} label='Election Description'></TextField>
        </div>
        <div>
          <DatePick controlled={{ value: electionDate.value, set: electionDate.set }} label={`Election Date`}></DatePick>
          <DynamicCounter controlled={{ value: numberOfCandidates.value, set: numberOfCandidates.set }} label='Number of Candidates'></DynamicCounter>
        </div>
        <div className='footer'>
          <p><FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>Full this information faithfully, for fair elections.</p>
          <Button onClick={() => {
            if (electionName.value == `` || electionDescription.value == `` || numberOfCandidates.value == 0 || electionDate.value == null) {
              pushNotification(NotificationType.Failed, `Please fill out all the required fields`);
              return;
            }
            navigate(`vote`);
          }}>Next</Button>
        </div>
      </ContentContainer>
    </ShowTimer>
  </div>
}

export default NewElectionSection;