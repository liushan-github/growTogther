import request from '@/utils/request';
import {url} from "@/utils/baseUrl";

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request(url + '/login', {
    method: 'POST',
    data: {
      userName: params.userName,
      pwd: params.password,
    },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
