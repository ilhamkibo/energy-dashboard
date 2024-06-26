export default function TabButton({ label, active, onClick }) {
  return (
    <li>
      <button
        className={`py-2 mx-1 ${
          active ? "bg-color-primary" : ""
        } rounded-3xl px-3`}
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
}
