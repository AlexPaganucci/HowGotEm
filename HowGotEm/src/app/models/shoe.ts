export interface Shoe {
  id: number,
  model: string,
  skuCode: string,
  brand: string,
  color: string,
  sizes: Size[],
  urlImg: string,
  urlImg2: string,
  urlImg3: string,
  bestSeller: boolean,
}

export interface Size {
  id: number,
  size: number,
  quantityAvailable: number,
  price: number,
  shoeId: number
}
