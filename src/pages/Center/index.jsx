import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Layout, Menu, Typography } from 'antd';
import style from './style.less';
import { Setting, Security, NewMessage } from './component';

const { Sider, Content } = Layout;
const { Title } = Typography;

const baseList = ['基本设置', '安全设置', '新消息通知'];

const Center = () => {
  const [curKey, setKey] = useState('1');
  const [title, setTitle] = useState('基本设置');
  const handleChange = (key, title) => {
    setKey(key);
    setTitle(title);
  };
  let content;
  switch (curKey) {
    case '1':
      content = <Setting />;
      break;
    case '2':
      content = <Security />;
      break;
    case '3':
      content = <NewMessage />;
      break;
    default:
      content = <Setting />;
  }

  return (
    <PageContainer>
      <Layout className={style.menu}>
        <Sider width={200}>
          <Menu mode="inline" defaultSelectedKeys={[curKey]} style={{ height: '100%' }}>
            {baseList.map((item, index) => {
              return (
                <Menu.Item key={`${index + 1}`} onClick={() => handleChange(`${index + 1}`, item)}>
                  {item}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Content className={style.content}>
          <Title level={4} className={style.h4}>
            {title}
          </Title>
          {content}
        </Content>
      </Layout>
    </PageContainer>
  );
};

export default Center;
