import React from 'react';
import {
  FormOutlined,
  SearchOutlined,
  FileSearchOutlined,
  ToolOutlined,
  WalletOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Divider, Tooltip } from 'antd';
import { Link } from 'umi';
import style from './style.less';

const ModuleEntry = () => {
  return (
    <div className={style.moduleEntry}>
      <ul>
        <li>
          <Tooltip title="点击录入房源信息" placement="bottom">
            <Link to="/">
              <FormOutlined /> 房源录入
            </Link>
          </Tooltip>
        </li>
        <li>
          <Divider type="vertical" />
        </li>
        <li>
          <Tooltip title="托管房源、轻松便捷" placement="bottom">
            <Link to="/">
              <SearchOutlined /> 寻找代理
            </Link>
          </Tooltip>
        </li>
        <li>
          <Divider type="vertical" />
        </li>
        <li>
          <Tooltip title="智能化、自动化管理房屋" placement="bottom">
            <Link to="/">
              <ToolOutlined /> 设备绑定
            </Link>
          </Tooltip>
        </li>
        <li>
          <Divider type="vertical" />
        </li>
        <li>
          <Tooltip title="区块链保障,信息真实可信" placement="bottom">
            <Link to="/">
              <FileSearchOutlined /> 合同查询
            </Link>
          </Tooltip>
        </li>
        <li>
          <Divider type="vertical" />
        </li>
        <li>
          <Tooltip title="每月收支流水记录完善" placement="bottom">
            <Link to="/">
              <WalletOutlined /> 查看订单
            </Link>
          </Tooltip>
        </li>
        <li>
          <Divider type="vertical" />
        </li>
        <li>
          <Tooltip title="丰富个人信息" placement="bottom">
            <Link to="/">
              <UserOutlined /> 个人中心
            </Link>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};
export default ModuleEntry;
