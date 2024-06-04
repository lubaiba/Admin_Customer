export interface Product {
  id: string;
  name: string;
  price: {
    formatted_with_symbol:string;
  };
  image: {
    url: string;
  };
  description: string;
}

import { ServiceBase } from "./service-base";
export class ProductService extends ServiceBase {
  static getProducts = async () => {
    try {
      var productResp = await fetch(this.getUrl("/products"), {
        method: "GET",
        headers: {
          "X-Authorization":
            "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
        },
      });
      var products = await productResp.json();
      return products.data;
    } catch (error) {
      console.log("error occured", error);
    }
  };

  static async deleteProduct(productId: string) {
    try {
      const response = await fetch(this.getUrl(`/products/${productId}`), {
        method: "DELETE",
        headers: {
          "X-Authorization":
            "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  static async fetchProductById(id: string) {
    const response = await fetch(this.getUrl(`/products/${id}`), {
      headers: {
        "X-Authorization":
          "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  }

  static addNewProduct = async (
    name: string,
    price: number,
    description: string
  ) => {
    const productData={
      product:{
        name:name,
        price:price,
        description:description,
      }
    };
    try{
      const response = await fetch(this.getUrl('/products'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-Authorization":
          "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      return data;
    }catch(error){
      console.log("error adding new product:",error);
    }
  }

  static editProduct = async (
    productId:string,
    name: string,
    price: number,
    description: string
  ) => {
    const productData={
      product:{
        name:name,
        price:price,
        description:description,
      }
    };
    try{
      const response = await fetch(this.getUrl(`/products/${productId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "X-Authorization":
          "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      return data.data;
    }catch(error){
      console.log("error adding new product:",error);
    }
  }
}
