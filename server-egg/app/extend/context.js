'use strict';

module.exports = {
  SUCCESS_CODE: 0, // 成功
  NO_LOGIN_CODE: 100, // 未登录
  UNIQUE_CODE: 200, // 唯一性冲突
  ERROR_CODE: 500, // 失败
  // 获取token
  getAccessToken() {
    return this.cookies.get('token', { signed: false });
  },
  setToken(data={}){
    const { app,ctx } = this;
    const token = app.jwt.sign({name:data.name,id:data.id}, app.config.jwt.secret, { expiresIn: '12h' });
    return token;
  },
  removeToken(){

  },
  async verifyToken(){

  }
}
