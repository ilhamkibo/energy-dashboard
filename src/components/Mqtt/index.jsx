"use client";
import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import Connection from "./Connection";
import Subscriber from "./Subscriber";
import CustomCard from "../Card";

const HookMqtt = ({ pathname = "/", renders }) => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connect");

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    /**
     * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
     * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
     *
     * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
     * which should be specified when connecting, and the path used on EMQX is /mqtt.
     *
     * for more details about "mqtt.connect" method & options,
     * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
     */
    setClient(mqtt.connect(host, mqttOption));
  };

  useEffect(() => {
    if (client) {
      // https://github.com/mqttjs/MQTT.js#event-connect
      client.on("connect", () => {
        setConnectStatus("Connected");
        console.log("connection successful");
      });

      // https://github.com/mqttjs/MQTT.js#event-error
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });

      // https://github.com/mqttjs/MQTT.js#event-reconnect
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });

      // https://github.com/mqttjs/MQTT.js#event-message
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(JSON.parse(payload.message));
        console.log("sadadasda: ", payload);
        console.log(`received message: ${message} from topic: ${topic}`);
      });
    }
  }, [client]);

  // disconnect
  // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus("Connect");
          console.log("disconnected successfully");
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription;
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
        setIsSub(true);
      });
    }
  };

  // unsubscribe topic
  // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
        setIsSub(false);
      });
    }
  };

  const Component = () => {
    return <div>Value</div>;
  };

  if (renders) {
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
        {payload &&
          payload.data &&
          payload.data.length > 0 &&
          payload.data.map((item, index) => (
            <div key={index}>
              <div className="pl-4 py-2 border-b-2 border-color-bgPrime text-lg">
                {item.name}
              </div>
              <div className="pl-4 py-2 text-center grid grid-cols-3 gap-x-2">
                {item.values.map((val, idx) => (
                  <CustomCard
                    key={idx}
                    title={val.name}
                    Component={() => (
                      <div>
                        {val.raw_data !== undefined && val.raw_data !== null
                          ? val.raw_data
                          : "No data"}
                      </div>
                    )}
                    description={
                      val.timestamp
                        ? new Date(val.timestamp * 1000).toLocaleString()
                        : "No timestamp"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
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
