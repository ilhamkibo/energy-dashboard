"use client";
// Dashboard.js
import React, { useState } from "react";
import HookMqtt from "@/components/Mqtt";
import { usePathname } from "next/navigation";

function Dashboard() {
  const [payload, setPayload] = useState({});
  console.log("🚀 ~ Dashboard ~ payload:", payload);
  const pathname = usePathname();

  let parsedPayload = null;

  if (payload.message) {
    try {
      parsedPayload = JSON.parse(payload.message);
    } catch (error) {
      console.error("Error parsing payload:", error);
    }
  }

  return <HookMqtt jamput={setPayload} renders={true} />;
}

export default Dashboard;
