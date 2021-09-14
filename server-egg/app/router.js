'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,jwt,jsonp} = app;
  router.get('/', controller.home.index);
  //-----user
  //register
  router.post('/register', controller.user.register);
  //login
  router.post('/login', controller.user.login);
  //updatePwd
  router.put('/updatePwd', controller.user.updatePwd);
  //test user
  router.post('/getUser',jwt, controller.user.getUser);
  //获取用户所有信息
  router.post('/getUsers',jwt, controller.user.getUsers);
  //删除用户信息
  router.delete('/deleteUsers',jwt,controller.user.deleteUsers)
  //编辑用户信息
  router.post('/editUsers',jwt,controller.user.updateUsers)


  //---------部门
  //获取部门基本数据
  router.post('/dept',jwt, controller.dept.getDept);

  //----------菜单管理
  router.post('/nav',jwt,controller.nav.getNav);
  router.post('/editNav',jwt,controller.nav.updateNav);
  router.delete('/deleteNav',jwt,controller.nav.deleteNav);
  //h5
  router.post('/h5-nav',controller.nav.getNav);
  //===菜单列表
  router.post('/navList',jwt,controller.nav.getNavList);
  router.post('/editList',jwt,controller.nav.updateList);

};
