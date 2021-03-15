import { AxiosResponse } from 'axios';
import {instance} from './axios.service'

export interface LoggedUser {
    id: number;
    firstName: string;
    lastName: string;
    picture: string;
    token: string;
}

export function LoginException(message) {
    this.message = message;
    this.name = "LoginException";
 }

export async function login(username: string, password: string) : Promise<LoggedUser> {
     return await instance.post('api-token-auth/',{username, password})
    .then( (response: AxiosResponse )=> {return response.data})
}

export async function register(first_name: string, last_name: string, email: string, 
    password1: string, password2: string, picture: File) : Promise<string> {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);
    formData.append("picture", picture);
    return await instance.post('dj-rest-auth/registration/', formData)
        .then( (response: AxiosResponse) => { return response.data['key']})
}