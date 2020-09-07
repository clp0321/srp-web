import React from 'react';
import { Card } from 'antd';
import style from './style.less';

// 工单mock数据
const workMock = [
  {
    num: 0,
    title: '代签约',
  },
  {
    num: 0,
    title: '预约',
  },
  {
    num: 0,
    title: '报修',
  },
  {
    num: 0,
    title: '保洁',
  },
  {
    num: 0,
    title: '预定',
  },
  {
    num: 0,
    title: '带交割',
  },
];
// 审批
const auditMock = [
  {
    num: 0,
    title: '合同',
  },
  {
    num: 0,
    title: '流水',
  },
  {
    num: 0,
    title: '优惠',
  },
  {
    num: 0,
    title: '退租',
  },
  {
    num: 0,
    title: '抄表',
  },
];

// 容器组件
const Contain = ({ num, title }) => (
  <ul>
    <li>{num}</li>
    <li>{title}</li>
  </ul>
);

const WorkOrderList = workMock.map((item, index) => {
  return <Contain key={index} num={item.num} title={item.title} />;
});

const AuditList = auditMock.map((item, index) => {
  return <Contain key={index} num={item.num} title={item.title} />;
});

const Audit = () => {
  return (
    <div className={style.audit}>
      <Card title="工单" className={style.card_gongdan}>
        <div className={style.gondan}>{WorkOrderList}</div>
      </Card>
      <Card title="审批" className={style.card_audit}>
        <div className={style.gondan}>{AuditList}</div>
      </Card>
    </div>
  );
};
export default Audit;
