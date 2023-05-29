import "./login-form.css";
import Input from "../common/input/input.component";
import Button from "../common/button/button.component";
import QRCode from "../common/qr-code/qr-code.component";
import { useContext, useEffect } from "react";
import { NotificationContext } from "../../base/notification/notification-container/notification-container.component";
import { UserContext } from "../../../contexts/user.context";
import useInputValid from "../../../hooks/auth/input-valid.hook";
import useParams from "../../../hooks/params.hook";
import useLogin from "../../../hooks/login.hook";

const LoginForm = () => {
  const { inputs, others } = useLogin();

  return (
    <div className="form-container">
      <div className="log-in-container">
        <form id="login" className="form" onSubmit={others.submitHandler}>
          <h1>WELCOME </h1>
          {others.isRegisterLayout && <Input name="email" placeholder="Email" value={inputs.email.value} onChange={inputs.email.set} isValid={inputs.email.isValid}></Input>}
          <Input id="natid" name="natid" placeholder="National ID" value={inputs.identification.value} onChange={inputs.identification.set} isValid={!others.isRegisterLayout || inputs.identification.value}></Input>
          <Input id="passwd" name="passwd" placeholder="Password" value={inputs.password.value} onChange={inputs.password.set} isValid={!others.isRegisterLayout || inputs.password.isValid} type="password">
            {/* {isRegisterLayout && <PasswdStrength activeOn="passwd" password={password}></PasswdStrength>} */}
          </Input>
          {others.isRegisterLayout && <Input id="confirm-passwd" placeholder="Confirm Password" value={inputs.confirmPassword.value} onChange={inputs.confirmPassword.set} isValid={inputs.confirmPassword.isValid} type="password" ></Input>}
          <Button name={others.isRegisterLayout ? `Register` : `Login`}></Button>
          <div className="note" onClick={others.togglePageLayout}>{others.isRegisterLayout ? `Already have an account?` : `Don't have an account?`}</div>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>SCAN QR CODE</h1>
            <QRCode value={`hey`}></QRCode>
            <p>
              Use the mobile application to scan this QR Code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
