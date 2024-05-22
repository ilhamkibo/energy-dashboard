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
  const [highlightedCards, setHighlightedCards] = useState([]); // Array indeks CustomCard yang berubah warna
  const [prevRawData, setPrevRawData] = useState({}); // State untuk menyimpan nilai val.raw_data sebelumnya

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
          console.log("🚀 ~ client.on ~ data:", data, client.options.clientId);
        });
      }
    }
  }, [client]);

  useEffect(() => {
    // Update warna CustomCard saat payload berubah
    if (payload && payload.data && payload.data.length > 0) {
      let updatedHighlightedCards = [...highlightedCards]; // Salin array highlightedCards
      payload.data.forEach((item) => {
        if (item.values && item.values.length > 0) {
          item.values.forEach((val, idx) => {
            if (
              val.raw_data !== undefined &&
              val.raw_data !== null &&
              prevRawData[val.name] !== val.raw_data
            ) {
              // Tambahkan indeks CustomCard yang berubah ke array
              updatedHighlightedCards.push(idx);
              setHighlightedCards(updatedHighlightedCards);

              setTimeout(() => {
                // Setelah 0.5 detik, hapus indeks CustomCard dari array
                updatedHighlightedCards = updatedHighlightedCards.filter(
                  (item, index) => index !== updatedHighlightedCards.length - 1
                );
                setHighlightedCards(updatedHighlightedCards);
              }, 500);
            }
          });
        }
      });

      // Simpan nilai val.raw_data ke state prevRawData
      const newPrevRawData = { ...prevRawData };
      payload.data.forEach((item) => {
        if (item.values && item.values.length > 0) {
          item.values.forEach((val) => {
            newPrevRawData[val.name] = val.raw_data;
          });
        }
      });
      setPrevRawData(newPrevRawData);
    }
  }, [payload]);

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
        {payload && payload.data && payload.data.length > 0 && (
          <CustomCard
            title="Data Monitoring"
            Component={() => <DataTable data={payload.data} />}
            description=""
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
