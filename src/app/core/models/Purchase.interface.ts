export interface IPurchase{
	id: number;
	purchasePrice:  number;
	salePrice:  number;
	quantity:  number;
	description: string;
  code : string;
  datePurchase : string;
  productId: number;
  supplierId: number;
}
