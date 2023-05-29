import { setDefaultResultOrder } from "dns";
import { useState } from "react";
import { IDevice } from "../interfaces";
import axios from "axios";

export const useNetworkAnalyzer = (closeModal: any) => {
  const [devices, setDevices] = useState<IDevice.Device[]>([]);
  const [rpIP, setRPIP] = useState<string | null>(null);

  const addDevice = (device: IDevice.Device) => {
    setDevices(prevDevices => ([...prevDevices, device]));
  }

  const createSocketConnection = (ip: string) => {
    return new Promise<IDevice.Device | null>((resolve, reject) => {
      const ws: WebSocket = new WebSocket(`ws://${ip}/ws`);

      const timeoutId = setTimeout(() => {
        ws.close();
        resolve(null);
      }, 5000);

      ws.onopen = () => {
        clearTimeout(timeoutId);
      }

      ws.onerror = () => {
        clearTimeout(timeoutId);
        resolve(null);
      }

      ws.onmessage = (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        clearTimeout(timeoutId);
        resolve({ deviceType: IDevice.DeviceType.ESP32, ws, ...data } as IDevice.Device);
      }
    })
  }



  const identifyDevice = (ip: string) => {
    return new Promise<string | null>((resolve, reject) => {
      axios.get(`http://${ip}:5000/identify`)
        .then((response) => {
          if (response.status == 200) {
            resolve(ip);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          // In case of error (e.g. device not found or not responsive), resolve with null
          resolve(null);
        });
      setTimeout(() => {
        resolve(null);
      }, 5000);
    });
  };


  const analyzeNetwork = async (isESP32: boolean) => {
    const parallelChecks = 10;

    for (let i = 0; i < 255; i += parallelChecks) {
      const promises = [];

      for (let j = 0; j < parallelChecks; j++) {
        const ip = `192.168.1.${i + j}`;
        if (isESP32) {
          console.log(`push connection esp`);
          promises.push(createSocketConnection(ip));
        } else {
          console.log(`push connection pi`);
          promises.push(identifyDevice(ip));
        }
      }
      if (isESP32) {
        const results = await Promise.all(promises);
        results.map((device) => device != null ? addDevice(device as IDevice.Device) : null);
        if (results.find(result => result != null)) break;
      } else {
        const results = await Promise.all(promises);
        let found = false;
        for (const result of results) {
          if (result != null) {
            setRPIP(result as string);
            closeModal();
            found = true;
          }
        }
        if (found) {
          break;
        }
      }
    }

    return null;
  }

  return { rpIP, devices, analyzeNetwork };
}