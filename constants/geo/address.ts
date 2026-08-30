import { Country, TState } from '@constants/geo/geo';

export interface IAddress {
  street: string;
  city: string;
  state: TState | string;
  zipCode: string;
  country: Country;
}
