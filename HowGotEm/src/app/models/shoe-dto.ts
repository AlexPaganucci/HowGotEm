import { SizeDto } from "./size-dto";

export interface ShoeDto {
  model: string,
  skuCode: string,
  brand: string,
  color: string,
  sizes: SizeDto[],
  urlImg: string,
  urlImg2: string,
  urlImg3: string,
  bestSeller: boolean
}
