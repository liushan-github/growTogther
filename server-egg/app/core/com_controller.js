const { Controller } = require('egg');

/**
 * BaseController
 * @class
 * @author lius
 */
class com_Controller extends Controller {
  successAndToken(data, status,token) {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data,token:token };
    this.ctx.status = status || 200;
  }

  success(data,status,message){
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data,message };
    this.ctx.status = status || 200;
  }

  fail(code, message) {
    this.ctx.body = { code, message, data: {} };
    this.ctx.status = 404;
  }

  registerFail(code, message) {
    this.ctx.body = { code, message, data: {} };
  }
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }

}
module.exports = com_Controller;
