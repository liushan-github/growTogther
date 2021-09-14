import request from 'umi-request';
import { UserRegisterParams } from './index';
import {url} from "@/utils/baseUrl";

export async function fakeRegister(params: UserRegisterParams) {
  console.log(params)
  return request(url+'/register', {
    method: 'POST',
    data: params,
  });
}
