import { Order } from "@/domain/entities/Order";

interface PingProps {
  status: Order.Status;
}

export default function Ping(props: PingProps) {
  return (
    <div>
      <div
        data-new={props.status === "created"}
        className="w-5 h-5 top-2 right-2 rounded-full absolute bg-emerald-500 data-[new=false]:hidden"
      />
      <div
        data-new={props.status === "created"}
        className="w-5 h-5 top-2 right-2 animate-ping rounded-full absolute bg-emerald-500 data-[new=false]:hidden"
      />
    </div>
  );
}
