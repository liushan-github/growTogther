'use strict'
module.exports=(app)=>{
  const {model}=app;
  const navSchema = require('../schema/nav.js', {
    timestamps: false,
    freezeTableName: true,
  })(app);
  const Nav = model.define('nav', navSchema);
  const schema = require('../schema/navlist.js')(app);
  const NavList = model.define('navlist', schema);
  NavList.belongsTo(Nav,{ foreignKey: 'navId' ,targetKey: 'id'});
  NavList.get = async (params) => {
    return await NavList.findAll({
      raw: true,
      where:{navId:params.id},
      attributes: { exclude: ['createdTime'] }
    });
  };
  NavList.update=async (params)=>{
    await NavList.create({
      ...params,
    })
  }
  return NavList;
};
