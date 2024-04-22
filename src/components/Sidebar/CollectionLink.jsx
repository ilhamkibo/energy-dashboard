import Link from "next/link";

export default function CollectionLink({ Icon, link, title, pathname }) {
  return (
    <li
      className={`flex items-center py-2 mb-4 ${
        pathname === link
          ? "border-l-4 border-color-greenBorder hover:text-lg text-color-white"
          : "hover:text-color-white hover:text-lg text-color-gray"
      }`}
    >
      {Icon && <Icon className="mr-4 ml-2" size={25} />}
      <Link href={link}>{title}</Link>
    </li>
  );
}
