import { useState, useEffect } from 'react';
import useSection from '../../../../hooks/pages/section.hook';
import './my-elections.css'
import { IElection } from '../../../../interfaces';
import { getElection, getVerifiedVotes, getVotedElections } from '../../../../controllers/election.controller';
import Button from '../../../common/button/button.component';
import { convertIdToName } from '../../../../services/general.service';
import { voteCheck } from '../../../../services/elections.service';

const VerifyVoteCard = ({ election }: { election: IElection.Election }) => {
  const [currentVote, setCurrentVote] = useState<IElection.VotingRecord>();

  console.log({ currentVote });


  const calcVotes = async () => {
    const promises = [];
    const verifiedVotes: IElection.VotingRecord = (await getVerifiedVotes((election._id as string))).data;
    for (const vote of verifiedVotes.votes) {
      promises.push(voteCheck(election, vote.hasVoted as string));
    }
    Promise.all(promises).then((res) => {
      const newVotes = res.map((rs, i) => ({ id: verifiedVotes.votes[i].id, hasVoted: rs }));
      setCurrentVote({ ...verifiedVotes, votes: newVotes as any });
    })
  }

  return <div className="verify-vote-card">
    <div className="info">
      <h1>{election.title}</h1>
      {currentVote && <p>Your votes: {currentVote.votes.map(vote => { console.log(vote.hasVoted?.toString()); return vote.hasVoted?.toString() == `1` ? `${convertIdToName(election, vote.id as string)} ` : `` })}</p>}
    </div>
    <Button disabled={currentVote != null} onClick={calcVotes}>{currentVote != null ? "Verified" : "Verify"}</Button>
  </div>
}

const CompletedVotesSection = () => {
  const { id } = useSection();
  const [elections, setElections] = useState<IElection.Election[]>();
  const fetchElection = async () => {
    const fetchedElection = await getVotedElections();
    setElections(fetchedElection.data);
    console.log(`fetched election`);
  }

  useEffect(() => {
    fetchElection();
  }, [id])

  return <section className="completed-votes">
    {elections && elections.map(election => <VerifyVoteCard key={election._id} election={election}></VerifyVoteCard>)}
  </section>
}

export default CompletedVotesSection;