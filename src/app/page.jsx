import HookMqtt from "@/components/Mqtt";
export default function Home() {
  return (
    // <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 grid-cols-1 mt-2 pb-4 md:mt-9 font-nunito_sans">
    //   <Dasboard />
    // </div>
    <div className="flex flex-col mt-2 pb-4 md:mt-9 font-nunito_sans">
      <HookMqtt renders={true} />
    </div>
  );
}
