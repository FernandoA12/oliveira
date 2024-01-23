export namespace Order {
  export type Item = {
    productName?: string;
    quantity?: string;
  };
  export interface props {
    clientName?: string;
    address?: string;
    phone?: string;
    paymentMethod?: string;
    productList?: Item[];
    note?: string;
    status?: "created" | "approved";
  }
}

export class Order {
  public clientName?: string;
  public address?: string;
  public phone?: string;
  public paymentMethod?: string;
  public productList?: Order.Item[];
  public note?: string;
  public status?: "created" | "approved" = "created";

  constructor(props: Order.props) {
    Object.assign(this, props);
  }
}
