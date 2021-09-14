'use strict';
const Controller = require('../core/com_controller');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { userName,password,status} = ctx.request.body;
    if(userName&&password&&status){
      const data= await ctx.service.user.register(userName, password,status);
      if(data.affectedRows === 1){
        this.success(data,200,'注册成功')
      }else if(data.affectedRows === -1){
        this.registerFail(99,'该账户已被占用')
      }else{
        this.fail(99,'填写信息有误')
      }
    }else{
      this.fail(99,'填写信息有误')
    }
  }
  async login() {
    const { ctx } = this;
    const { userName, pwd } = ctx.request.body;
    if(userName&&pwd){
      const data= await ctx.service.user.login(userName, pwd);
      if(data){
        const token=ctx.setToken(data);
        this.successAndToken(data,200,token)
      }else{
        this.fail(99,'填写信息有误')
      }
    }
  }
  async updatePwd() {
    const { ctx } = this;

  }
  async getUser() {
    const { ctx } = this;
    const data= await ctx.service.user.getUser(ctx.request.body);
    this.success(data)
  }
  async getUsers() {
    const { ctx } = this;
    const data= await ctx.service.user.getUsers();
    const datas={data,total:data.length}
    this.success(datas)
  }
  async deleteUsers() {
    const { ctx } = this;
    const da=ctx.request.body;
    let data;
    if(Array.isArray(da)){
      for(let i of da.id){
        data= await ctx.service.user.deleteUsers({id:da.id[i]});
      }
      }else{
      data= await ctx.service.user.deleteUsers({id:da.id});
    }
    if(data.affectedRows >= 1){
      this.success(data,200,'删除成功')
    }else{
      this.fail(data,200,'删除失败')
    }
  }
  async updateUsers() {
    const { ctx } = this;
    const data= await ctx.service.user.updateUsers(ctx.request.body);
    if(data.affectedRows === 1){
      this.success(data,200,'编辑成功')
    }else{
      this.fail(data,200,'编辑失败')
    }
  }
}

module.exports = UserController;
