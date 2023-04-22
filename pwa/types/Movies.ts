import { Item } from "./item";

export class Movies implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public title?: string,
    public rentalRate?: number,
    public category?: string[],
    public rating?: string
  ) {
    this["@id"] = _id;
  }
}
