import RenderAuthorize from '@/components/Authorized';

// const userLabel = ['tenant', 'landlord', 'agent', 'supervisor', 'platformer', 'superadmin'];

// 获取当前登录用户身份
let Authorized = RenderAuthorize(); // Reload the rights component

const reloadAuthorized = () => {
  Authorized = RenderAuthorize();
};

window.reloadAuthorized = reloadAuthorized;
export { reloadAuthorized };
export default Authorized;