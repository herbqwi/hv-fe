import "./cards-container.css";
import Card from "../card/card.component";
import { useContext } from "react";
import { IElection } from "../../../interfaces";
import { NotificationContext } from "../../base/notification/notification-container/notification-container.component";
import ShowTimer from "../../base/show-timer/show-timer.component";
import { NotificationType } from "../../base/notification/notification-body/notification-body.component";

interface IProps {
  candidates: IElection.Candidate[] | any,
  disabled?: boolean,
  currentElection: IElection.Election,
  toggleSelected: any,
}

const CardsContainer = ({ toggleSelected, candidates, currentElection, disabled }: IProps) => {
  const results = currentElection.result;
  return (
    <div className="cards-container">
      {candidates && candidates.map((candidate: IElection.Candidate, i: number) => (
        <ShowTimer timeout={200}><Card votesCount={results[i]?.votes} showCount={results.length != 0} candidate={candidate} toggleSelected={toggleSelected} disabled={disabled} ></Card></ShowTimer>
      ))}
    </div>
  );
};

export default CardsContainer;