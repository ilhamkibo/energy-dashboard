export default function CustomCard({ title, Component, description }) {
  return (
    <div className="bg-color-bgCard rounded-md my-4 min-w-64">
      <div className="pl-4 py-2 border-b-2 border-color-bgPrime text-lg">
        {title}
      </div>
      <div className="pl-4 py-2 text-center">{Component && <Component />}</div>
      <div className="pl-4 py-2 text-center">{description}</div>
    </div>
  );
}
