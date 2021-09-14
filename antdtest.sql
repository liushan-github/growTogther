/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : antdtest

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 14/09/2021 17:11:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `deptName` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '部门名称',
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `step` int(0) NOT NULL COMMENT '部门层级',
  `pid` int(0) NULL DEFAULT NULL COMMENT '部门所属id',
  `createdTime` datetime(0) NOT NULL,
  `lastModifiedTime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('test1', 1, 0, NULL, '2020-09-16 15:33:11', '2020-09-30 15:33:17');
INSERT INTO `dept` VALUES ('test2', 2, 1, 1, '2020-09-10 15:33:21', '2020-09-30 15:33:25');
INSERT INTO `dept` VALUES ('test3', 3, 2, 2, '2020-09-17 15:33:30', '2020-09-10 15:33:33');
INSERT INTO `dept` VALUES ('test4', 4, 2, 2, '2020-09-11 15:33:36', '2020-09-15 15:33:40');

-- ----------------------------
-- Table structure for nav
-- ----------------------------
DROP TABLE IF EXISTS `nav`;
CREATE TABLE `nav`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createdTime` datetime(0) NULL DEFAULT NULL,
  `lastModifiedTime` datetime(0) NULL DEFAULT NULL,
  `code` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of nav
-- ----------------------------
INSERT INTO `nav` VALUES (1, 'ui库', '2021-04-09 15:27:42', '2021-04-09 15:27:46', 'ui001');
INSERT INTO `nav` VALUES (5, '组件库', '2021-04-16 16:20:06', '2021-04-16 16:20:06', 'comp');
INSERT INTO `nav` VALUES (6, '文档', '2021-04-16 16:31:11', '2021-04-16 16:31:11', 'docm');
INSERT INTO `nav` VALUES (7, '图标库', '2021-04-16 16:33:30', '2021-04-16 16:33:30', 'icon');
INSERT INTO `nav` VALUES (8, '图表库', '2021-04-16 16:43:53', '2021-04-16 16:43:53', 'chart');
INSERT INTO `nav` VALUES (9, '工具库', '2021-04-16 16:57:12', '2021-04-16 16:57:12', 'tool');
INSERT INTO `nav` VALUES (10, '参考文档', '2021-04-21 11:13:00', '2021-04-21 11:13:00', 'cons');
INSERT INTO `nav` VALUES (11, '导航资源', '2021-07-16 14:12:29', '2021-07-16 14:12:29', 'dhzy');

