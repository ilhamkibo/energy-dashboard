"use client";
import Image from "next/image";
import { useState } from "react";
import { FiAlignJustify, FiGrid } from "react-icons/fi";
import { FaMoneyBill } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";
import { BsFillTicketDetailedFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import CollectionLink from "./CollectionLink";
import HookMqtt from "../Mqtt";

export default function Sidebar() {
  const pathname = usePathname();
  const [showCollectionLinks, setShowCollectionLinks] = useState(false);
  const [payloading, setPayloading] = useState("");

  const toggleCollectionLinks = () => {
    setShowCollectionLinks(!showCollectionLinks);
  };

  return (
    <aside className="bg-color-primary md:sticky md:top-0 text-color-white w-full md:w-60 xl:72 p-4 overflow-y-auto md:h-screen">
      <div className="flex md:flex-col md:pt-5 justify-between items-center">
        <div className="flex flex-row gap-2 md:flex-col justify-center items-center">
          <div className="text-center">
            <span className="text-2xl font-nunito_sans text-center">
              Toho Tec-ID
            </span>
          </div>
          <div className="text-center">
            <Image
              src="/toho.png"
              width={25}
              height={25}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={toggleCollectionLinks}>
            <FiAlignJustify size={25} />
          </button>
        </div>
      </div>

      <nav
        className={`overflow-hidden overflow-y-auto transition-all duration-500 ease-in-out ${
          showCollectionLinks ? "max-h-screen" : "max-h-0"
        } md:max-h-full`}
      >
        <ul className="pt-12 md:pt-16 flex flex-col font-nunito_sans font-light w-full ml-4">
          <CollectionLink
            title="Dashboard"
            link="/"
            Icon={FiGrid}
            pathname={pathname}
          />
          <CollectionLink
            pathname={pathname}
            title="Monitoring"
            link="/monitoring"
            Icon={MdMonitorHeart}
          />
          <CollectionLink
            pathname={pathname}
            title="Details"
            link="/details"
            Icon={BsFillTicketDetailedFill}
          />
          <CollectionLink
            pathname={pathname}
            title="Cost"
            link="/cost"
            Icon={FaMoneyBill}
          />

          {/* <CollectionLink
            pathname={pathname}
            title="Appliances"
            link="/appliances"
            Icon={FaLightbulb}
          /> */}
        </ul>
      </nav>
      {pathname == "/monitoring" && (
        <>
          <hr className="mt-2 mb-4" />
          <HookMqtt pathname={pathname} renders={true} />
        </>
      )}
    </aside>
  );
}
