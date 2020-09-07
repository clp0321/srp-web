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
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading/index',
  // },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/srp/welcome',
      name: 'welcome',
      component: './Portal/Welcome',
    },
    {
      path: '/srp/rent',
      name: 'rent',
      component: './Portal/Rent',
    },
    {
      path: '/client',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/client/logining',
          component: './Entry/Login',
        },
        {
          name: 'register',
          pathL: '/client/register',
          component: './Entry/Register',
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
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              name: 'property.manage',
              icon: 'bank',
              path: '/property',
              routes: [
                {
                  path: '/property',
                  redirect: '/property/release',
                },
                {
                  path: '/property/release',
                  name: 'property.release',
                  icon: 'smile',
                  component: './Property/Release',
                },
                {
                  name: 'property.list',
                  path: '/property/manage',
                  icon: 'smile',
                  component: './Property/Manage',
                },
              ],
            },
            {
              name: 'equipment.manage',
              icon: 'database',
              path: '/equipment',
              component: './Equipment',
            },
            {
              name: 'order.manage',
              icon: 'account-book',
              path: '/order',
              component: './Order',
            },
            {
              name: 'contract.manage',
              icon: 'file-text',
              path: '/contract',
              component: './Contract',
            },
            {
              name: 'user.manage',
              icon: 'user',
              path: '/manage',
              component: './User',
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
