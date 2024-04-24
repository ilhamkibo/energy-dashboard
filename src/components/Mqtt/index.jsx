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
  const [highlightedCards, setHighlightedCards] = useState([]); // Array indeks CustomCard yang berubah warna
  const [prevRawData, setPrevRawData] = useState({}); // State untuk menyimpan nilai val.raw_data sebelumnya

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

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

      client.on("message", (topic, message) => {
        const data = { topic, message: message.toString() };
        setPayload(JSON.parse(data.message));
      });
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
              <div className="pl-4 py-2 text-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-2">
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
                    description={`Units: ${val.desc ? val.desc : "-"}`}
                    color={
                      highlightedCards.includes(idx)
                        ? "bg-yellow-200"
                        : "bg-color-bgCard"
                    } // Mengubah warna CustomCard sesuai index yang berubah
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
