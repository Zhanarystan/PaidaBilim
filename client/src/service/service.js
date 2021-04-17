export default class ApiService {
    
    constructor(){
        this._apiBase = 'https://localhost:5001/api'
    }

    getResource = async (url) => {
        console.log(`${this._apiBase}${url}`);
        const res = await fetch(`${this._apiBase}${url}`, {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
            //   "Authentication": this.jwtToken 
            }
        });

        if(!res.ok){
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }

        return await res.json();
    }

    getAllUsers = async () => {
        const res = await this.getResource('/users');
        
        return res;
    }

    getAllCategories = async () => {
        const res = await this.getResource('/categories');
        
        return res;
    }

}