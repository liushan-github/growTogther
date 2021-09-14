import request from '@/utils/request';
import {url} from "@/utils/baseUrl";

export async function query(params:object): Promise<any> {
  return request(url+'/dept',{
    method:'POST',
    data:params
  });
}

// export async function queryCurrent(): Promise<any> {
//   return request('/api/currentUser');
// }
//
// export async function queryNotices(): Promise<any> {
//   return request('/api/notices');
// }
//
// export async function getUser(params:object): Promise<any> {
//   return request(url+'/getUser',{
//     method:'POST',
//     data:params
//   });
// }
