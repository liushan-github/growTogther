'use strict'
const  utils=require('../utils');
module.exports=(app)=>{
  const {model}=app;
  const navSchema = require('../schema/nav.js')(app);
  const Nav = model.define('nav', navSchema);
  const schema = require('../schema/navlist.js')(app);
  const NavList = model.define('navlist', schema);
  Nav.hasMany(NavList,{ foreignKey: 'navId',targetKey: 'id', as:'childrens'});

  Nav.get = async () => {
    return await Nav.findAll({
      attributes: { exclude: ['createdTime'] },
      include: [{
        model: NavList,
        as:'childrens'
      }]
    });
  };
  Nav.update=async (params)=>{
    await Nav.create({
      ...params,
    })
  }
  Nav.delete=async (params)=>{
    const id = utils.toInt(params.id);
    const d= await Nav.findByPk(id);
    if(!d){
      return 0
    }else{
      await d.destroy();
      return 1
    }
  }
  return Nav;
};
