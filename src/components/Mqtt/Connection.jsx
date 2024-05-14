import React, { useEffect } from "react";

const Connection = ({ connect, disconnect, connectBtn, pathname }) => {
  useEffect(() => {
    const url = `ws://broker.emqx.io:8083/mqtt`;
    const options = {
      clientId:
        "emqx_react_" +
        Math.random().toString(16).substring(2, 8) +
        pathname.toString(),
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    connect(url, options);

    return () => {
      disconnect();
    };
  }, []);

  return (
    <div className="flex items-center">
      <div
        className={`h-2 w-2 rounded-full mr-2`}
        style={{
          backgroundColor: connectBtn == "Connected" ? "#00FF00" : "#FF0000",
        }}
      ></div>
      <span className="text-sm">MQTT {connectBtn}</span>
    </div>
  );
};

export default Connection;
