import Image from "next/image";

export default function CustomCard({ title, imageSrc }) {
  return (
    <div className="bg-color-bgCard rounded-md">
      <div className="pl-4 py-2 border-b-2 border-color-bgPrime text-lg">
        {title}
      </div>
      <div className="pl-4 py-2 text-center">
        <Image
          src={imageSrc}
          width={500}
          height={10}
          alt="Description of your image"
        />
      </div>
    </div>
  );
}
