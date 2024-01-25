export namespace Order {
  export type Status = "created" | "approved";

  export type Item = {
    productName: string;
    quantity: number;
  };

  export interface Props {
    readonly id: string;
    clientName: string;
    address: string;
    paymentMethod: string;
    phone: string;
    items: Item[];
    note: string;
    status?: Status;
    createdAt?: Date;
  }
}

export class Order {
  public readonly id: string;
  public clientName: string;
  public address: string;
  public paymentMethod: string;
  public phone: string;
  public items: Order.Item[] = [];
  public note: string = "";
  public status?: Order.Status = "created";
  private _createdAt: Date;

  constructor(props: Order.Props) {
    Object.assign(this, props);
  }

  set createdAt(date: Date) {
    this._createdAt = new Date(date);
  }

  get createdAt() {
    return this._createdAt;
  }

  values(): Order.Props {
    return {
      address: this.address,
      clientName: this.clientName,
      id: this.id,
      items: this.items,
      note: this.note,
      paymentMethod: this.paymentMethod,
      phone: this.phone,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
