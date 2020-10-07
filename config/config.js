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
      path: '/srp',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/srp',
          component: '../layouts/PortalLayout',
          routes: [
            {
              path: '/srp',
              redirect: '/srp/welcome',
            },
            {
              path: '/srp/welcome',
              component: './Portal/Welcome',
            },
            {
              path: '/srp/rent',
              component: './Portal/Rent',
            },
            {
              path: '/srp/detail',
              component: './Portal/Detail',
            },
            {
              path: '/srp/release',
              component: './Portal/Release',
            },
            {
              path: '/srp/blockmessage',
              component: './Portal/BLockMessage',
            },
            {
              component: './404',
            },
          ],
        },
      ],
    },
    {
      path: '/client',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/client',
          component: '../layouts/EntryLayout',
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
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['landlord', 'tenant', 'supervisor'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/monitor',
              component: './Dashboard',
              authority: ['landlord'],
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
              authority: ['landlord'],
              routes: [
                {
                  path: '/property',
                  redirect: '/property/release',
                },
                {
                  name: 'release',
                  path: '/property/release',
                  component: './Property/Release',
                },
                {
                  name: 'manage',
                  path: '/property/manage',
                  component: './Property/Manage',
                },
              ],
            },
            {
              name: 'equipment',
              icon: 'database',
              path: '/equipment',
              authority: ['landlord'],
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
              authority: ['landlord', 'tenant'],
              routes: [
                {
                  path: '/order',
                  redirect: '/order/statistics',
                },
                {
                  name: 'statitics',
                  path: '/order/statistics',
                  component: './Order/Statistics',
                },
                {
                  name: 'manage',
                  path: '/order/manage',
                  component: './Order/Manage',
                },
              ],
            },
            {
              name: 'contract',
              icon: 'file-text',
              path: '/contract',
              authority: ['landlord', 'tenant'],
              routes: [
                {
                  path: '/contract',
                  redirect: '/contract/create',
                },
                {
                  name: 'create',
                  path: '/contract/create',
                  component: './contract/Create',
                },
                {
                  name: 'manage',
                  path: '/contract/manage',
                  component: './contract/manage',
                },
              ],
            },
            {
              name: 'negotiate',
              icon: 'message',
              path: '/negotiate',
              authority: ['landlord', 'tenant'],
              routes: [
                {
                  name: 'manage',
                  path: '/negotiate/manage',
                  component: './Negotiate/Manage',
                },
                {
                  name: 'center',
                  path: '/negotiate/center',
                  component: './Negotiate/Center',
                },
              ],
            },
            {
              name: 'reservation',
              icon: 'phone',
              path: '/reservation',
              component: './Reservation',
              authority: ['landlord', 'tenant'],
            },
            {
              name: 'user.manage',
              icon: 'pic-center',
              path: '/manage',
              component: './User',
              authority: ['landlord'],
            },
            {
              name: 'person',
              icon: 'user',
              path: '/account',
              component: './Center',
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
