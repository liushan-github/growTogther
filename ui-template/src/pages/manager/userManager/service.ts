import request from "@/utils/request";
import {urlConcat} from '@/utils/utils';
import {url} from '@/utils/baseUrl'
export async function fetchData(): Promise<any> {
  return request(url+'/getUsers',{
    method:'POST'
  });
}

export async function searchTable(params:any): Promise<any> {
  const url=urlConcat('/api/classManager',params);
  return request(url);
}

export async function editUsers(params:object): Promise<any> {
  return request(url+'/editUsers',{
    method:'POST',
    data:params
  });
}

export async function deleteUsers(params:{id:number|Array<string>}): Promise<any> {
  return request(url+'/deleteUsers',{
    method:'DELETE',
    data: {
      id: params.id,
    },
  });
}
