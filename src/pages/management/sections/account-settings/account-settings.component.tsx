import { faExclamationCircle, faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShowTimer from '../../../../components/base/show-timer/show-timer.component';
import Button from '../../../../components/common/button/button.component';
import Input from '../../../../components/common/input/input.component';
import './account-settings.css'
import ContentContainer from './content-container/content-container.component';

const AccountSettingsSection = () => {

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`submit`);
  }

  return <div className="contents account-settings">
    <ShowTimer timeout={0}>
      <div className='header'>
        <div className='callout'>
          <p></p>
          <p>Account Settings</p>
        </div>
      </div>
    </ShowTimer>
    <ShowTimer timeout={50}>
      <ContentContainer title="Your Information" subtitle="Here's our basic knowledge about you." savable={true} submitHandler={submitHandler}>
        <div>
          <Input label='First Name'></Input>
          <Input label='Last Name'></Input>
        </div>
        <div>
          <Input label='Email'></Input>
          <Input label='Password'></Input>
        </div>
        <div className='footer'><p><FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>We will never spam your email! Whatsoever.</p></div>
      </ContentContainer>
    </ShowTimer>
  </div>
}

export default AccountSettingsSection;