export interface IError {
  Error?: number[];
  SetError: React.Dispatch<React.SetStateAction<boolean>>;
}