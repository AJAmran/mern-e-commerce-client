import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: cart = [], refetch } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  console.log(cart);
  return [cart, refetch];
};

export default useCart;
