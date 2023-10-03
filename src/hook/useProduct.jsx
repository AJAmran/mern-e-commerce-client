import { useQuery } from "@tanstack/react-query";

const useProduct = () => {
  const {
    data: products = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://e-commerce-backend-ajamran.vercel.app/products");
      return res.json();
    },
  });

  return [products, loading, refetch];
};

export default useProduct;
