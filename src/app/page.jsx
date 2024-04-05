import CustomCard from "@/components/Card";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 grid-cols-1 mt-2 md:mt-9 font-nunito_sans">
      <CustomCard title="aeng aeng" imageSrc="/c1.png" />
      <CustomCard title="aeng aeng" imageSrc="/c2.png" />
      <CustomCard title="aeng aeng" imageSrc="/c3.png" />
      <CustomCard title="aeng aeng" imageSrc="/c4.png" />
      <CustomCard title="aeng aeng" imageSrc="/c5.png" />
      <CustomCard title="aeng aeng" imageSrc="/c6.png" />
    </div>
  );
}
