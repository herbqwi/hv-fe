import Button from '../../../common/button/button.component'
import Input from '../../../common/input/input.component'
import SectionContainer from '../section-container/section-container.component'
import './my-details.css'

const ProfileInfo = ({ timeout }: { timeout?: number }) => {
  return <SectionContainer timeout={timeout} className='profile-info'>
    <img src="https://cdn-icons-png.flaticon.com/512/168/168871.png" alt="User Image" />
    <div className="details">
      <h1>John Smith</h1>
      <h2>Default Voter</h2>
    </div>
  </SectionContainer>
}

const UpdateInfo = ({ timeout }: { timeout?: number }) => {
  return <SectionContainer timeout={timeout} title="Personal Information" buttons={[{ title: `Save`, action: () => { console.log(`hey`) } }]} className='update-info'>
    <div className="inputs-group">
      <Input label='First Name'></Input>
      <Input label='Last Name'></Input>
    </div>
    <div className="inputs-group">
      <Input label='Email Address'></Input>
      <Input label='Phone Number'></Input>
    </div>
  </SectionContainer>
}

const MyDetailsSection = () => {
  return <section className="my-details">
    <ProfileInfo timeout={0}></ProfileInfo>
    <UpdateInfo timeout={70}></UpdateInfo>
  </section>
}

export default MyDetailsSection;