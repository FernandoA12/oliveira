"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ShoppingList from "./components/CardShoppingList";
import axios from "axios";

const client = axios.create({
  baseURL: "https://oliveira-hub.doxacode.app.br",
});

export default function Home() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["get-orders"],
    queryFn: fetchOrders,
    refetchInterval: 2000,
  });

  const mutation = useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
    },
    onError: console.log,
  });

  async function fetchOrders() {
    const response = await client.get("/orders");
    return response.data;
  }

  async function confirmOrder(id: string) {
    await client.put(`/orders/confirm/${id}`);
  }

  const orderList = query.data;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#F8F6F5]">
      <div className="w-4/6 h-5/6 bg-white rounded-md shadow-inner border p-5">
        <h1 className="text-[#97857d]">Pedidos</h1>
        <hr />
        <div className="w-full my-10 gap-2 bg-[#f7f2f0] rounded-md p-4">
          <ul className=" mt-8 grid grid-cols-2 gap-4">
            {orderList?.map((c) => (
              <ShoppingList
                key={c?.phone}
                clientName={c?.clientName}
                phone={c?.phone}
                address={c?.address}
                paymentMethod={c?.paymentMethod}
                items={c?.items}
                note={c?.note}
                status={c?.status}
                onClick={() => {
                  mutation.mutate(c.id), window.print();
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
