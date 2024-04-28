const CustomCard = ({
  title,
  Component,
  description,
  height,
  color = "bg-color-bgCard",
  payload,
}) => {
  return (
    <div
      className={`rounded-md my-4 min-w-64 transition-colors duration-500 ${color}`}
      style={{ transitionProperty: "background-color" }}
    >
      <div className="pl-4 py-2 border-b-2 border-color-bgPrime text-lg">
        {title}
      </div>
      {payload && payload.summary && (
        <div className="p-4 flex flex-row justify-around">
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg font-light">Used Watt Total:</div>
            <div className="text-2xl font-bold">
              {Number.parseFloat(payload.summary.total_kW).toFixed(3)}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg font-light">Average Watt:</div>
            <div className="text-2xl font-bold">
              {Number.parseFloat(payload.summary.avg_kW).toFixed(3)}
            </div>
          </div>
        </div>
      )}
      <div className="pl-4 py-2 text-center">
        {Component && <Component height={height} payload={payload} />}
      </div>
      <div className="pl-4 py-2 text-center border-t-2 border-color-bgPrime">
        {description}
      </div>
    </div>
  );
};

export default CustomCard;
