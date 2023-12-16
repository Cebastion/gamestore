export interface IRangePrice {
  RangePrice?: number[];
  SetRangePrice: React.Dispatch<React.SetStateAction<number[] | undefined>>;
}