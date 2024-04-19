// // mqttClient.js
// import mqtt from "mqtt";

// const mqttBrokerUrl = "mqtt://103.181.142.170:1883";
// const mqttClient = mqtt.connect(mqttBrokerUrl);

// mqttClient.on("connect", () => {
//   console.log("Connected to MQTT broker");
// });

// mqttClient.on("close", () => {
//   console.log("Disconnected from MQTT broker");
// });

// mqttClient.on("error", (error) => {
//   console.error("Error occurred:", error);
//   // Lakukan penanganan kesalahan, misalnya mencoba untuk membuat koneksi kembali atau memberi tahu pengguna tentang kesalahan.
// });

// mqttClient.on("message", (topic, message) => {
//   console.log(`Received message on topic ${topic}: ${message.toString()}`);
//   // Lakukan sesuatu dengan pesan yang diterima
// });

// mqttClient.subscribe("toho");

// export default mqttClient;

// mqttClient.js
import mqtt from "mqtt";

const mqttBrokerUrl = "ws://103.181.142.170:8083/mqtt";
const mqttClient = mqtt.connect(mqttBrokerUrl);

export default mqttClient;
