import React from 'react';
import { Result } from 'antd';
import check from './CheckPermissions';
import { connect } from 'umi';

/**
 * 当前系统用身份
 * 0   租客        tenant
 * 1   房东        landlord
 * 2   代理商      agent
 * 3   监管方      supervisor
 * 4   平台方      platformer
 * 5   超级管理员  superadmin
 */

const Authorized = ({
  children,
  authority,
  noMatch = (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />
  ),
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
