"use client";
import React, { useEffect, useState } from "react";
import Connection from "./Connection";
import Subscriber from "./Subscriber";
import CustomCard from "../Card";
import { useMqtt } from "../context/MqttContext";
import DataTable from "../Table";

const HookMqtt = ({ pathname = "/", renders }) => {
  const {
    client,
    mqttConnect,
    mqttDisconnect,
    connectStatus,
    setConnectStatus,
  } = useMqtt();
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
        console.log("connection successful");
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });

      if (!renders) {
        client.on("message", (topic, message) => {
          const data = { topic, message: message.toString() };
          setPayload(JSON.parse(data.message));
        });
      }
    }
  }, [client]);

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  if (!renders) {
    return (
      <>
        <div className="hidden">
          <Connection
            connect={mqttConnect}
            disconnect={mqttDisconnect}
            connectBtn={connectStatus}
            client={client}
            pathname={pathname}
          />
          <Subscriber sub={mqttSub} showUnsub={isSubed} />
        </div>
        {payload && payload.data && payload.data.length > 0 ? (
          <CustomCard
            title="Data Monitoring"
            Component={() => <DataTable data={payload.data} />}
            description="MONITORING PANEL"
            color="bg-color-bgCard"
          />
        ) : (
          <CustomCard
            title="Data Monitoring"
            Component={() => <DataTable data={payload.data} />}
            description="MONITORING PANEL"
            color="bg-color-bgCard"
          />
        )}
      </>
    );
  }
  return (
    <>
      <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
        client={client}
        pathname={pathname}
      />
      <Subscriber sub={mqttSub} showUnsub={isSubed} />
    </>
  );
};

export default HookMqtt;
