import { useState } from 'react';
import { List, Typography } from 'antd';

const { Text } = Typography;

const securityOpt = [
  {
    title: '账户密码',
    desc: '当前密码强度',
    data: '强',
  },
  {
    title: '密保手机',
    desc: '已绑定手机',
    data: '138****8293',
  },
  {
    title: '备用邮箱',
    desc: '已绑定邮箱',
    data: 'ant***sign.com',
  },
];

const Secrity = () => {
  return (
    <>
      <List
        dataSource={securityOpt}
        renderItem={(item) => (
          <List.Item actions={[<a>修改</a>]}>
            <List.Item.Meta
              title={item.title}
              description={
                <Text style={{ fontSize: 16 }}>
                  {item.desc}: {item.data}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Secrity;
