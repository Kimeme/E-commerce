import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/nav/HomeBanner";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCard";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8 ">
       {/* {products.map((product: any) => {
            return <ProductCard data={product} />;
          })}  */}
          {products.map((product: any, index: number) => (
  <ProductCard key={index} data={product} />
))}

        </div>

      </Container>
   </div>
  );
}

