import { useNavigate, useParams } from "react-router";
import "./room-setup.css";

const RoomSetup = () => {
  const MAX_VOTES = 1;
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <div className="room-setup-page">
      <div className="room-setup-container">
        <h1 className="title">Room Setup</h1>
      </div>
    </div>
  );
};

export default RoomSetup;