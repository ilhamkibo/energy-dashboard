const CustomCard = ({
  title,
  Component,
  description,
  color = "bg-color-bgCard",
}) => {
  return (
    <div
      className={`rounded-md my-4 min-w-64 transition-colors duration-500 ${color}`}
      style={{ transitionProperty: "background-color" }}
    >
      <div className="pl-4 py-2 border-b-2 border-color-bgPrime text-lg">
        {title}
      </div>
      <div className="pl-4 py-2 text-center">{Component && <Component />}</div>
      <div className="pl-4 py-2 text-center border-t-2 border-color-bgPrime">
        {description}
      </div>
    </div>
  );
};

export default CustomCard;
