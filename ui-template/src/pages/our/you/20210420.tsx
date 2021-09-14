import React from "react";

export default () => {
  return (
    <>
      <p>2021-4-20</p>
      <p>(1).Sequelize 一对多关联(详看注释)。
      {/*Nav.hasMany(NavList,{ 'foreignKey': 'navId',targetKey: 'id', as:'childrens'});  */}
      {/*return await Nav.findAll({*/}
     {/*attributes: { exclude: ['createdTime'] },*/}
     {/* include: [{*/}
     {/*  model: NavList,*/}
     {/* //  as:'childrens'*/}
     {/* }]*/}
    });</p>
      <p>(2).ant-mobile listView如何重新定位滚动body(待解决)</p>
      <p>(3).mysql文件注入linux MySQL数据库
        1. 连接mysql
        mysql  -u用户名  -p密码
        2. 连接你要导入的数据库的名字
        mysql> use  数据库名
        3. 导入sql文件
        mysql> source  /tmp/database.sql;
      </p>
    </>
  )
}
