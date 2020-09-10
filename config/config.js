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
              path: '/monitor',
              name: 'monitoring',
              icon: 'dashboard',
              component: './Dashboard'
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
              name: 'property',
              icon: 'bank',
              path: '/property',
              routes: [
                {
                  path: '/property',
                  redirect: '/property/release',
                },
                {
                  name: 'property.release',
                  path: '/property/release',
                  component: './Property/Release',
                },
                {
                  name: 'property.onchain',
                  path: '/property/onchain',
                  component: './Property/Onchain',
                },
                {
                  name: 'property.offchain',
                  path: '/property/offchain',
                  component: './Property/Offchain',
                },
              ],
            },
            {
              name: 'equipment',
              icon: 'database',
              path: '/equipment',
              routes: [
                {
                  path: '/equipment',
                  redirect: '/equipment/water_meter',
                },
                {
                  name: 'lock',
                  path: '/equipment/lock',
                  component: './Equipment/Lock',
                },
                {
                  name: 'water_meter',
                  path: '/equipment/water_meter',
                  component: './Equipment/WaterMeter',
                },
              ],
            },
            {
              name: 'order',
              icon: 'account-book',
              path: '/order',
              // component: './Order',
              routes: [
                {
                  path: '/order',
                  redirect: '/order/statistics'
                },
                {
                  name: 'statitics',
                  path: '/order/statistics',
                  component: './Order/Statistics'
                },
                {
                  name: 'manage',
                  path: '/order/manage',
                  component: './Order/Manage'
                }
              ]
            },
            {
              name: 'contract',
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
              component: './Center'
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
