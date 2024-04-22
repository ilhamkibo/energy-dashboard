import React, { useEffect } from "react";

const Subscriber = ({ sub, showUnsub }) => {
  // topic & QoS for MQTT subscribing
  const record = {
    topic: "toho",
    qos: 0,
  };

  useEffect(() => {
    sub(record);
  }, [sub]);

  return (
    <>
      {showUnsub ? <div>Subscribe Success!</div> : <div>Subscribe Failed!</div>}
    </>
  );
};

export default Subscriber;
