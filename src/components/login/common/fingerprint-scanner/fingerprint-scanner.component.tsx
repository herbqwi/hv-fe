import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../../contexts/user.context";
import { UtilsContext } from "../../../../contexts/utils.context";
import "./fingerprint-scanner.css";

interface IProps {
  submitFingerprint: any,
  setProceedState: any,
  [key: string]: any
}

const FingerprintScanner = ({ submitFingerprint, setProceedState, ...props }: IProps) => {
  const [fingerMsg, setFingerMsg] = useState<string>(`Please scan your fingerprint`)
  const { currentSocketConnection } = useContext(UtilsContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const storedFingeprinted = user?.fingerprint;

  // if (!storedFingeprinted) navigate(`/home`);

  const sendOpeningMessage = () => {
    currentSocketConnection?.value?.send(`open ${storedFingeprinted}`);
  }

  const sendClosingMessage = () => {
    currentSocketConnection?.value?.send(`close`);
  }

  if (currentSocketConnection?.value) {
    currentSocketConnection.value.onmessage = ((ev: MessageEvent) => {
      const msg = JSON.parse(ev.data);
      if (msg.result) {
        setFingerMsg(`Fingerprint matched!`)
        setProceedState((ps: number) => ps + 1);
      } else {
        setFingerMsg(`Fingerprint not matched!`)
        sendClosingMessage();
        setTimeout(() => {
          // sendOpeningMessage();
        }, 3 * 1000);
      }
    })
  }

  sendOpeningMessage();

  return (
    <div className={`fingerprint-scanner-container ${props.className}`}>
      <div onClick={(e: any) => {
        let element = e.target.offsetParent.offsetParent;
        element.classList.remove('fade-in')
        element.classList.add('fade-out')
        submitFingerprint(1);
      }} className="fingerprint-scanner">
        <img src="https://pngimg.com/uploads/fingerprint/fingerprint_PNG98.png" alt="fingerprint" />
        <p>{fingerMsg}</p>
      </div>
    </div>
  );
};

export default FingerprintScanner;
