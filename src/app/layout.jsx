import { nunito_sans } from "@/utils/font";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { MqttProvider } from "@/components/context/MqttContext";

export const metadata = {
  title: "Power Monitoring",
  description: "Developed by Toho Technology Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito_sans}>
        <MqttProvider>
          <div className="flex flex-col md:flex-row">
            <Sidebar />
            {children}
          </div>
        </MqttProvider>
      </body>
    </html>
  );
}
