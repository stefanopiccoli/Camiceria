import { User as FirebaseUser, UserCredential } from "firebase/auth";

export interface Collar {
  _id: string;
  name: string;
  buttons?: number;
  imageUrl: string;
}

export interface Fabric {
  _id: string;
  name: string;
  color?: string;
  imageUrl: string;
}

export interface Cuff {
  _id: string;
  name: string;
  imageUrl: string;
}

export interface Sign {
  do: boolean | "unselected";
  text: string;
  font?: "italic" | "capitalized";
}

export interface Measure {
  neck: number;
  shoulder: number;
  chest: number;
  hips: number;
  sleeve: number;
}

export type StepNavigation =
  | "collar"
  | "fabric"
  | "cuff"
  | "sign"
  | "measure"
  | "summary";

export interface Selection {
  loading: boolean;
  step: StepNavigation;
  collar: Collar;
  fabric: Fabric;
  cuff: Cuff;
  sign: Sign;
  measure: Measure;
}

export interface Cart {
  loading: boolean;
  customShirts: CustomShirt[];
}


export interface CustomShirt {
  _id?: string;
  collar: Collar;
  fabric: Fabric;
  cuff: Cuff;
  sign: Sign;
  measure: Measure;
}

export interface Shirt {
  price: number;
}

export interface Order {
  _id: string;
  date: Date;
  articles: {
    customShirts: CustomShirt[];
  };
  state: "pending" | "shipped" | "delivered" | "canceled";
  price: number;
  shipment: {
    name: string;
    address : string;
    city: string;
    province: string;
    cap: string;
  }
}

export interface User {
  user: FirebaseUser | null;
  token: string | null;
}

export interface UserMDB {
  _id: string;
  username: string;
  email: string;
  role: string;
  orders: Order;
}

// export const collett: Collar[] = [
//   { _id: "1", name: "Button down Rubino", buttons: 1 },
//   { _id: "2", name: "Button down Rubino", buttons: 2 },
//   { _id: "3", name: "Button down Notoli", buttons: 2 },
//   { _id: "4", name: "Classico", buttons: 2 },
//   { _id: "5", name: "Classico abbassato 0,5", buttons: 1 },
//   { _id: "6", name: "Classico abbassato", buttons: 1 },
//   { _id: "7", name: "Classico Anticoli", buttons: 1 },
//   { _id: "8", name: "Classico Camiciaio", buttons: 1 },
//   { _id: "9", name: "Coreana", buttons: 1 },
//   { _id: "10", name: "Francese", buttons: 2 },
//   { _id: "11", name: "Francese aperto", buttons: 1 },
//   { _id: "12", name: "Francese", buttons: 1 },
//   { _id: "13", name: "Mezzo Francese", buttons: 1 },
// ];

// export const fabric: Fabric[] = [
//   { _id: "101", name: "Lana" },
//   { _id: "102", name: "Seta" },
//   { _id: "103", name: "Blu" },
// ];

// export const cuff: Cuff[] = [
//   { _id: "1001", name: "Polso gemello" },
//   { _id: "1002", name: "Polso tondo" },
//   { _id: "1003", name: "Polso asola per gemello" },
//   { _id: "1004", name: "Polso smussato" },
// ];
