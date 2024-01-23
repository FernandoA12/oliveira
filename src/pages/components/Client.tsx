export interface ClientProps {
  clientName: string;
  hourOrder: string;
}

export default function Client(props: ClientProps) {
  return (
    <li className="w-full my-2">
      <div className="flex w-full justify-between">
        <span>{props.clientName}</span>
        <span>{props.hourOrder}</span>
      </div>
      <hr />
    </li>
  );
}
