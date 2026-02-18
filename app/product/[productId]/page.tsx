
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface PageProps {
  params: Promise<{ productId?: string }>;
}

const Product = async ({ params }: PageProps) => {
  const { productId } = await params; // ✅ must await

  const product = await getProductById(productId);
  const user = await getCurrentUser();

  if (!product) {
    return (
      <NullData title="Oops! Product with the given id does not exist" />
    );
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />

        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
