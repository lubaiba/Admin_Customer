export abstract class ServiceBase{
    static API_URL="https://api.chec.io/v1";
    static getUrl(path:string){
       return `${this.API_URL}${path}`;
    }
     
 }