import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductsCardSkeleton"
// import { useGetDashboardProductsQuery } from "../app/services/products";

const ProductsPage = () => {
  // const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 })
  const getProductList = async () => {
    const response = await axios.get(
      "https://zerie-fullstack-reactjs-strapi.onrender.com/api/products?populate=thumbnail,category&pagination[pageSize]=10&pagination[page]=1&sort=createdAt:DESC"
    );                                        
    return response.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });
  if (isLoading) return (
    <Grid margin={30} templateColumns={"repeat(auto-fill,minmax(300px,1fr))"} gap={6}>
      {Array.from({ length: 20 }, (_, idx) => (
        <ProductSkeleton key={idx} />
      ))
      }
    </Grid>)
  if (error) return <h3>Error: {error.message}</h3>;

  return (
    <Grid margin={30} templateColumns={"repeat(auto-fill,minmax(300px,1fr))"} gap={6}>
      {data.data.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
