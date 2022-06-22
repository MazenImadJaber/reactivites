import axios, {  AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../Models/activity";
import { store } from "../stores/store";

const sleep=(delay:number) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';
const responseBody = <T>( response: AxiosResponse<T>) => response.data;
axios.interceptors.response.use(async response =>{
 
        await sleep(1000);
        return response;    
},(error : AxiosError) => {
    const {data , status, config} = error.response!;
    const data1 = data as any;
    switch(status) {
        case 400:
            if(typeof data === "string" ){
                toast.error(data1);
            }
            if(config.method === 'get' && data1.errors.hasOwnProperty('id')){
                history.push('/not-found')
            }
            if(data1.errors ){
                const modelStateErrors = [];
                for(const key in data1.errors){
                    if(data1.errors[key]){
                        modelStateErrors.push(data1.errors[key])
                    }
                }
                throw modelStateErrors.flat();

            }
       
            break;
        case 401:
            toast.error('unauthoraised');
            break;
        case 404:
           history.push('/not-found')
            break;    
        case 500:
        
            store.commonStore.setServerError(data1)
            history.push('/server-error')
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get:  <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string,body: {}) => axios.post<T>(url,body).then(responseBody),
    put:  <T> (url: string,body: {}) => axios.put<T>(url,body).then(responseBody),
    del:  <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities ={
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities',activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`,activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}
export default agent;