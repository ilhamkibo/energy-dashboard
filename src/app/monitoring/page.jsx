import HookMqtt from "@/components/Mqtt";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    // <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 grid-cols-1 mt-2 pb-4 md:mt-9 font-nunito_sans">
    //   <Dasboard />
    // </div>
    <div className="flex-1 px-4 md:px-6 min-h-screen bg-gradient-to-tr from-color-bgPrime to-color-bgSecond">
      <Navbar />
      <div className="flex flex-col mt-2 pb-4 md:mt-9 font-nunito_sans">
        <HookMqtt />
      </div>
    </div>
  );
}
