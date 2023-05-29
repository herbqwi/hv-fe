import { AxiosError } from "axios";
import { useContext, useEffect } from "react";
import { NotificationType } from "../components/base/notification/notification-body/notification-body.component";
import { NotificationContext } from "../components/base/notification/notification-container/notification-container.component";
import { UserContext } from "../contexts/user.context";
import { authUser, createNewUser } from "../controllers/user.controller";
import { generateKeys } from "../services/subtle/rsa.service";
import useInputValid from "./auth/input-valid.hook";
import useParams from "./params.hook";
import { decryptDeriveAES, encryptDeriveAES } from "../services/subtle/derive-key.service"
import { createNewElection } from "../controllers/election.controller";


const useLogin = () => {
  const { setUser } = useContext(UserContext)
  const { pushNotification } = useContext(NotificationContext)
  const [signIn, setSignIn, compareSignIn, toggleSignIn] = useParams(`signin`)
  const isRegisterLayout = compareSignIn(`false`)

  const [identification, setIdentification, isIdentificationValid] = useInputValid({ number: true, length: 12 })
  const [email, setEmail, isEmailValid] = useInputValid({ regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })
  const [password, setPassword, isPasswordValid] = useInputValid({ text: true, number: true, special: true, space: true, minLength: 8 })
  const [confirmPassword, setConfirmPassword, isConfirmPasswordValid] = useInputValid({ text: true, number: true, special: true, space: true, minLength: 8 })

  useEffect(() => {
    if (!signIn || (signIn != `true` && signIn != `false`)) {
      setSignIn('true')
    }
  }, [])

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isRegisterLayout) {
      if (identification == '' || email == '' || password == '' || confirmPassword == '') {
        pushNotification(NotificationType.Failed, "Please fill all the fields before submitting");
        return;
      }

      try {
        const { publicKey, privateKey } = await generateKeys();
        const { encrypted: encryptedPrivateKey, iv } = await encryptDeriveAES(privateKey, password);
        const { data } = await createNewUser(identification, password, { publicKey, privateKey: encryptedPrivateKey, iv });
        setUser({ ...data, keys: { publicKey, privateKey, iv } });
        pushNotification(NotificationType.Success, "Your account has been successfully created!");
        localStorage.setItem(`id`, identification);
      } catch (err: any) {
        pushNotification(NotificationType.Failed, err?.response?.data);
      }
    } else {
      try {
        const { data } = await authUser(identification, password);
        pushNotification(NotificationType.Success, "You've successfully logged in!");
        const decryptedPrivateKey = await decryptDeriveAES(data?.keys?.privateKey, password, data?.keys?.iv);
        const keys = { ...data.keys, privateKey: decryptedPrivateKey }
        setUser({ ...data, keys });
        localStorage.setItem(`id`, identification);
      } catch (err: any) {
        const errorCode = err?.response?.status;
        if ([400, 401].includes(errorCode)) {
          pushNotification(NotificationType.Failed, err?.response?.data);
        }
      }
    }
    // createNewElection(`My Election 1`, [`d263d7aa1734436ea59b1a96026d02f0`, `bd29bd7d21804c5d8e2ae5775dd734c6`, `db31145b05804085ab96960546e7e743`, `7b9a9679c027407a97dabde40cf13922`], [`Eren Yeager`, `Mikasa Ackarman`, `Levi Ackerman`, `Pieck Finger`], [`I want to free the world`, `I want to make the world a better place`, `I want to make democracy better`, `I want to make our economy greater`], ['https://www.pngmart.com/files/13/Eren-Yeager-PNG-Image.png', 'https://www.pngmart.com/files/13/Eren-Yeager-PNG-Image.png', 'https://www.pngmart.com/files/13/Eren-Yeager-PNG-Image.png', 'https://www.pngmart.com/files/13/Eren-Yeager-PNG-Image.png'], 100000000, 'yellow')
  }

  const resetInputs = () => {
    setIdentification('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }
  const togglePageLayout = () => {
    toggleSignIn()
    resetInputs();
  }

  return {
    inputs: {
      identification: {
        value: identification,
        set: setIdentification,
        isValid: isIdentificationValid
      },
      email: {
        value: email,
        set: setEmail,
        isValid: isEmailValid
      },
      password: {
        value: password,
        set: setPassword,
        isValid: isPasswordValid
      },
      confirmPassword: {
        value: confirmPassword,
        set: setConfirmPassword,
        isValid: isConfirmPasswordValid
      }
    },
    others: {
      submitHandler,
      resetInputs,
      isRegisterLayout,
      togglePageLayout
    }
  }
}

export default useLogin;