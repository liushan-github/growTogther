'use strict';

module.exports = app => {
  const { STRING,  UUIDV1, ENUM,INTEGER,DATE} = app.Sequelize;

  return {
    id: {
      type: INTEGER(38),
      allowNull: false,
      primaryKey: true,
      // unique:true,
      autoIncrement: true,
    },
    code:{
      type: STRING(20),
      allowNull: false,
      unique: true,
    },
    name: {
      type: STRING(36),
      allowNull: false,
      unique: true,
    },
    lastModifiedTime: {
      type: DATE,
      allowNull: false,
    },
    createdTime: {
      type: DATE,
      allowNull: false,
    },
    // version: {
    //   type: BIGINT,
    //   defaultValue: 0,
    // },
  };
};
