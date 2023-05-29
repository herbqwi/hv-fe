import { IModal } from '../../../interfaces'
import ElectionsPage from '../../../pages/elections/elections.component'
import AddMachineModal from '../../modal/add-food/add-machine.modal'
import { useContext, useEffect } from 'react';
import './verify.css'
import { ModalContext } from '../../../contexts/modal.context';
import { useNavigate, useParams } from 'react-router';
import { getVerifyElection } from '../../../controllers/election.controller';

const Verify = () => {
  console.log(`verifyyy`);
  const { setModalProps } = useContext(ModalContext)
  const navigate = useNavigate();
  const { verifyId } = useParams();
  sessionStorage.setItem(`verifyId`, `${verifyId}`);
  const openAddMachineModal = (electionId: string) => {
    const modalProps: IModal.Modal = {
      header: {
        title: `Room Configuration`,
        subtitle: `This dialog will required some fields detect and add a new machine`
      },
      body: <AddMachineModal electionId={electionId}></AddMachineModal>
    }
    setModalProps(modalProps)
  }

  useEffect(() => {
    openAddMachineModal(verifyId as string);
    getVerifyElection(`${verifyId}`).then(res => {
      navigate(`/elections/${res.data._id}`)
    })
  }, []);


  return null;
}

export default Verify;