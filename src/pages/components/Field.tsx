interface FieldProps {
  title: string;
  value: string;
}

export default function Field(props: FieldProps) {
  return (
    <div className="text-[#967466] flex flex-col !text-sm gap-1 overflow-hidden">
      <b>{props.title}</b>
      <span className="whitespace-pre-wrap">{props.value || "-"}</span>
    </div>
  );
}
