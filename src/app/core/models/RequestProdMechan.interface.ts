import { IMechanic } from "./Mechanic.interface";
import { IProduct } from "./Product.interface";

export interface IRequestProdMechan {
  RequestsId: number;
  Mechanics: IMechanic[];
  Products: IProduct[];
}
