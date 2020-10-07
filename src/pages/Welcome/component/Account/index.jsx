import React from 'react';
import { Statistic, Badge, Divider } from 'antd';
import style from './style.less';
import grandUrl from '@/assets/images/grand.png';
import protectUrl from '@/assets/images/protect.png';

const Account = () => {
  return (
    <div className={style.account}>
      <Statistic
        value={5967.21}
        precision={2}
        valueStyle={{ fontSize: 30, fontWeight: 'bold' }}
        title="账户金额"
        prefix="￥"
      />
      <div className={style.guarante}>
        <img src={protectUrl} height={24} /> 资金保障
      </div>
      <div className={style.income}>
        <Badge status="success" /> 今日收支 ￥0.00
        <Badge color="#108ee9" /> 昨日收支 ￥0.00
      </div>
      <Divider className={style.divider} />
      <p>
        <img src={grandUrl} height={18} />
        <span className={style.total}>近30天累计收支 ￥5,682.25</span>
      </p>
    </div>
  );
};
export default Account;
