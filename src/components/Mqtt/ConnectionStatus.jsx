import React, { useState, useEffect } from "react";
import mqttClient from "@/libs/mqttClient";

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(mqttClient.connected);
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from MQTT broker");
      setIsConnected(false);
    };

    mqttClient.on("connect", handleConnect);
    mqttClient.on("close", handleDisconnect);

    mqttClient.on("message", (topic, message) => {
      // Menangani pesan yang diterima dari topik MQTT
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      setReceivedData(message.toString());
    });

    return () => {
      mqttClient.off("connect", handleConnect);
      mqttClient.off("close", handleDisconnect);
    };
  }, []);

  return (
    <div className="flex items-center">
      <div
        className={`h-2 w-2 rounded-full mr-2`}
        style={{ backgroundColor: isConnected ? "#00FF00" : "#FF0000" }}
      ></div>
      <span className="text-sm">
        {isConnected ? "Connected" : "Not Connected"}
      </span>
    </div>
  );
};

export default ConnectionStatus;
