/* eslint-disable no-bitwise */

import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";
/* eslint-disable-next-line */
import base64 from "react-native-base64";
import { useMode } from "../providers/mode.provider";

const BLE_HM_10_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
const BLE_HM_10_CHARACTERISTIC = "0000ffe1-0000-1000-8000-00805f9b34fb";

interface BluetoothLowEnergyApi {
  requestPermissions: () => Promise<boolean>;
  scanForPeripherals: () => void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  heartRate: number;
  sendData: (device: Device | null, data: string) => Promise<void>;
}

let count: number = -1;

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [heartRate, setHeartRate] = useState<number>(0);
  const mode = useMode();

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device && device.name?.includes("BT05")) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      const characteristic =
        await deviceConnection.discoverAllServicesAndCharacteristics();
      console.log(characteristic);
      bleManager.stopDeviceScan();
      // bleManager.readCharacteristicForDevice(deviceConnection, "", " ");
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };
  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setHeartRate(0);
    }
  };

  const onVoltsUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {
    if (error) {
      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log("No Data was recieved");
      return -1;
    }
    const data = base64.decode(characteristic.value).replace(" ", "");
    console.log("BLE1:", data);
    console.log("DATA NUMBER:", data.split(",")[0]);
    console.log("DATA MODE:", data.split(",")[1]);
    mode?.setCurrentVolt(Number(data.split(",")[0]));
    mode?.setVolts((prevState) => [...prevState, Number(data.split(",")[0])]);
    mode?.setLabels((prevState) => [...prevState, String(count++)]);

    switch (data.split(",")[1].replace(" ", "")) {
      case "A":
        mode?.setMode(0);
        return;
      case "B":
        mode?.setMode(1);
        return;
      case "C":
        mode?.setMode(2);
        return;
    }
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      device.monitorCharacteristicForService(
        BLE_HM_10_UUID,
        BLE_HM_10_CHARACTERISTIC,
        onVoltsUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };

  const sendData = async (device: Device | null, data: string) => {
    if (device) {
      const dataSend = base64.encode(data);
      await device.writeCharacteristicWithoutResponseForService(
        BLE_HM_10_UUID,
        BLE_HM_10_CHARACTERISTIC,
        dataSend
      );
    } else {
      console.log("No Device Connected");
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    heartRate,
    sendData,
  };
}

export default useBLE;
