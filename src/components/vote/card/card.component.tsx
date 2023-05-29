import "./card.css";
import SelectButton from "../select-button/select-button.component";
import ProfileImage from "../profile-image/profile-image.component";
import { IElection } from "../../../interfaces";

interface IProps {
  votesCount: string,
  showCount: boolean,
  candidate: IElection.Candidate,
  toggleSelected: any,
  className?: string,
  disabled?: boolean,
}

const Card = ({ votesCount, candidate, toggleSelected, className, disabled }: IProps) => {
  return (
    <div className={`card ${candidate.selected ? `selected` : ``} ${className}`}>
      <ProfileImage img={candidate.image}></ProfileImage>
      <input disabled={disabled} className="h1" value={candidate.name}></input>
      <input disabled={disabled} className="p" value={candidate.description}></input>
      <p>Count: {votesCount}</p>
      <SelectButton
        disabled={disabled}
        isSelected={candidate.selected}
        toggleSelected={() => toggleSelected({ id: candidate.id })}
      ></SelectButton>
    </div>
  );
};

export default Card;
