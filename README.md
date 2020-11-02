# 基于 5G 物联的区块链共享房屋租赁平台

> 基于 5G、物联网以及区块链技术，为租客、房东打造一个交易费用低廉、房源信息真实、违约纠纷少、租务管理智能的可信租赁管理平台。 本仓库为项目前端源代码仓库，基于[React.JS](https://reactjs.org/)开发，使用[Ant Design Pro](https://pro.ant.design)企业级前端/设计解决方案。

## 所需运行环境

- [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)
- [node.js](https://nodejs.org/en/) 
- [git](https://git-scm.com/downloads)

## 启动前准备

### 克隆项目

```
git clone git@gitee.com:guet_srp/srp-web.git
```

### 安装项目依赖

```
yarn install
```

## 执行脚本

### 启动

```
yarn start
```

### 项目打包

```
yarn build
```

## 目录结构

```
├─ srp-web/
│   ├─ config/                                 # 前端配置文件
│   │   ├─ config.js                           # 基础启动配置、路由
│   │   ├─ defaultsetting.js                   # 默认设置项
│   │   ├─ proxy.js                            # 代理配置
│   ├─ dist/                                   # 模拟数据和接口，本地开发使用
│   ├─ images/                                 # 项目依赖
│   ├─ mock/                                   # 模拟数据和接口，本地开发使用
│   ├─ node_modules/                           # 项目依赖
│   ├─ public/                                 # 项目公共图标、图片
│   ├─ script/                                 # 中间服务（与物联网设备跨域通信）
│   ├─ src/                                    # 核心代码目录
│   │   ├─ umi/                                # umi默认项
│   │   ├─ assets/                             # 静态资源存储目录
│   │   ├─ components/                         # 业务通用组件
│   │   ├─ e2e/                                # 集成测试用例
│   │   ├─ layout/                             # 通用布局
│   │   ├─ locales/                            # 国际化资源
│   │   ├─ models/                             # 全局dva model（数据层）
│   │   ├─ pages/                              # 核心页面目录（视图层）
|   |   |     |── Center/                      # 个人中心
|   |   |     |── Contract/                    # 合同
|   |   |     |── Entry/                       # 登入注册
|   |   |     |── Equipment/                   # 设备
|   |   |     |── ListTables/                  # 本地列表
|   |   |     |── Negotiate/                   # 协商仲裁
|   |   |     |── Order/                       # 订单
|   |   |     |── Portal/                      # 网站门户
|   |   |     |── Property/                    # 房源
|   |   |     |── Reservation/                 # 预约
|   |   |     |── User/                        # 用户
|   |   |     |── Welcome/                     # 系统首页
│   │   ├─ services/                           # 后头接口服务（服务层）
│   │   ├─ utils/                              # 工具库目录
│   │   ├─ global.js                           # 全局JS
│   │   ├─ global.less                         # 全局样式
│   ├─ test/                                   # 测试工具
```

## 项目截图

> **门户首页**
![门户首页](./images/home.png)

> **搜房找房**
![搜房找房](./images/search.png)

> **房源详情**
![房源详情](./images/detail.png)

> **房源记录&认证评级**
![房源记录&认证评级](./images/list_comment.png)

> **租屋管理**
![租屋管理](./images/rent.png)

> **信息溯源**
![信息溯源](./images/trace.png)
