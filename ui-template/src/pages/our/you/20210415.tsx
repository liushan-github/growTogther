import React from "react";

export default () => {
  return (
    <>
      <p>2021-4-15</p>
      <p>(1).链式调用，解决obj&&obj.t&&t.d ，方式obj?.t?.d</p>
      <p>(2).class私有属性，用#号</p>
      <p>(3).函数闭包</p>
      <p>(4).空位操作符：a??b，解决a||b和a?a:b当a是0，false,''假值问题
        <br/> let c = a ?? b;
        <br/>// 等价于let c = a !== undefined && a !== null ? a : b;
      </p>
    </>
  )
}
