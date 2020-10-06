import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card, List, Typography, Space, Pagination, Avatar, Button } from 'antd';
import { LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';
import moment from 'moment';
import style from './style.less';

const { TabPane } = Tabs;
const { Text } = Typography;

// mock全部
const allData = [
  {
    title: '求大家帮我看看，租金及租约明细问题，求支持！！！',
    watch: 260,
  },
  {
    title: '租赁合同存在严重纠纷，简直是霸王条款',
    watch: 234,
  },
  {
    title: '房屋质量太差，实物与图片相差较大，我住的是什么玩意！？？',
    watch: 135,
  },
  {
    title: '本人对服务商态度极为不满意！！！',
    watch: 356,
  },
  {
    title: '房屋里为何有蟑螂？',
    watch: 892,
  },
  {
    title: '天花板漏雨，环境太差，合同已签，很苦恼~',
    watch: 416,
  },
  {
    title: '本人住在龙岗村，准备换个新房住，租金希望在2000-3000之间，求大佬推荐',
    watch: 67,
  },
];

// mock热门
const hotData = [
  {
    title: '房屋里为何有蟑螂？',
    watch: 892,
  },
  {
    title: '微信不会，电话不接，房东老板给我玩失踪？',
    watch: 773,
  },
  {
    title: '房租这件事我一定要讨回一个公道',
    watch: 773,
  },
  {
    title: '太难了~~~这还是人住的房间么？房东你的良心不会痛么',
    watch: 700,
  },
];

// mock我的
const myData = [
  {
    title: '我要为我的房租讨一个公道',
    content:
      '我是去年六月来这边住房的，房租每个月都按时交，但是最近热水器发生问题了，打电话给房租，说安排人过来处理，但是都半个月了，还没有人来，打电话过去，说不急！！！我想大家为我作证！！！',
    like: 200,
    dislike: 120,
  },
];

// List组件
const ShowList = ({ data, name }) => {
  return (
    <>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item className={style.list_item}>
            <List.Item.Meta
              title={
                <div>
                  <Space size={10} className={style.space}>
                    <Text>
                      [{name}] {item.title}
                    </Text>
                    <Text type="secondary">（浏览量{item.watch}）</Text>
                  </Space>
                </div>
              }
            />
            <Text>{moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}</Text>
          </List.Item>
        )}
      />
      <Pagination total={23} size={10} className={style.pagination} />
    </>
  );
};

const StateText = ({ like, text }) => {
  return (
    <Space>
      {like ? (
        <div className={style.like}>
          <LikeTwoTone twoToneColor="#52c41a" /> 支持 {text} 人
        </div>
      ) : (
        <div className={style.dislike}>
          <DislikeTwoTone twoToneColor="red" /> 反对 {text} 人
        </div>
      )}
    </Space>
  );
};

const BtnRight = () => {
  return <Button type="primary">新建冲裁</Button>;
};

const Center = () => {
  return (
    <PageContainer>
      <Card className={style.negotiate}>
        <Tabs defaultActiveKey="3" tabBarExtraContent={<BtnRight />}>
          <TabPane key="1" tab="全部信息">
            <ShowList data={allData} name="全部信息" />
          </TabPane>
          <TabPane key="2" tab="热门冲裁">
            <ShowList data={hotData} name="热门冲裁" />
          </TabPane>
          <TabPane key="3" tab="我的冲裁">
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={myData}
              className={style.my_list}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <StateText
                      className={style.like}
                      like={true}
                      text={item.like}
                      key="list-vertical-star-o"
                    />,
                    <StateText
                      className={style.dislike}
                      like={false}
                      text={item.dislike}
                      key="list-vertical-like-o"
                    />,
                  ]}
                  extra={<img width={272} alt="冲裁图片" />}
                >
                  <List.Item.Meta title={item.title} />
                  {item.content}
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};
export default Center;