-- ----------------------------
-- Table structure for navlist
-- ----------------------------
DROP TABLE IF EXISTS `navlist`;
CREATE TABLE `navlist`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `navId` int(0) NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createdTime` datetime(0) NULL DEFAULT NULL,
  `lastModifiedTime` datetime(0) NULL DEFAULT NULL,
  `dsc` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of navlist
-- ----------------------------
INSERT INTO `navlist` VALUES (1, '百度', 1, 'http://www.baidu.com', '2021-04-16 13:38:50', '2021-04-16 13:38:54', NULL);
INSERT INTO `navlist` VALUES (3, 'ant-design', 5, 'https://ant.design/components/overview-cn/', '2021-04-16 16:22:00', '2021-04-16 16:22:00', NULL);
INSERT INTO `navlist` VALUES (4, 'sequelize中文', 6, 'https://www.sequelize.com.cn/', '2021-04-16 16:31:54', '2021-04-16 16:31:54', NULL);
INSERT INTO `navlist` VALUES (5, 'iconfont', 7, 'https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2', '2021-04-16 16:33:47', '2021-04-16 16:33:47', NULL);
INSERT INTO `navlist` VALUES (6, '踏得网', 1, 'https://techbrood.com/', '2021-04-16 16:37:00', '2021-04-16 16:37:00', NULL);
INSERT INTO `navlist` VALUES (7, 'color模板', 1, 'http://color.oulu.me/', '2021-04-16 16:41:01', '2021-04-16 16:41:01', '一个集合180种免费的线性渐变网站.');
INSERT INTO `navlist` VALUES (8, '寻图标', 7, 'https://icon.52112.com/', '2021-04-16 16:43:04', '2021-04-16 16:43:04', '最多样化的图标库');
INSERT INTO `navlist` VALUES (9, 'echarts', 8, 'https://echarts.apache.org/zh/index.html', '2021-04-16 16:45:30', '2021-04-16 16:45:30', '一个基于 JavaScript 的开源可视化图表库');
INSERT INTO `navlist` VALUES (10, 'easyicon', 7, 'https://www.easyicon.net/', '2021-04-16 16:48:59', '2021-04-16 16:48:59', '简易icon');
INSERT INTO `navlist` VALUES (11, 'earth', 8, 'http://www.earthsdk.com/', '2021-04-16 16:54:42', '2021-04-16 16:54:42', '基于cesium开源免费三维地球二次开发包');
INSERT INTO `navlist` VALUES (12, 'html2canvas', 9, 'http://html2canvas.hertzen.com/', '2021-04-16 16:57:36', '2021-04-16 16:57:36', 'Screenshots with JavaScript');
INSERT INTO `navlist` VALUES (13, 'Font Awesome', 7, 'https://fontawesome.dashgame.com/', '2021-04-16 17:00:43', '2021-04-16 17:00:43', '一套绝佳的图标字体库和CSS框架');
INSERT INTO `navlist` VALUES (14, 'freeIcon', 7, 'https://iconstore.co/', '2021-04-16 17:06:03', '2021-04-16 17:06:03', 'Free Icons by First-Class Designers');
INSERT INTO `navlist` VALUES (15, 'icon Ninja', 7, 'https://www.iconninja.com/', '2021-04-16 17:07:51', '2021-04-16 17:07:51', NULL);
INSERT INTO `navlist` VALUES (16, 'cloudcharts', 8, 'https://cloud-charts.gitee.io/', '2021-04-16 17:14:41', '2021-04-16 17:14:41', '面向业务 简洁高效 只为让图表使用更简单');
INSERT INTO `navlist` VALUES (17, '中国色', 1, 'http://zhongguose.com/', '2021-04-16 17:18:54', '2021-04-16 17:18:54', '中国传统颜色');
INSERT INTO `navlist` VALUES (18, 'web安全色', 1, 'https://www.bootcss.com/p/websafecolors/', '2021-04-16 17:20:00', '2021-04-16 17:20:00', 'web安全色');
INSERT INTO `navlist` VALUES (19, 'css技巧', 6, 'https://lhammer.cn/You-need-to-know-css/#/', '2021-04-16 17:20:55', '2021-04-16 17:20:55', 'CSS tricks web developers need to know');
INSERT INTO `navlist` VALUES (20, '基本动画函数', 1, 'https://easings.net/#', '2021-04-16 17:21:54', '2021-04-16 17:21:54', NULL);
INSERT INTO `navlist` VALUES (21, 'css-doodle', 1, 'https://css-doodle.com/', '2021-04-16 17:22:53', '2021-04-16 17:22:53', '炫酷css动画');
INSERT INTO `navlist` VALUES (22, 'element jquery中文文档', 6, 'https://jquery.cuishifeng.cn/index.html', '2021-04-19 09:35:49', '2021-04-19 09:35:49', NULL);
INSERT INTO `navlist` VALUES (23, 'easyui', 1, 'https://www.jeasyui.net/', '2021-04-19 09:36:21', '2021-04-19 09:36:21', NULL);
INSERT INTO `navlist` VALUES (24, 'vue官方文档', 1, 'https://cn.vuejs.org/', '2021-04-19 09:39:04', '2021-04-19 09:39:04', NULL);
INSERT INTO `navlist` VALUES (25, 'egg', 1, 'https://eggjs.org/zh-cn/', '2021-04-19 09:39:57', '2021-04-19 09:39:57', NULL);
INSERT INTO `navlist` VALUES (26, 'charts', 1, 'https://v-charts.js.org', '2021-04-19 09:44:31', '2021-04-19 09:44:31', '基于 Vue2.0 和 echarts 封装的 v-charts 图表组件');
INSERT INTO `navlist` VALUES (27, 'taro', 1, 'http://taro-docs.jd.com/taro/docs/README', '2021-04-19 09:45:38', '2021-04-19 09:45:38', '基于 Vue2.0 和 echarts 封装的 v-charts 图表组件，只需要统一提供一种对前后端都友好的数据格式设置简单的配置项，便可轻松生成常见的图表。');
INSERT INTO `navlist` VALUES (28, '地理json数据', 9, 'https://github.com/TangSY/echarts-map-demo', '2021-04-19 09:46:50', '2021-04-19 09:46:50', 'echarts地图geoJson行政边界数据的实时获取与应用');
INSERT INTO `navlist` VALUES (29, 'webpack指南', 6, 'https://segmentfault.com/a/1190000006178770', '2021-04-19 10:46:12', '2021-04-19 10:46:12', '入门 Webpack，看这篇就够了');
INSERT INTO `navlist` VALUES (30, '图形报表', 6, 'https://blog.csdn.net/zhu_tianwei/article/details/18656459', '2021-04-19 10:47:23', '2021-04-19 10:47:23', '常用的web前端框架 --- 图形报表');
INSERT INTO `navlist` VALUES (31, 'RESETful API 设计规范', 6, 'https://segmentfault.com/a/1190000017371628?utm_source=tag-newest', '2021-04-19 10:47:58', '2021-04-19 10:47:58', 'RESTful 是目前最流行的 API 设计规范，用于 Web 数据接口的设计');
INSERT INTO `navlist` VALUES (32, 'easymock部署', 6, 'https://juejin.cn/post/6844903984944136206', '2021-04-19 11:28:11', '2021-04-19 11:28:11', '在自己的vps上愉快地玩耍easy-mock');
INSERT INTO `navlist` VALUES (33, '现代javascript', 6, 'https://zh.javascript.info/', '2021-04-19 11:29:38', '2021-04-19 11:29:38', '以最新的 JavaScript 标准为基准。通过简单但足够详细的内容，为你讲解从基础到高阶的 JavaScript 相关知识。');
INSERT INTO `navlist` VALUES (34, 'css浏览器兼容', 9, 'https://caniuse.com/#tables', '2021-04-19 11:30:43', '2021-04-19 11:30:43', 'Can I use css');
INSERT INTO `navlist` VALUES (35, 'webstorm ide 破解码', 9, 'http://idea.medeming.com/jetbrains/', '2021-04-19 11:31:50', '2021-04-19 11:31:50', '');
INSERT INTO `navlist` VALUES (36, '廖雪峰官方学习站', 6, 'https://www.liaoxuefeng.com/', '2021-04-21 11:00:35', '2021-04-21 11:00:35', NULL);
INSERT INTO `navlist` VALUES (37, '语雀-前端小册', 6, 'https://www.yuque.com/robinson/fe-guide', '2021-04-21 11:03:22', '2021-04-21 11:03:22', '这里主要介绍除了前端三大件之外的前端常识，希望能帮助到大家');
INSERT INTO `navlist` VALUES (38, '解决webstorm因为node_modules卡顿', 9, 'https://blog.csdn.net/GreyBearChao/article/details/79806070', '2021-04-21 11:11:32', '2021-04-21 11:11:32', NULL);
INSERT INTO `navlist` VALUES (39, 'node和deno', 10, 'https://zhuanlan.zhihu.com/p/37647644', '2021-04-21 11:13:41', '2021-04-21 11:13:41', '对于NodeJS感到后悔的7件事');
INSERT INTO `navlist` VALUES (40, 'idea永久激活', 9, 'https://shimo.im/docs/3VVqYD8v93RCGPpq/read', '2021-04-21 11:14:42', '2021-04-21 11:14:42', NULL);
INSERT INTO `navlist` VALUES (41, '前端100问', 10, 'https://juejin.cn/post/6844903885488783374', '2021-04-21 11:15:13', '2021-04-21 11:15:13', NULL);
INSERT INTO `navlist` VALUES (42, 'api', 9, 'https://api.imjad.cn/', '2021-04-21 11:27:18', '2021-04-21 11:27:18', '目前系统收录了 6 条 api');
INSERT INTO `navlist` VALUES (43, '高手工具', 9, 'http://c.p2hp.com/', '2021-04-21 11:28:37', '2021-04-21 11:28:37', NULL);
INSERT INTO `navlist` VALUES (44, '翻牌器', 6, 'https://www.cnblogs.com/guchengnan/p/11984168.html', '2021-04-21 13:38:00', '2021-04-21 13:38:00', '干货满满!如何优雅简洁地实现时钟翻牌器(支持JS/Vue/React)');
INSERT INTO `navlist` VALUES (45, 'api1', 9, 'https://github.com/mixmoe/HibiAPI', '2021-04-21 13:54:04', '2021-04-21 13:54:04', 'Imjad API 的迭代');
INSERT INTO `navlist` VALUES (46, 'react可拖拽网格布局', 9, 'https://github.com/Bilif/react-drag-grid', '2021-04-21 13:55:35', '2021-04-21 13:55:35', NULL);
INSERT INTO `navlist` VALUES (47, '站酷', 1, 'https://www.zcool.com.cn/home', '2021-04-21 13:56:39', '2021-04-21 13:56:39', '设计师互动平台');
INSERT INTO `navlist` VALUES (48, '前端面试指导', 6, 'http://caibaojian.com/interview-map/frontend/', '2021-04-21 14:00:02', '2021-04-21 14:00:02', NULL);
INSERT INTO `navlist` VALUES (49, '码笔网', 1, 'https://animpen.com/', '2021-04-21 14:02:04', '2021-04-21 14:02:04', NULL);
INSERT INTO `navlist` VALUES (50, '图片背景消除', 9, 'https://www.remove.bg/zh', '2021-04-21 16:37:46', '2021-04-21 16:37:46', '100% 全自动且免费');
INSERT INTO `navlist` VALUES (51, '稿定抠图工具', 9, 'https://www.uupoop.com/#/', '2021-04-21 16:38:50', '2021-04-21 16:38:50', NULL);
INSERT INTO `navlist` VALUES (52, '在线工具', 9, 'https://tool.lu/', '2021-04-21 16:39:20', '2021-04-21 16:39:20', NULL);
INSERT INTO `navlist` VALUES (53, '图片压缩', 9, 'https://tinypng.com/', '2021-04-21 16:39:39', '2021-04-21 16:39:39', NULL);
INSERT INTO `navlist` VALUES (54, '编辑器', 9, 'https://monaco-react.surenatoyan.com/', '2021-04-21 16:40:12', '2021-04-21 16:40:12', NULL);
INSERT INTO `navlist` VALUES (55, 'nginx操作', 10, 'https://www.linuxprobe.com/open-close-restart.html', '2021-04-21 16:41:10', '2021-04-21 16:41:10', 'nginx 开启、关闭、重启常用操作');
INSERT INTO `navlist` VALUES (56, 'idea操作技巧和tomcat集成', 10, 'https://www.linuxprobe.com/open-close-restart.html', '2021-04-21 16:42:10', '2021-04-21 16:42:10', NULL);
INSERT INTO `navlist` VALUES (57, 'egg.js部署到服务器', 10, 'https://blog.csdn.net/qq_37162688/article/details/95192461', '2021-04-21 16:42:39', '2021-04-21 16:42:39', NULL);
INSERT INTO `navlist` VALUES (58, 'antd-simple-pro', 5, 'http://blog.lgf196.top/ant-simple-pro-document/', '2021-07-16 14:10:39', '2021-07-16 14:10:39', '简洁，美观，快速上手，支持3大框架，typescript');
INSERT INTO `navlist` VALUES (59, '码力全开', 11, 'https://design.maliquankai.com/', '2021-07-16 14:13:39', '2021-07-16 14:13:39', '专注互联网好产品，让热爱不止于想象');
INSERT INTO `navlist` VALUES (60, 'echarts组件库', 8, 'https://www.makeapie.com/explore.html', '2021-07-16 14:17:56', '2021-07-16 14:17:56', 'echarts的用户作品');
INSERT INTO `navlist` VALUES (61, '分享你我', 11, 'http://tool.majh.top/', '2021-07-16 14:20:40', '2021-07-16 14:20:40', '线上优秀资源宝藏');
INSERT INTO `navlist` VALUES (62, 'webstorm快捷键', 6, 'https://www.cnblogs.com/gkl2013/p/7201589.html', '2021-07-16 14:26:40', '2021-07-16 14:26:40', '');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userName` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pwd` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` enum('0','1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `deptId` int(0) NULL DEFAULT NULL,
  `deptName` varchar(38) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '刘山', 'e10adc3949ba59abbe56e057f20f883e', '0', 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', 3, 'test3');
INSERT INTO `user` VALUES (45, 'test', 'e10adc3949ba59abbe56e057f20f883e', '1', NULL, NULL, NULL);
INSERT INTO `user` VALUES (46, 'user1111', 'e10adc3949ba59abbe56e057f20f883e', '1', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
