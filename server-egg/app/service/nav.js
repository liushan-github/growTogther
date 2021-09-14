'use strict';

const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author lius
 */
class NavService extends Service {
  async getNav() {
    return await this.app.model.Nav.get();
  }
  async updateNav(params){
    return await this.app.model.Nav.update(params);
  }
  async deleteNav(params){
    return await this.app.model.Nav.delete(params);
  }
  async getNavList(params) {
    return await this.app.model.Navlist.get(params);
  }
  async updateList(params){
    return await this.app.model.Navlist.update(params);
  }
}

module.exports = NavService;
