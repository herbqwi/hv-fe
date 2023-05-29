import { getPrivateKey, getPublicKey, paillerDecrypt, paillerEncrypt } from './paillier.service'
import * as paillierBigint from 'paillier-bigint'
import { IElection } from '../interfaces';
import { getElection } from '../controllers/election.controller';
import axios, { AxiosResponse } from 'axios';
import apiClient from './apiClient.service';


async function castVote(electionId: string, record: IElection.VotingRecord) {
    const { keys } = (await getElection(electionId)).data;
    const { n, g } = keys.publicKey;
    const { lambda, mu } = keys.privateKey;
    const publicKey = getPublicKey(BigInt(n), BigInt(g));
    const privateKey = getPrivateKey(BigInt(lambda), BigInt(mu), publicKey);
    const votes = record.votes.map(vote => ({ ...vote, hasVoted: paillerEncrypt(vote.hasVoted ? BigInt(`1`) : BigInt(`0`), publicKey).toString() }));
    console.log(`before response`);
    const response = await apiClient.post<AxiosResponse>(`/election/vote`, { votingRecord: { ...record, votes }, electionId });
    return response
}

const voteCheck = async (election: IElection.Election, hasVoted: string) => {
    return paillerDecrypt(BigInt(hasVoted), election.keys.publicKey, election.keys.privateKey);
}

const isApproved = (election: IElection.Election) => {
    return !election.candidates.find(candidate => !candidate.accepted);
}

export { castVote, voteCheck, isApproved }