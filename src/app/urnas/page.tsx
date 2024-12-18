import { getUrnasInfo } from "@/lib/get-urnas";
import { UrnasResponse } from "@/types"; // Adjust path as needed
import ProductCard from "@/components/UrnaCard"; // Adjust path as needed

export default async function UrnasPage() {
  const UrnasInfo: UrnasResponse = await getUrnasInfo();
  return (
    <section>
      <div className="bg-primary-500 text-white py-12 text-center">
        <h1 className="lg:text-5xl text-2xl font-bold mb-4">Dale a tus serés queridos el descanso que merecen</h1>
        <p className="text-xl">Descubre las urnas que tenemos disponibles</p>
      </div>
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
            />
        ))}
        </div>
    </section>
  );
}
