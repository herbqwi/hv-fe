export class ESP32Socket {
  private readonly ip: string;
  readonly ws: WebSocket;

  constructor(ip: string) {
    this.ip = ip;
    this.ws = new WebSocket(`ws://${ip}/ws`);
    this.connect();
  }

  connect() {
    const ws: WebSocket = new WebSocket(`ws://${this.ip}/ws`);

    ws.addEventListener('message', (event: MessageEvent) => {
      const msg = event.data;
      if (msg == `Connected`) return;
      console.log(`Received message: ${msg}`);
    });
  }

  sendMessage(msg: string) {
    this.ws.send(msg);
  }

  sendValidationInformation(presetCode: string): Promise<void> {
    this.ws.send(presetCode);
    return new Promise<void>((resolve, reject) => {

      this.ws.addEventListener('message', (event: MessageEvent) => {
        const msg = event.data;
        if (msg === 'Connected') resolve();
        else reject();
      });

    });
  }
}

async function checkESPSocket(presetCode: string, ip: string, timeout: number): Promise<ESP32Socket | null> {
  return new Promise(async (resolve) => {
    const espWS = new ESP32Socket(ip);
    const timeoutId = setTimeout(() => {
      espWS.ws.close();
      resolve(null);
    }, timeout);

    espWS.ws.addEventListener('open', async () => {
      clearTimeout(timeoutId);
      try {
        await espWS.sendValidationInformation(presetCode);
        console.log(`Found web socket: ${ip}`);
        resolve(espWS);
      } catch {
        resolve(null);
      }
    });

    espWS.ws.addEventListener('error', () => {
      clearTimeout(timeoutId);
      resolve(null);
    });
  });
}

export async function getESPSocket(presetCode: string): Promise<WebSocket | null> {
  console.log(`start searching..`)
  const parallelChecks = 10;
  const timeout = 5000;

  for (let i = 2; i < 30; i += parallelChecks) {
    const promises = [];

    for (let j = 0; j < parallelChecks; j++) {
      const ip = `192.168.1.${i + j}`;
      promises.push(checkESPSocket(presetCode, ip, timeout));
    }

    const results = await Promise.all(promises);
    const foundESP = results.find((espWS) => espWS !== null);

    if (foundESP) {
      return foundESP.ws;
    }
  }

  return null;
}