import { ESP32Socket } from "./esp32.service";

export class RaspberryPiSocket extends ESP32Socket {
  constructor(ip: string) {
    super(ip);
  }
}

export async function getRaspberryPiSocket(presetCode: string): Promise<WebSocket | null> {
  const parallelChecks = 5;
  const timeout = 1000;

  for (let i = 2; i < 255; i += parallelChecks) {
    const promises = [];

    for (let j = 0; j < parallelChecks; j++) {
      const ip = `192.168.1.${i + j}`;
      promises.push(checkRaspberryPiSocket(presetCode, ip, timeout));
    }

    const results = await Promise.all(promises);
    const foundRaspberryPi = results.find((rpiWS) => rpiWS !== null);

    if (foundRaspberryPi) {
      return foundRaspberryPi.ws;
    }
  }

  return null;
}

async function checkRaspberryPiSocket(presetCode: string, ip: string, timeout: number): Promise<RaspberryPiSocket | null> {
  return new Promise(async (resolve) => {
    const rpiWS = new RaspberryPiSocket(ip);
    const timeoutId = setTimeout(() => {
      rpiWS.ws.close();
      resolve(null);
    }, timeout);

    rpiWS.ws.addEventListener('open', async () => {
      clearTimeout(timeoutId);
      try {
        await rpiWS.sendValidationInformation(presetCode);
        console.log(`Found Raspberry Pi web socket: ${ip}`);
        resolve(rpiWS);
      } catch {
        resolve(null);
      }
    });

    rpiWS.ws.addEventListener('error', () => {
      clearTimeout(timeoutId);
      resolve(null);
    });
  });
}
