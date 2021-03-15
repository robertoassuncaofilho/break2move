import {AxiosResponse} from 'axios'
import {instance} from './axios.service'

export async function nextChallenge() : Promise<AxiosResponse> {
    try {
      return await instance.get('nextchallenge/');
    } catch (error) {
      console.error(error);
    }
  }
