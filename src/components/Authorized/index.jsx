import Authorized from './Authorized'; // 组件形态，返回dom结构，调用check
import Secured from './Secured'; // 安全机制， 权限->view， 调用check
import check from './CheckPermissions';  // 检查权限，返回组件 target | exception
import renderAuthorize from './renderAuthorize'; // 返回Authorized，绑定当前CURRENT

Authorized.Secured = Secured;
Authorized.check = check;
const RenderAuthorize = renderAuthorize(Authorized);
export default RenderAuthorize;

// 初始化路由组件及重载路由组件