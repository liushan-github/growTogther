// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/Welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/ours',
              name: 'our',
              icon: 'crown',
              authority: ['admin'],
              routes: [
                {
                  path: '/ours/you',
                  name: 'you',
                  icon: 'smile',
                  component: './our/you',
                  authority: ['admin'],
                },
                {
                  path: '/ours/me',
                  name: 'me',
                  icon: 'smile',
                  component: './manager/Admin',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './manager/Admin',
                  authority: ['admin'],
                },
                {
                  path: '/admin/userManager',
                  name: 'user-page',
                  icon: 'smile',
                  component: './manager/userManager',
                  authority: ['admin'],
                },
                {
                  path: '/admin/deptManager',
                  name: 'dept-page',
                  icon: 'smile',
                  component: './manager/deptManager',
                  authority: ['admin'],
                },
                {
                  path: '/admin/navManager',
                  name: 'nav-page',
                  icon: 'smile',
                  component: './manager/navManager',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: '搜索列表（项目）',
              icon: 'smile',
              path: '/list',
              component: './ListTableList/List',
            },
            {
              name: 'three(3D)',
              icon: 'smile',
              path: '/three',
              component: './three',
            },
            {
              path: '/editor',
              name: 'editor',
              icon: 'crown',
              authority: ['admin'],
              routes: [
                {
                  path: '/editor/text',
                  name: 'textEditor',
                  icon: 'smile',
                  component: './Editor/text',
                  authority: ['admin'],
                },
              ],
            },
            // {
            //   name: '查询表格',
            //   icon: 'smile',
            //   path: '/listtablelist',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },

          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
