export interface User {
  id: string | number;
  name: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}