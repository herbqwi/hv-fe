import { IElection } from "../interfaces";

interface IGetEventTimingProps {
  startDate: number,
  endDate: number
}

const getEventTiming = ({ startDate, endDate }: IGetEventTimingProps) => {
  const diffStart = startDate - Date.now(), diffEnd = endDate - Date.now();

  let eventStatus: IElection.EVENT_STATUS = IElection.EVENT_STATUS.ENDED;

  if (endDate >= Date.now()) {
    if (startDate <= Date.now()) {
      if (diffEnd <= 1800) {
        eventStatus = IElection.EVENT_STATUS.ENDING_SOON;
      } else {
        eventStatus = IElection.EVENT_STATUS.STARTED;
      }
    } else {
      if (diffStart <= 1800) {
        eventStatus = IElection.EVENT_STATUS.STARTING_SOON;
      } else {
        eventStatus = IElection.EVENT_STATUS.SCHEDULED;
      }
    }
  }
  const calcDateDiff = (duration: number) => (Math.abs(diffStart) <= duration || Math.abs(diffEnd) <= duration)
  const dateString = `${IElection.EventStatusInfo[eventStatus].dateText} ${calcDateDiff(86400000) ? `Today` : (calcDateDiff(2 * 86400000) ? `Tomorrow` : `in ${formatTime(endDate)}`)}`;
  return { eventStatus, dateString }
}

function formatTime(seconds: number): string {
  const date = new Date(seconds * 1000);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const formattedTime = `${month}/${day} ${hour}:${minute}`;

  return formattedTime;
}


export const copyData = (data: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = data;
  document.body.appendChild(textarea);

  // Select the content of the textarea
  textarea.select();
  document.execCommand('copy');

  // Remove the temporary textarea element
  document.body.removeChild(textarea);
}

export default getEventTiming;