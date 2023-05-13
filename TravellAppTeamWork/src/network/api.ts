import {axiosInstance} from './axiosInstance';

export class BaseNetwork {
  async getAll(url: string) {
    let response: any[] = [];

    try {
      await axiosInstance.get(url).then(res => {
        response = res.data;
      });
    } catch (error) {
      throw error;
    }

    return response;
  }

  async getById(url: string, id: number) {
    let response = {};

    await axiosInstance.get(url + id).then(res => {
      response = res.data;
    });

    return response;
  }
}
