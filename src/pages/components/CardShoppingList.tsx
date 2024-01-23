export interface ShoppingListProps {
  clientName?: string;
  address?: string;
  phone?: string;
  paymentMethod?: string;
  items?: Items[];
  note?: string;
  status?: "created" | "approved";
  onClick?: Function;
}

export interface Items {
  productName?: string;
  quantity?: string;
}

export default function ShoppingList(props: ShoppingListProps) {
  return (
    <li className="w-full max-w-[600px] p-4 grid relative bg-white shadow-sm hover:bg-zinc-50">
      <div
        data-new={props.status === "created"}
        className="w-2 h-2 top-2 right-2 rounded-full absolute bg-emerald-500 data-[new=false]:hidden"
      ></div>
      <div
        data-new={props.status === "created"}
        className="w-2 h-2 top-2 right-2 animate-ping rounded-full absolute bg-emerald-500 data-[new=false]:hidden"
      ></div>
      <div className="flex w-full  items-center justify-between">
        <span className=" text-[#967466] text-lg">{props.clientName}</span>
        <span className=" text-[#967466] mr-8">Telefone:{props.phone}</span>
      </div>
      <div className="grid">
        <span className=" text-[#967466] text-sm">
          Endereço: {props.address}
        </span>
        <span className=" text-[#967466] text-sm">
          Pagamento:{props.paymentMethod}
        </span>
      </div>
      <div className="my-5">
        <h2 className=" text-[#967466] text-lg">Pedido:</h2>
        <div className="zigzag p-5">
          <ul>
            {props.items?.map((p) => (
              <li key={p.productName}>
                <div className="flex gap-3">
                  <span className=" text-[#967466] text-sm">{p.quantity}</span>
                  <span className=" text-[#967466] text-sm">
                    {p.productName}
                  </span>
                </div>
                <hr />
              </li>
            ))}
          </ul>
          <div className="grid mt-5">
            <span className=" text-[#967466] text-sm">Observações:</span>
            <span className=" text-[#967466] text-sm">{props.note}</span>
          </div>
        </div>
        <div className="w-full flex items-end justify-end my-5">
          <button
            data-new={props.status === "created"}
            onClick={() => props.onClick()}
            className="text-[#967466] p-2 rounded-md bg-[#f7f2f0] hover:bg-[#f4e4dd] data-[new=false]:hidden"
          >
            Confirmar pedido
          </button>
        </div>
      </div>
    </li>
  );
}
