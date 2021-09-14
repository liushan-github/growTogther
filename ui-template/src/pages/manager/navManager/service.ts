import request from '@/utils/request';
import {url} from "@/utils/baseUrl";

export async function query(params:object): Promise<any> {
  return request(url+'/nav',{
    method:'POST',
    data:params
  });
}

export async function edit(params:object): Promise<any> {
  return request(url+'/editNav',{
    method:'POST',
    data:params
  });
}

export async function deleteNav({id}:{id:number}): Promise<any> {
  return request(url+'/deleteNav',{
    method:'DELETE',
    data: {
      id:id
    },
  });
}

export async function queryList(params:object): Promise<any> {
  return request(url+'/navList',{
    method:'POST',
    data:params
  });
}
export async function editList(params:object): Promise<any> {
  return request(url+'/editList',{
    method:'POST',
    data:params
  });
}
