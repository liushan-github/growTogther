/**
 *
 * @Description 处理数据表树结构数据
 * @param
 * @return
 */
'use strict';
const Service = require('egg').Service;
class ToolService extends Service {
    buildTree(data) {
    const res = [];
    // 找出所有根节点
    for (let item of data) {
      if (!item.pid) {
        item.children = getNode(item.id);
        res.push(item);
      }
    }

    // 传入根节点id 递归查找所有子节点
    function getNode(id) {
      const node = [];
      for (const item of data) {
        if (item.pid === id) {
          item.children = getNode(item.id);
          node.push(item);
        }
      }
      if (node.length === 0) return;
      return node;
    }

    return res;
  }
}
module.exports = ToolService;
