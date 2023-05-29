import "./vote.css";
import CardsContainer from "../../components/vote/cards-container/cards-container.component";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { NotificationContext } from "../../components/base/notification/notification-container/notification-container.component";
import ProceedButton from "../../components/login/common/proceed-button/proceed-button.component";
import FingerprintScanner from "../../components/login/common/fingerprint-scanner/fingerprint-scanner.component";
import { IElection, IKeys, IModal } from "../../interfaces";
import { createNewElection, getElection, getHasVoted } from "../../controllers/election.controller";
import { NotificationType } from "../../components/base/notification/notification-body/notification-body.component";
import { castVote } from "../../services/elections.service";
import { ModalContext } from "../../contexts/modal.context";
import ShowTimer from "../../components/base/show-timer/show-timer.component";
import Button from "../../components/vote/votes-table/page-counter/button/button.component";
import { generateRandomDigits, generateRandomUUID } from "../../services/general.service";
import { generatePaillierKeys } from "../../services/paillier.service";
import { UserContext } from "../../contexts/user.context";
import useVote from "../../hooks/pages/vote.hook";
import VotePDF from "../../components/vote/programs-pdf/programs-pdf.component";

interface IProps {
  isPreview?: boolean,
  // electionInfo?: {
  //   electionName: { value: string, set: any },
  //   electionType: { value: IElection.ElectionType, set: any },
  //   electionDescription: { value: string, set: any },
  //   numberOfCandidates: { value: number, set: any }
  //   electionDate: { value: IElection.Date | null, set: any }
  //   maxVotes: { value: number, set: any }
  // },
}

const PageHeader = ({ availableVotes }: { availableVotes: number }) => {
  return <>
    {!false ?
      <div>
        <h1>PLEASE SELECT YOUR REPRESENTERS</h1>
        {availableVotes ? <h2>YOU HAVE {availableVotes} MORE VOTES</h2> : <h2 style={{ color: '#bc4b51' }}>YOU DON'T HAVE ANY MORE VOTES</h2>}
      </div>
      :
      <h1 className="already">You have already voted!</h1>}
  </>
}

const VotePage = ({ isPreview }: IProps) => {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { hasVoted, proceedState, currentElection, electionRandom, submitVotes, resetVotes, submitFingerprint, availableVotes, toggleSelected } = useVote();
  if (currentElection.value?.electionType != IElection.ELECTION_TYPE.ONLINE) {
    const sessionVerifyId = sessionStorage.getItem(`verifyId`);
    const electionVerifyId = currentElection.value?.verifyId;
    console.log({ electionVerifyId, sessionVerifyId });
    if (electionVerifyId != sessionVerifyId) {
      navigate(`/elections`);
    }
  }
  console.log({ currentElection: currentElection.value });

  useEffect(() => {
    if (proceedState.value == 1 && currentElection.value?.electionType != IElection.ELECTION_TYPE.NORMAL) proceedState.set(2)
  }, [proceedState.value]);

  return (
    <>
      {currentElection.value && <VotePDF random={electionRandom.value as (number | null)} election={currentElection.value}></VotePDF>}
      {currentElection.value && <ShowTimer timeout={0}>
        <div
          // onClick={() => { if (currentSocketConnection?.value == null) openAddMachineModal() }}
          className="vote-page">
          <PageHeader availableVotes={availableVotes}></PageHeader>
          <CardsContainer currentElection={currentElection.value} toggleSelected={toggleSelected} disabled={hasVoted.value || isPreview} candidates={currentElection.value.candidates}></CardsContainer>
          <ProceedButton submitVotes={() => { submitVotes(setUser) }} candidates={currentElection.value.candidates} resetVotes={resetVotes} state={proceedState} isSelected={!availableVotes}></ProceedButton>
          {(proceedState.value == 1 && currentElection.value?.electionType == IElection.ELECTION_TYPE.NORMAL) && <ShowTimer timeout={0}><FingerprintScanner setProceedState={proceedState.set} submitFingerprint={submitFingerprint}></FingerprintScanner></ShowTimer>}
        </div>
      </ShowTimer>
      }</>
  );
};

export default VotePage;