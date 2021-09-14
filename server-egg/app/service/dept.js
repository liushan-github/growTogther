'use strict';

const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author lius
 */
class DeptService extends Service {
  async getDept(params) {
    return await this.app.model.Dept.get();
  }

}

module.exports = DeptService;
