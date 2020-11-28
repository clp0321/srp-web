/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/users': {
      target: 'http://202.193.60.4:8989',
      changeOrigin: true,
      pathRewrite: {
        '/users': '',
      },
    },
    '/user': {
      target: 'http://202.193.60.4:8989',
      changeOrigin: true,
    },
    '/back': {
      target: 'http://202.193.60.4:8989',
      changeOrigin: true,
      pathRewrite: {
        '/back': '',
      },
    },
    '/deviceManagement': {
      target: 'http://debug.locksuiyi.com',
      changeOrigin: true
    },
    '/crossing': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '/crossing': ''
      }
    }
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: false,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
