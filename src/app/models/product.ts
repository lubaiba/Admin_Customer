export interface Product {
    id?: string;
    name: string;
    price: {
      raw:number;
    }
    image?: {
      url: string;
    };
    description: string;
  }
  