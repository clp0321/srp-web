import React from 'react';
import { Divider } from 'antd';
import style from './style.less';

// mock数据
const data = [
  {
    title: '财务',
    children: [
      {
        title: '房租',
        con: '29笔（42356.67元）近30天房租欠款',
      },
      {
        title: '水电煤',
        con: '48笔（16328.58元）近30天水电煤欠款',
      },
      {
        title: '未来三天',
        con: '4笔（1575.00元）账单等待收款',
      },
    ],
  },
  {
    title: '销售',
    children: [
      {
        title: '预约',
        con: '无新预约需查看',
      },
      {
        title: '预定',
        con: '无预定待处理',
      },
      {
        title: '来电',
        con: '暂无来电',
      },
    ],
  },
  {
    title: '租约',
    children: [
      {
        title: '登记',
        con: '5间已租房源等待录入租约',
      },
      {
        title: '续租',
        con: '2个租约即将到期等待续租',
      },
      {
        title: '租客问题',
        con: '15间房源等待退房处理',
      },
    ],
  },
  {
    title: '其他',
    children: [
      {
        title: '照片',
        con: '5间空置房源无照片，将无法进行展示',
      },
      {
        title: '业主',
        con: '无房源等待录入业主',
      },
      {
        title: '报修',
        con: '1笔报修待处理',
      },
      {
        title: '未来三天',
        con: ' 暂无问题处理',
      },
    ],
  },
];

const InnerItem = ({ data }) => {
  const { children } = data;
  const dlList = children.map((item, index) => {
    return (
      <dl key={index}>
        <dt>{item.title}</dt>
        <dd>{item.con}</dd>
      </dl>
    );
  });
  return (
    <div className={style.contain_item}>
      <Divider className={style.divider} type="vertical" /> <span>{data.title}</span>
      {dlList}
    </div>
  );
};

const Contains = data.map((item, index) => {
  return <InnerItem key={index} data={item} />;
});

const TodoList = () => {
  return <div className={style.contain}>{Contains}</div>;
};

export default TodoList;
