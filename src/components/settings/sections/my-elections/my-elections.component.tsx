import { useState, useEffect } from 'react';
import useSection from '../../../../hooks/pages/section.hook';
import CreateElection from './create-election/create-election.component';
import ElectionInfo from './election-info/election-info.component';
import ElectionsList from './elections-list/elections-list.component';
import './my-elections.css'
import { IElection } from '../../../../interfaces';
import { getElection } from '../../../../controllers/election.controller';

const MyElectionsSection = () => {
  const { id } = useSection();
  const [election, setElection] = useState<IElection.Election>();
  const fetchElection = async () => {
    const fetchedElection = await getElection(id as string);
    setElection(fetchedElection.data);
    console.log(`fetched election`);
  }

  useEffect(() => {
    fetchElection();
  }, [id])

  return <section className="my-elections">
    {id == `new` ? <CreateElection></CreateElection> : (id != null ? <>{election && <ElectionInfo election={election} fetchElection={fetchElection}></ElectionInfo>}</> : <ElectionsList></ElectionsList>)}
  </section>
}

export default MyElectionsSection;