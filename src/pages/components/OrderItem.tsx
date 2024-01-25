import { Order } from "@/domain/entities/Order";
import Ping from "./Ping";
import Field from "./Field";

export interface OrderItemProps {
  order: Order;
  onConfirm(): Promise<void>;
  onRemove(): Promise<void>;
  onPrint(): void;
}

export default function OrderItem({ order, ...props }: OrderItemProps) {
  return (
    <li className="w-full max-w-[400px] p-2 flex flex-col gap-2 relative overflow-hidden !bg-white shadow-sm hover:bg-zinc-50">
      <Ping status={order?.status} />

      <header className="flex w-full flex-col items-start justify-start">
        <span className=" text-[#967466] text-lg font-bold">
          {order?.clientName}
        </span>
        <span className="text-[#967466]">
          {order?.createdAt?.toLocaleString("pt-BR")}
        </span>
      </header>

      <Field title="Telefone:" value={order?.phone} />
      <Field title="Endereço:" value={order?.address} />
      <Field title="Pagamento:" value={order?.paymentMethod} />
      <Field title="Observações:" value={order?.note} />
      <b className="text-[#967466] text-lg">Pedido:</b>
      <div className="zigzag py-10 px-3">
        <ul>
          {order?.items?.map((p) => (
            <li key={p.productName}>
              <div className="flex text-[#967466] text-sm gap-3">
                <span>{p.quantity}</span>
                <span>{p.productName}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex gap-2 items-end py-5">
        <button
          data-new={order?.status === "created"}
          onClick={() => props.onConfirm()}
          className="text-white p-2 w-full rounded-md bg-teal-500 text-sm hover:bg-[#f4e4dd] data-[new=false]:hidden"
        >
          Confirmar pedido
        </button>
        <button
          data-new={order?.status === "created"}
          onClick={() => props.onRemove()}
          className="text-white p-2 w-full rounded-md bg-red-500 text-sm hover:bg-[#f4e4dd] data-[new=false]:hidden"
        >
          Remover pedido
        </button>
      </div>
      <button
        onClick={() => props.onPrint()}
        className="text-white p-2 w-full rounded-md bg-[#967466] text-sm hover:bg-[#f4e4dd]"
      >
        Imprimir pedido
      </button>
    </li>
  );
}
