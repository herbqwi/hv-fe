import { AxiosResponse } from "axios";
import { ExecOptionsWithStringEncoding } from "child_process";
import React, { Dispatch, SetStateAction } from "react";

export namespace IUtils {
  export namespace ICurrentActiveElement {

    export type CurrentActiveElement = HTMLElement | null;

    export interface CurrentActiveElementState {
      value: HTMLElement | null,
      set: React.Dispatch<React.SetStateAction<HTMLElement | null>>
    }
  }

  export namespace ICurrentSocketConnection {

    export type CurrentSocketConnection = WebSocket | null;

    export interface CurrentSocketConnectionState {
      value: WebSocket | null,
      set: React.Dispatch<React.SetStateAction<WebSocket | null>>
    }
  }

  export interface Context {
    currentActiveElement: ICurrentActiveElement.CurrentActiveElementState | null,
    currentSocketConnection: ICurrentSocketConnection.CurrentSocketConnectionState | null,
    currentPISocketConnection: ICurrentSocketConnection.CurrentSocketConnectionState | null,
  }
}

export namespace IKeys {
  export type PublicKey = string;
  export type PrivateKey = string;
  export type IV = string;

  export interface Keys {
    publicKey: PublicKey,
    privateKey: PrivateKey,
    iv?: IV
  }
}

export namespace IUserResponse {
  export type Token = string;
  export type Keys = IKeys.Keys;

  export interface Response {
    token: Token,
    keys: Keys,
    immediate?: boolean,
    fingerprint?: string,
  }

  export interface Context {
    user: Response | null,
    setUser: React.Dispatch<React.SetStateAction<Response | null>> | any,
  }
}

export namespace IUser {
  export interface User extends IUserResponse.Response {
    email?: string,
    name?: {
      firstName: string,
      lastName: string
    },
    phoneNumber?: string,
    fingerprint?: string,
  }
}

export namespace Paillier {
  export interface PublicKey {
    n: string,
    g: string,
  }
  export interface PrivateKey {
    lambda: string,
    mu: string,
    publicKey?: PublicKey,
  }
  export interface Keys {
    publicKey: PublicKey,
    privateKey: PrivateKey,
  }
}

export namespace IElection {
  export enum EVENT_STATUS {
    STARTED,
    ENDED,
    STARTING_SOON,
    ENDING_SOON,
    SCHEDULED,
  }

  export enum ElectionType {
    ANONYMOUS,
    FINGERPRINT,
    FULLY_ANONYMOUS,
  }

  export enum ELECTION_TYPE {
    ONLINE,
    ANONYMOUS,
    NORMAL
  }

  export const EventStatusInfo = {
    [EVENT_STATUS.STARTED]: { title: `🔥 Top Elections`, color: `default`, dateText: `Started` },
    [EVENT_STATUS.STARTING_SOON]: { title: `⏰ Starting Soon`, color: `gray`, dateText: `Starting` },
    [EVENT_STATUS.ENDED]: { title: `🏆 Just Finished`, color: `gray`, dateText: `Finished` },
    [EVENT_STATUS.ENDING_SOON]: { title: `🕑 Ending Soon`, color: `gray`, dateText: `Started` },
    [EVENT_STATUS.SCHEDULED]: { title: `🗓️ Scheduled`, color: `gray`, dateText: `Starting` },
  }

  export interface Election {
    _id?: string,
    title: string;
    candidates: IElection.Candidate[];
    dates: IElection.Date;
    interests: Interest[],
    color: string,
    keys: Paillier.Keys;
    votes: IElection.VotingRecord[];
    eventStatus?: EVENT_STATUS,
    result: { id: string, votes: string }[]
    winner?: string,
    createdAt: Date,
    updatedAt: Date,
    electionType: IElection.ELECTION_TYPE,
    verifyId: string,
  }

  export interface Candidate {
    id: string,
    name: string,
    description: string,
    image: string,
    selected?: boolean,
    accepted?: boolean,
    keyPublished?: boolean,
  }

  export interface VotingRecord {
    id: string,
    votes: { id?: string, hasVoted?: boolean | string | bigint }[],
    signature: string,
    timestamp?: number,
  }

  export interface Interest {
    id: string,
  }

  export interface Date {
    start: number,
    finish: number
  }

  export interface ElectionsResponse extends AxiosResponse {
    data: Election[]
  }

  export interface ElectionResponse extends AxiosResponse {
    data: Election
  }
}

export namespace IDatabase {
  export interface User {
    identification: string;
    email?: string;
    password: string;
    name: {
      firstName: string;
      lastName: string;
    };
    profileImage?: string;
    phoneNumber?: string;
    keys: IKeys.Keys;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ElectionBase {
    title: string;
    candidates: IElection.Candidate[];
  }

  export interface Election extends ElectionBase {
    dates: IElection.Date;
    interests: number,
    color: string,
    keys: IKeys.Keys,
    votes: IElection.VotingRecord,
    createdAt: Date,
    updatedAt: Date;
    verifyId: string,
  }

}

export namespace IModal {
  export interface Modal {
    header: {
      title: string | null,
      subtitle: string | null;
    } | null,
    body: React.ReactNode | null,
    cancel?: (() => void) | null,
    submit?: (() => void) | null,
    preventClosing?: boolean,
  }

  export interface Context {
    modalProps: Modal | null,
    setModalProps: Dispatch<SetStateAction<any>>,
    closeModal: () => void,
  }

}

export namespace IDevice {

  export enum DeviceType {
    ESP32,
    RASPBERRYPI
  }

  export interface Device {
    deviceType: DeviceType,
    ip: string,
    presetCode: string,
    ws: WebSocket | null
  }
}

export namespace ISection {

  export enum SectionType {
    MY_DETAILS,
    MY_ELECTIONS,
    COMPLETED_VOTES,
    NOTIFICATIONS
  }

  export const SectionInfo = {
    [SectionType.MY_DETAILS]: { title: `My Details`, description: `Manage your personal details and account information`, route: `my-details` },
    [SectionType.MY_ELECTIONS]: { title: `My Elections`, description: `Manage your created/contributed elections`, route: `my-elections` },
    [SectionType.COMPLETED_VOTES]: { title: `Completed Votes`, description: `Manage your casted votes`, route: `completed-votes` },
    [SectionType.NOTIFICATIONS]: { title: `Notifications`, description: `Manage your notifications`, route: `notifications` },
  }
}