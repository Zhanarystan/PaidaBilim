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

    addData = async (data, url) => {
        console.log(data);
        const response = await fetch(`${this._apiBase}/${url}`,{
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        let newData = null;

        if(response.status === 200){
            newData = await response.json();
        }
        return newData;
    }

    getAllUsers = async () => {
        const res = await this.getResource('/users');
        return res;
    }

    getAllCategories = async () => {
        const res = await this.getResource('/category');
        return res;
    }

    getAllSubCategories = async () => {
        const res = await this.getResource('/subcategory');
        return res;
    }

    getAllCourses = async () => {
        const res = await this.getResource('/course');
        return res;
    }

    getCategory = async (categoryId) => {
        const res = await this.getResource(`/category/${categoryId}`);
        return res;
    }

    getSubcategory = async (subcategoryId) => {
        const res = await this.getResource(`/subcategory/${subcategoryId}`);
        return res;
    }

    getCourse = async (courseId) => {
        const res = await this.getResource(`/course/${courseId}`);
        return res;
    }

    getAllLanguages = async () => {
        const res = await this.getResource('/language');
        return res;
    }

    getLanguage = async (languageId) => {
        const res = await this.getResource(`/language/${languageId}`);
        return res;
    }

    getLearningSkills = async (courseId) => {
        const res = await this.getResource(`/course/${courseId}/skills`);
        return res; 
    }

    getUserByUsername = async (username) => {
        const res = await this.getResource(`/users/searchbyusername/${username}`);
        return res;
    }

}