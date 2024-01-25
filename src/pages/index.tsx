"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import OrderItem from "./components/OrderItem";
import axios from "axios";
import { Order } from "@/domain/entities/Order";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://oliveira-hub.doxacode.app.br"
      : "http://localhost:3333",
});

export default function Home() {
  const queryClient = useQueryClient();

  const { data: orderList } = useQuery({
    queryKey: ["get-orders"],
    queryFn: async () => {
      const response = await client.get("/orders");
      return response.data;
    },
    refetchInterval: 2000,
  });

  const { mutateAsync: onConfirm } = useMutation({
    mutationFn: async (id) => await client.put(`/orders/confirm/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
    },
  });

  const { mutateAsync: onRemove } = useMutation({
    mutationFn: async (id) => await client.delete(`/orders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
    },
  });

  const onPrint = (order: Order) => {};

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#F8F6F5]">
      <div className="flex-1 container bg-white flex flex-col gap-2 md:gap-4 h-screen rounded-md overflow-hidden shadow-inner border px-2 py-5 md:p-5">
        <h1 className="text-[#97857d] text-xl">Pedidos</h1>
        <hr />
        <div className="w-full gap-2 bg-[#f7f2f0] rounded-md p-2 overflow-y-auto flex-1">
          <span
            data-hidden={orderList?.length > 0}
            className="italic data-[hidden=true]:hidden opacity-55"
          >
            Não há pedidos!
          </span>
          <ul className="flex flex-wrap gap-3">
            {orderList?.map((order) => (
              <OrderItem
                key={order.id}
                onConfirm={async () => {
                  await onConfirm(order.id);
                }}
                onRemove={async () => {
                  await onRemove(order.id);
                }}
                onPrint={() => onPrint(order)}
                order={order}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
