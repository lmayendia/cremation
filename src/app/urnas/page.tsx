import { getUrnasInfo } from "@/lib/get-urnas";
import { UrnasResponse } from "@/types"; // Adjust path as needed
import ProductCard from "@/components/UrnaCard"; // Adjust path as needed

export default async function UrnasPage() {
  const UrnasInfo: UrnasResponse = await getUrnasInfo();
  console.log(UrnasInfo)
  return (
    <div className="py-52">
        <h1 className="mb-10 text-5xl font-bold text-center">Best urna in the world</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
        {UrnasInfo.data.map((urna) => (
            <ProductCard
            key={urna.id}
            name={urna.name}
            description={urna.description}
            price={urna.price}
            isAvailable={urna.isAvailable}
            imageUrl={`${urna.image.url}`}
            url={urna.url}
            // Assuming the image URL is available here
            />
        ))}
        </div>
    </div>
  );
}
