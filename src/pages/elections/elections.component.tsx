import './elections.css'
import { faSort } from '@fortawesome/free-solid-svg-icons';
import ShowTimer from '../../components/base/show-timer/show-timer.component';
import IconButton from '../../components/common/icon-button/icon-button.component';
import useElections from '../../hooks/pages/elections.hook';
import ElectionsSection from '../../components/elections/elections-section/elections-section.component';
import { useNavigate } from 'react-router';
import { getVerifyElection } from '../../controllers/election.controller';

const ElectionsPage = () => {
    const navigate = useNavigate();
    const verifiedId = sessionStorage.getItem(`verifyId`);
    if (verifiedId != null) {
        console.log(`not null`)
        getVerifyElection(verifiedId).then(res => {
            navigate(`/elections/${res.data._id}`)
        })
    }
    const { statusOrder, electionsOrdered } = useElections();

    return (
        <ShowTimer timeout={0}>
            <div className="elections-page hidable">
                <div className="elections-container">
                    {/* <div className="header">
                        <IconButton onClick={() => {
                            // setShowModal(true)
                        }} icon={faSort}> Sort</IconButton>
                    </div> */}

                    {statusOrder.value.map((status => {
                        return <ElectionsSection elections={electionsOrdered.value[status]} status={status}></ElectionsSection>
                    }))}
                </div>
            </div>
        </ShowTimer >
    )
}

export default ElectionsPage;