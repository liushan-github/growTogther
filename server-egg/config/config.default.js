/* eslint valid-jsdoc: "off" */

'use strict';
const fecha = require('fecha');
const isNumber = require('lodash/isNumber');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1591667799074_9402';

  // add your middleware config here
  config.middleware = [];
  config.security={
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ]
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'antdTest',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    }
  }
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    // 用户名
    user: 'root',
    // 密码
    password: '123456',
    //端口
    port: 3306,
    // 数据库名
    database: 'antdTest',
    timezone: '+08:00',
    define: {
      createdAt: 'createdTime',
      updatedAt: 'lastModifiedTime',
      freezeTableName: true,
      underscored: false,
      getterMethods: {
        createdTime() {
          const createdTime = this.getDataValue('createdTime');
          if (createdTime) {
            return fecha.format(createdTime, 'YYYY-MM-DD HH:mm:ss');
          }
        },
        lastModifiedTime() {
          const lastModifiedTime = this.getDataValue('lastModifiedTime');
          if (lastModifiedTime) {
            return fecha.format(lastModifiedTime, 'YYYY-MM-DD HH:mm:ss');
          }
        },
      },
      // setterMethods: {
      //   version(value) {
      //     if (isNumber(value)) {
      //       this.setDataValue('version', value + 1);
      //     }
      //   },
      // },
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.jwt = {
    secret: "123456"//自定义 token 的加密条件字符串
  };
  return {
    ...config,
    ...userConfig,
  };
};
