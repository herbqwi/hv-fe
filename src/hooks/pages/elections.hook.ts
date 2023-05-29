import { useEffect, useState } from "react";
import { IElection } from "../../interfaces";
import { getElections } from "../../controllers/election.controller";
import getEventTiming from "../../services/general";


const useElections = () => {
  const [elections, setElections] = useState<IElection.Election[]>([])
  const [statusOrder, setStatusOrder] = useState<IElection.EVENT_STATUS[]>([IElection.EVENT_STATUS.ENDED, IElection.EVENT_STATUS.ENDING_SOON, IElection.EVENT_STATUS.STARTED, IElection.EVENT_STATUS.STARTING_SOON, IElection.EVENT_STATUS.SCHEDULED])
  const [electionsOrdered, setElectionsOrdered]: any = useState({ [IElection.EVENT_STATUS.STARTED]: [], [IElection.EVENT_STATUS.STARTING_SOON]: [], [IElection.EVENT_STATUS.ENDED]: [], [IElection.EVENT_STATUS.ENDING_SOON]: [], [IElection.EVENT_STATUS.SCHEDULED]: [] });


  useEffect(() => { // Fetch elections
    const fetchElections = () => {
      getElections().then(
        (res: IElection.ElectionsResponse) => {
          const result = res.data.filter(et => et.electionType != IElection.ELECTION_TYPE.ONLINE)
          setElections(result)
        }
      )
    }
    fetchElections();
  }, [])

  useEffect(() => { // Order Elections
    if (elections.length) {
      const newOrderedElections: any = { [IElection.EVENT_STATUS.STARTED]: [], [IElection.EVENT_STATUS.STARTING_SOON]: [], [IElection.EVENT_STATUS.ENDED]: [], [IElection.EVENT_STATUS.ENDING_SOON]: [], [IElection.EVENT_STATUS.SCHEDULED]: [] };
      for (let election of elections) {
        const { eventStatus } = getEventTiming({ startDate: election.dates.start, endDate: election.dates.finish });
        newOrderedElections[eventStatus].push({ ...election, eventStatus });
      }
      setElectionsOrdered(newOrderedElections);
    }
  }, [elections])

  useEffect(() => {
    console.log({ electionsOrdered });
  }, [electionsOrdered]);

  return { statusOrder: { value: statusOrder, set: setStatusOrder }, electionsOrdered: { value: electionsOrdered, set: setElectionsOrdered } }
}

export default useElections;