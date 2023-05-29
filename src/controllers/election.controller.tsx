import axios, { AxiosError, AxiosResponse } from 'axios';
import { NotificationContext } from '../components/base/notification/notification-container/notification-container.component';
import { UserContext } from '../contexts/user.context';
import { IDatabase, IElection, IKeys, IUser, Paillier } from '../interfaces';
import apiClient from '../services/apiClient.service';

export const createNewElection = async (title: string, candidates: IElection.Candidate[], dates: IElection.Date, keys: Paillier.Keys, maxVotes: number | undefined, electionType: number): Promise<AxiosResponse> => {
  console.log({ title, candidates, dates, keys, maxVotes, electionType });
  const { publicKey, privateKey } = keys;
  console.log(`new`, { publicKey: { g: publicKey.g, n: publicKey.n }, privateKey: { lambda: privateKey.lambda, mu: privateKey.mu } });
  return apiClient.post<AxiosResponse>(`/election/new`,
    { title, candidates, dates, keys: { publicKey: { g: publicKey.g.toString(), n: publicKey.n.toString() }, privateKey: { lambda: privateKey.lambda.toString(), mu: privateKey.mu.toString() } }, maxVotes: maxVotes || 1, electionType }
  );
};

export const getElectionInvites = async () => {
  console.log(`GET invites`);
  const response = await apiClient.get(`/election/invites`);
  return response;
};

export const acceptInvite = async (electionId: string) => {
  console.log(`accept`);
  const response = await apiClient.put(`/election/${electionId}/accept`);
  return response;
}

export const declineInvite = async (electionId: string) => {
  console.log(`decline`);
  const response = await apiClient.put(`/election/${electionId}/decline`);
  return response;
}

export const publishKey = async (electionId?: string) => {
  if (electionId == null) return;
  console.log(`publish key: `, electionId);
  const response = await apiClient.put(`/election/${electionId}/publish`);
  return response;
}

export const getStatistics = async (electionId: string) => {
  const response = await apiClient.get(`election/statistics/${electionId}`);
  return response;
}

export const getElections = async (): Promise<IElection.ElectionsResponse> => {
  const response = (await apiClient.get(`/election`)) as IElection.ElectionsResponse;
  return response as IElection.ElectionsResponse;
}

export const getUserElections = async (): Promise<IElection.ElectionsResponse> => {
  const response = (await apiClient.get(`/election/user`)) as IElection.ElectionsResponse;
  return response as IElection.ElectionsResponse;
}

export const getElection = async (id: string): Promise<IElection.ElectionResponse> => {
  const response = (await apiClient.get(`/election/${id}`)) as IElection.ElectionResponse;
  return response as IElection.ElectionResponse;
}

export const getHasVoted = async (userId: string | null, electionId: string | undefined): Promise<boolean> => {
  if (userId == null || electionId == null) return false;
  const response = (await apiClient.get(`/election/hasVoted/${userId}/${electionId}`)).data;
  return response;
}

export const getVerifyElection = async (id: string): Promise<IElection.ElectionResponse> => {
  const response = (await apiClient.get(`/election/verify/${id}`)) as IElection.ElectionResponse;
  return response as IElection.ElectionResponse;
}

export const getVerifiedVotes = async (electionId: string) => {
  const response = (await apiClient.get(`/election/verify-vote/${electionId}`))
  return response
}

export const getVotedElections = async () => {
  const response = (await apiClient.get(`/election/voted-elections`));
  return response;
}

export const deleteElection = async (id: string) => {
  const response = await apiClient.delete<AxiosResponse>(`/election/${id}`);
  return response;
}