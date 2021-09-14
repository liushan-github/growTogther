'use strict';

const md5 = require('blueimp-md5');
const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author lius
 */
class UserService extends Service {
  async register(userName, pwd,status) {
    const isRegistered= await this.app.mysql.get('user', { userName});
    if(!isRegistered){
      return await this.app.mysql.insert('user', { userName, pwd: md5(pwd),status });
    }else{
     return {affectedRows:-1}
    }
  }
  async login(userName, pwd) {
    return await this.app.mysql.get('user', { userName, pwd: md5(pwd) });
  }
  async updatePwd(params){
    return await this.app.model.User.updatePwd({
      ...params
    })
  }
  async getUser(params) {
    return await this.app.mysql.get('user',params);
  }
  async getUsers() {
    return await this.app.mysql.select('user');
  }
  async deleteUsers(params){
    return await this.app.mysql.delete('user',params);
  }
  async updateUsers(params){
    return await this.app.mysql.update('user',params,{where: {id:params.id}});
  }
}

module.exports = UserService;
