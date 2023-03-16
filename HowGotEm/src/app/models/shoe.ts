export interface Shoe {
  id: number,
  model: string,
  skuCode: string,
  brand: string,
  color: string
}

export interface Size {
  id: number,
  size: number,
  quantityAvailable: number,
  price: number,
  shoe: Shoe
}
