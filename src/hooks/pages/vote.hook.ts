import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IElection } from '../../interfaces';
import { getElection, getHasVoted } from '../../controllers/election.controller';
import { castVote } from '../../services/elections.service';
import { NotificationContext } from '../../components/base/notification/notification-container/notification-container.component';
import { NotificationType } from '../../components/base/notification/notification-body/notification-body.component';
import { downloadPdf } from '../../components/vote/programs-pdf/programs-pdf.component';

const useVote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [proceedState, setProceedState] = useState(0);
  const [currentElection, setCurrentElection] = useState<IElection.Election>();
  const { pushNotification } = useContext(NotificationContext)
  const [electionRandom, setElectionRandom] = useState<number | null>();

  const MAX_VOTES = 2;

  useEffect(() => {
    getElection(id as string).then(res => {
      setCurrentElection(res.data);
    })
    getHasVoted(localStorage.getItem(`id`) ?? null, id).then((res) => {
      console.log(`has voted: `, res);
      setHasVoted(res);
    })
  }, [])

  useEffect(() => {
    setProceedState(0)
  }, [currentElection])

  async function submitVotes(setUser: any) {
    const votes = (currentElection as IElection.Election).candidates.map(candidate => {
      return { id: candidate.id, hasVoted: candidate.selected };
    });
    if (currentElection != null && currentElection._id != null) {
      console.log(`cast before`);
      const response = await castVote(currentElection._id, { id: localStorage.getItem(`id`) ?? ``, votes, signature: `qwewqe` }) as any;
      setElectionRandom(response.data.random);
      setTimeout(() => {
        downloadPdf();
        if (sessionStorage.getItem(`verifyId`) != null) {
          if (currentElection.electionType == IElection.ELECTION_TYPE.NORMAL) {
            setUser(null);
            navigate(`/login`);
          } else {
            navigate(`/elections`);
          }
        } else {
          navigate(`/elections`);
        }
      }, 3000);
    }
  }

  const getSelectedCount = (candidates?: IElection.Candidate[]) => {
    if (candidates == null) return 0;
    return candidates.reduce((accumulator, currentValue) => accumulator += currentValue.selected ? 1 : 0, 0)
  }

  const toggleSelected = ({ id, reset }: { id?: string, reset?: boolean }) => {
    const newCandidates = (currentElection as IElection.Election).candidates.map(candidate => {
      if (reset || candidate.id == id) {
        return { ...candidate, selected: !reset && !candidate.selected }
      };
      return candidate;
    })


    if (getSelectedCount(newCandidates) > MAX_VOTES) {
      pushNotification(NotificationType.Failed, `You have exceeded the maximum number of votes`)
      return
    }

    setCurrentElection((value: any) => ({ ...value, candidates: newCandidates }))
  }

  const resetVotes = () => {
    toggleSelected({ reset: true })
    setProceedState(0)
  }

  const submitFingerprint = (fingerprint: string) => {
    if (fingerprint != null) setProceedState(2)
  }

  const availableVotes = MAX_VOTES - (currentElection ? getSelectedCount(currentElection?.candidates) : 0);

  // const createElection = async () => {
  //   try {
  //     const keys = await generatePaillierKeys();
  //     const response = createNewElection(electionInfo?.electionName.value ?? `No title provided`, currentElection.candidates, electionInfo?.electionDate.value ?? { start: 0, finish: 0 }, keys, electionInfo?.maxVotes.value)
  //     const { _id } = ((await response).data) as IElection.Election;
  //     pushNotification(NotificationType.Success, "You have successfully created a new election")
  //     navigate(`/elections/${_id}`)
  //   } catch (e) {
  //     pushNotification(NotificationType.Failed, "Something wrong happened")
  //     console.log(e);
  //   }
  // }

  return { hasVoted: { value: hasVoted, set: setHasVoted }, proceedState: { value: proceedState, set: setProceedState }, currentElection: { value: currentElection, set: setCurrentElection }, electionRandom: { value: electionRandom, set: setElectionRandom }, submitVotes, resetVotes, submitFingerprint, availableVotes, toggleSelected };
}

// const CANDIDATE_TEMPLATE = {
//   name: `Candidate Name`,
//   description: `Candidate Description`,
//   image: `https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png`,
//   selected: false,
// }

// const simulateElections: IElection.Election = {
//   title: `title`,
//   candidates: Array.from({ length: electionInfo?.numberOfCandidates?.value ?? 0 }, () => ({ id: generateRandomDigits(), ...CANDIDATE_TEMPLATE })),
//   dates: { start: 0, finish: 0 },
//   interests: [],
//   color: `white`,
//   keys: {
//     publicKey: {
//       n: `q`,
//       g: `q`,
//     },
//     privateKey: {
//       mu: `q`,
//       lambda: `q`,
//     },
//   },
//   votes: [],
//   createdAt: { start: 0, finish: 0 },
//   updatedAt: { start: 0, finish: 0 },
//   verifyId: `123`
// };

export default useVote;