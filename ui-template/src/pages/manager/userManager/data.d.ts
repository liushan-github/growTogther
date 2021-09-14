export interface TableData {
  id:number,
  userName: string,
  pwd: string,
  status: 0 | 1 | 2, // 身份：1代表管理员，0代表普通身份，2代表游客
  avatar: string, // 头像
  deptName: string,
}
