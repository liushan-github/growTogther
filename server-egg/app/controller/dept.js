'use strict';
const Controller = require('../core/com_controller');

class UserController extends Controller {
  async getDept() {
    const { ctx } = this;
    const da=ctx.request.body;
    const data= await ctx.service.dept.getDept(da);
    console.log(data)
    this.success(ctx.service.tool.buildTree(data))
  }

}

module.exports = UserController;
