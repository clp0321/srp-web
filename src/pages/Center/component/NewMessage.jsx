import { useState } from 'react';
import { List, Typography, Switch } from 'antd';

const { Text } = Typography;

const securityOpt = [
  {
    title: '系统消息',
    desc: '系统消息将以站内信的形式通知',
  },
  {
    title: '用户消息',
    desc: '用户消息将以站内信的形式通知',
  },
  {
    title: '待办任务',
    desc: '待办任务将以站内信的形式通知',
  },
];

const NewMessage = () => {
  return (
    <>
      <List
        dataSource={securityOpt}
        renderItem={(item) => (
          <List.Item actions={[<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />]}>
            <List.Item.Meta
              title={item.title}
              description={<Text style={{ fontSize: 16 }}>{item.desc}</Text>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default NewMessage;
