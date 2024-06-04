import { PhoneAndroidOutlined } from "@mui/icons-material";
import { ServiceBase } from "./service-base";

export interface Order {
    id: string;
    customer_id: string;
    order_date: string;
    status: string;
    total: {
      raw: number;
      formatted_with_symbol: string;
    };
  }
export interface Customer {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };

  export class CustomerService extends ServiceBase{
    static getCustomers=async()=>{
        var response=await fetch(this.getUrl('/customers'),{
          method:'GET',
          headers:{
            "X-Authorization": "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
            }
        });
        var customers=await response.json();
        return customers.data;
       }
      
       static async getCustomerOrders(customerId: string): Promise<Order[]> {
        const response = await fetch(this.getUrl(`/customers/${customerId}/orders`), {
          headers: {
            'X-Authorization':"sk_test_562131f3246a60865812dc1185be849cb00736b012448",
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        return data.data; 
      }

      static async deleteCustomer(customerId: string) {
        try {
          const response = await fetch(this.getUrl(`/customers/${customerId}`), {
            method: 'DELETE',
            headers:{
              "X-Authorization": "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
              }
          });
          return response.ok;
        } catch (error) {
          console.error('Error deleting customer:', error);
          throw error;
        }
      };
     
      static async editCustomer(customerId: string, customer: Partial<Customer>): Promise<void>{
        const response = await fetch(this.getUrl(`/customers/${customerId}`), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "X-Authorization": "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
          },
          body: JSON.stringify(customer),
        });
        if (!response.ok) {
          throw new Error('Failed to edit customer');
        }
        return response.json();
      }


      static async fetchCustomerById(id: string){
        const response = await fetch(this.getUrl(`/customers/${id}`), {
          headers: {
            'X-Authorization':"sk_test_562131f3246a60865812dc1185be849cb00736b012448" ,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch customer');
        }
        const data = await response.json();
        return data;
      };
      static addNewCustomer=async(firstname:string,lastname:string,email:string,phone:string)=>{
        try {
          const response = await fetch(this.getUrl('/customers/'), {
            method: 'POST',
            headers: {
              'X-Authorization': "sk_test_562131f3246a60865812dc1185be849cb00736b012448",
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstname:firstname,
              lastname:lastname,
              email:email,
              phone:phone
            }),
          });
          const data=await response.json();
          return data;
      } catch(error){
          console.error("error adding new product:",error);
      }
      };  
    };