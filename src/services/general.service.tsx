import { request } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { IElection } from '../interfaces';

const setElementOpacity = (identifier: string, opacity: number) => {
    const element = document.querySelector(identifier) as HTMLElement;
    if (element != null && element.style != null) element.style.opacity = `${opacity}`;
}

export const RequestType = {
    GET: `GET`,
    POST: `POST`,
    PUT: `PUT`,
    DELETE: `DELETE`
}

export async function sendRequest(path: string = "", requestType: string = RequestType.GET, data: object = {}) {
    const body = requestType != 'GET' ? JSON.stringify(data) : null
    const response = await fetch(`http://127.0.0.1:8000/${path}`, {
        method: requestType,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body
    });
    if (requestType == RequestType.GET) return response.json();
    if (requestType == RequestType.PUT || requestType == RequestType.POST) return response;
}


const generateRandomNumber = (n: number) => ((Math.ceil(Math.random() * 10)) % n);

const generateRandomUUID = () => uuidv4();

const generateRandomDigits = () => {
    let result = '';

    for (let i = 0; i < 12; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit;
    }

    return result;
}

const convertIdToName = (election: IElection.Election, candidateId: string) => {
    return election.candidates.find(candidate => candidate.id == candidateId)?.name;
}


export { setElementOpacity, generateRandomUUID, generateRandomNumber, generateRandomDigits, convertIdToName }