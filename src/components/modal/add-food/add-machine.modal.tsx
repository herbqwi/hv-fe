import './add-machine.css'
import { useContext, useEffect, useState } from 'react';
import Input from '../../common/input/input.component'
import { IFood } from '../../../interfaces/food.interface';
import { IModal } from '../../../interfaces';
import { ModalContext } from '../../../contexts/modal.context';
import { getESPSocket } from '../../../services/esp32.service';
import { UtilsContext } from '../../../contexts/utils.context';
import MachineBar from './machine-bar/machine-bar.component';
import { useNetworkAnalyzer } from '../../../hooks/network-analizer.hook';
import { useNavigate } from 'react-router';
import { getVerifyElection } from '../../../controllers/election.controller';

interface IProps {
  modalContent?: IFood,
  createNewFoodListing: any,
  updateFoodListing: any,
}

const AddMachineModal = ({ electionId }: { electionId: string }) => {
  const { currentSocketConnection } = useContext(UtilsContext);
  const [selected, setSelected] = useState<number | null>(null);
  const [stage, setStage] = useState<number>(0);
  const navigate = useNavigate();

  const { setModalProps, closeModal } = useContext(ModalContext)

  const { rpIP, devices, analyzeNetwork } = useNetworkAnalyzer(closeModal);


  console.log({ stage });
  useEffect(() => {
    setModalProps((modalProps: IModal.Modal) => {
      return {
        ...modalProps, submit: async () => {
          console.log(`rpip1: `, rpIP)
          // const eId = await getVerifyElection(electionId)
          if (stage == 0) {
            if (selected == null) return;
            currentSocketConnection?.set(devices[selected].ws);
            // navigate(`/elections/${eId.data._id}`)
            // localStorage.setItem(`verify`, eId.data._id as string);
            setStage(1);
            analyzeNetwork(false);
          } else {
            console.log(`rpip2: `, rpIP)
            if (rpIP != null) {
              console.log(`RaspberryPI IP found`);
              closeModal();
            } else {
              console.log(`RaspberryPI IP not found`);
            }
          }
        },
        cancel: () => { },
        preventClosing: true,
      }
    })

  }, [selected])

  useEffect(() => {
    analyzeNetwork(true);
  }, [])


  return <div className="body add-machine-modal">
    {stage == 0 ? <>
      {devices.length != 0 ? <ul className='machine-bars-container'>
        <p>Choose a fingerprint sensor</p>
        {devices.map((device, i) => <MachineBar onClick={() => { setSelected(i) }} presetCode={device.presetCode} ip={device.ip} isSelected={selected == i}></MachineBar>)}
      </ul> : <p>Analyzing the network...</p>}
    </> : <>{rpIP != null ? <p>Connected to the crypto processor with IP: {rpIP}</p> : <p>Searching for the Crypto processor...</p>}</>}
    {/* <Input label="Machine ID" placeholder='XXX-XXX' value={machineId} onChange={(e: any) => { setMachineId(e.target.value) }}></Input> */}
    {/* <p className={`searching ${searchingStatus == SEARCHING_STATUS.IDLE ? `hidden` : ``}`}>{searchingStatus == SEARCHING_STATUS.SEARCHING ? `Searching for devices...` : (searchingStatus == SEARCHING_STATUS.FOUND ? `Successfully found the desired devices!` : `Couldn't find the desired devices!`)}</p> */}
  </div>
}

export default AddMachineModal;