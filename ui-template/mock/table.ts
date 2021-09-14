import { Request, Response } from 'express';
import { parse } from 'url';
let tableListDataSource: TableItem[] = [];
for (let i = 0; i < 10000; i++) {
  tableListDataSource.push({
    key: i,
    name: `King ${i}`,
    age: 32,
    address: `London. ${i}`,
  });
}
// tableListDataSource= [
//   {
//     key: '1',
//     name: 'John',
//     age: 22,
//     address: 'xiamen',
//   },
//   {
//     key: '2',
//     name: 'Jim',
//     age: 31,
//     address: 'London',
//   },
//   {
//     key: '3',
//     name: 'Joe',
//     age: 46,
//     address: 'shangHai',
//   },
// ];
interface TableListParams {
  payload: any;
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
  params:{payload:string},
}
interface TableItem {
  key: string;
  age:number
  name: string;
  address:string;
}
function getTable(req: Request, res: Response, u: string){
  let url = u;

  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const params = (parse(url, true).query as unknown) as TableListParams;
  // let text={name:null};
  // if(params.name){
  //    text.name=params.name;
  // }
  let dataSource = tableListDataSource;
  if (params.name) {
    // @ts-ignore
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }
  return  setTimeout(() => {
           res.json(dataSource);
      }, 500);
}
function postTable(req: Request, res: Response, u: string, b: Request) {
  let url = u;

  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, age,address,key} = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = tableListDataSource.length+1;
      tableListDataSource.unshift({
        key: i.toString(),
        name: name,
        age:age,
        address:address,
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          return { ...item,name,age,address};
        }
        return item;
      });
      break;
    default:
      break;
  }

  return  setTimeout(() => {
    res.json(tableListDataSource);
  }, 500);
}
export default {
  'GET /table/test': getTable,
  'POST /table/test': postTable,
}
