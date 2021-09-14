'use strict';
const Controller = require('../core/com_controller');

class UserController extends Controller {
  async getNav() {
    const { ctx } = this;
    const da=ctx.request.body;
    const data= await ctx.service.nav.getNav(da);
    this.success(data)
    // console.log(data)
    // this.success(ctx.service.tool.buildTree(data))
  }
  async updateNav() {
    const { ctx } = this;
    const data= await ctx.service.nav.updateNav(ctx.request.body);
    this.success(data,200,'编辑成功')
    // if(data.affectedRows === 1){
    //
    // }else{
    //   this.fail(data,200,'编辑失败')
    // }
  }
  async deleteNav() {
    const { ctx } = this;
    const da=ctx.request.body;
    const data= await ctx.service.nav.deleteNav({id:da.id});
    if(data === 1){
      this.success(data,200,'删除成功')
    }else{
      this.fail(data,200,'删除失败')
    }
  }
  //获取菜单列表
  async getNavList() {
    const { ctx } = this;
    const da=ctx.request.body;
    const data= await ctx.service.nav.getNavList(da);
    this.success(data)
    // console.log(data)
    // this.success(ctx.service.tool.buildTree(data))
  }
  //编辑新增菜单列表
  async updateList(){
    const { ctx } = this;
    const data= await ctx.service.nav.updateList(ctx.request.body);
    this.success(data,200,'编辑成功')
    // if(data.affectedRows === 1){
    //
    // }else{
    //   this.fail(data,200,'编辑失败')
    // }
  }
}
module.exports = UserController;
