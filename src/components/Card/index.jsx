export default function CustomCard({ title, Chart }) {
  return (
    <div className="bg-color-bgCard rounded-md">
      <div className="pl-4 py-2 border-b-2 border-color-bgPrime text-lg">
        {title}
      </div>
      <div className="pl-4 py-2 text-center">{Chart && <Chart />}</div>
    </div>
  );
}
