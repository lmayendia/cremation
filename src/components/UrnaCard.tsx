import { ProductCardProps } from "@/types";
import Image from "next/image";


const ProductCard = ({ name, description, price, isAvailable, imageUrl, url }: ProductCardProps) => {
  return (
    <div className="p-4 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="font-bold text-lg mb-2">${price}</p>
      <p className="text-sm text-gray-500">
        {isAvailable ? "Available" : "Out of stock"}
      </p>

        <a href={url}>
            <button className="bg-primary-500 border border-primary-500 text-white py-1 px-6 rounded hover:bg-primary-700 hover:border-primary-700">
                COMPRAR
            </button>
        </a>
    </div>
  );
};

export default ProductCard;
