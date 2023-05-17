import {axiosInstance} from './axiosInstance';

export class BaseNetwork {
  async getAll(url: string) {
    let response: any = {};

    try {
      response= await axiosInstance.get(url)
    } catch (error) {
      throw error;
    }

    return response.data;
  }

  async getById(url: string, id: number) {
    let response = {};

    await axiosInstance.get(url + id).then(res => {
      response = res.data;
    });

    return response;
  }
}
