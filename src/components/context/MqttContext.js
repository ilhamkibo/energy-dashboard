"use client";
import React, { createContext, useContext, useState } from "react";
import mqtt from "mqtt";

const MqttContext = createContext();

export const useMqtt = () => {
  return useContext(MqttContext);
};

export const MqttProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connect");

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    const newClient = mqtt.connect(host, mqttOption);
    setClient(newClient);
    return newClient;
  };

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus("Connect");
          console.log("Disconnected successfully");
        });
      } catch (error) {
        console.log("Disconnect error:", error);
      }
    }
  };

  return (
    <MqttContext.Provider
      value={{
        client,
        mqttConnect,
        mqttDisconnect,
        connectStatus,
        setConnectStatus,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};
