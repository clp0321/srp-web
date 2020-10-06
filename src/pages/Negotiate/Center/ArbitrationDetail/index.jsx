import { useState } from 'react';
import { Button, Card, Typography, Divider, Tabs, Progress, List, Avatar, message } from 'antd';
import { LikeOutlined, DislikeOutlined, RollbackOutlined, UserOutlined } from '@ant-design/icons';
import vsIcon from '@/assets/images/VS.png';
import moment from 'moment';
import style from './style.less';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// 用户头像
const avatarColor = ['#1890ff', '#ff4d4f'];

// 用户头像
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

// 双方陈词
const mockData = [
  {
    role: 0,
    applicate: true,
    content:
      '申请退租金，原因：所租房屋设备老旧，与所述商品实物不符合，金额：每月2000元，说明：卖家存在欺诈消费者行为，希望得到严惩',
    picList: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601988134969&di=ab031c692ef135503c5c27b95377ead9&imgtype=0&src=http%3A%2F%2Fimgs0.soufunimg.com%2Fnews%2F2018_03%2F22%2F1521707406983.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4281306082,1826106912&fm=15&gp=0.jpg',
    ],
    time: moment(new Date()).day(-5).hour(10).seconds(23).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    role: 1,
    applicate: false,
    content: '房屋出租图片已经描述得很清楚了，我并不没有欺诈消费者',
    picList: [],
    time: moment(new Date()).day(-2).hour(23).seconds(31).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    role: 0,
    applicate: true,
    content:
      '这完全是在狡辩，无法让人信服，你可对比出租时的照片和我实拍的照片，这完全就是一种恶劣的欺骗行为',
    picList: [],
    time: moment(new Date()).day(-1).format('YYYY-MM-DD hh:mm:ss'),
  },
];

// 投票
const data = [
  {
    name: '大清123',
    applicate: true,
    time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    name: '山路十八弯',
    applicate: true,
    time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    name: 'daddarececfewcf',
    applicate: false,
    time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    name: '昵称真难起',
    applicate: true,
    time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  },
];

const NegoDetail = () => {
  const [visible, setVisible] = useState(true);
  const [choose, setChoose] = useState(null);
  const handleStandBy = (choose) => {
    message.success('感谢您参与投票');
    setChoose(choose);
    setVisible(false);
  };
  return (
    <div className={style.arbitration}>
      <Card title="仲裁详情" extra={<Button icon={<RollbackOutlined />}>返回</Button>}>
        <Title level={3}>评审中....</Title>
        <Paragraph strong>租房遇到"租金与合同争议"问题，申请房东退款当月房租2000元</Paragraph>
        <Divider />
        <div className={style.btnList}>
          {visible ? (
            <>
              <Button
                type="primary"
                size="large"
                shape="round"
                icon={<LikeOutlined />}
                onClick={() => handleStandBy(true)}
              >
                支持租客
              </Button>
              <Button
                type="danger"
                size="large"
                shape="round"
                icon={<DislikeOutlined />}
                onClick={() => handleStandBy(false)}
              >
                支持房东
              </Button>
            </>
          ) : (
            <div className={style.progressVs}>
              <Text strong className={style.left}>
                8 人支持房东
              </Text>
              <img src={vsIcon} height="30" />
              <Text strong className={style.right}>
                13 人支持租客
              </Text>
              <Progress
                className={style.progress}
                percent={100}
                success={{ percent: 30 }}
                showInfo={false}
              />
              <Text className={style.i_choose}>您支持了 {choose ? '租客' : '房东'}</Text>
            </div>
          )}
        </div>
      </Card>
      <Card className={style.arb_con}>
        {/* 双方陈词 */}
        <Tabs defaultActiveKey="1">
          <TabPane key="1" tab="双方陈词">
            <List
              itemLayout="horizontal"
              dataSource={mockData}
              renderItem={(item) => (
                <List.Item extra={[<Text>{item.time}</Text>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: item.role === 0 ? avatarColor[0] : avatarColor[1],
                        }}
                      >
                        {item.role === 0 ? '租客' : '房东'}
                      </Avatar>
                    }
                    title={
                      <Text strong>
                        {item.role === 0
                          ? `租客 ${item.applicate ? '发起了申请' : '修改了申请'}`
                          : item.role === 1
                          ? '房东 拒绝申请'
                          : null}
                      </Text>
                    }
                    description={
                      <div>
                        {item.content}
                        <div className={style.pic_list}>
                          {item.picList.map((item) => {
                            return <img src={item} height={100} alt="房屋冲裁图片" />;
                          })}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          {/* 投票记录 */}
          <TabPane key="2" tab="投票记录">
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item extra={[<Text>{item.time}</Text>]}>
                  <List.Item.Meta avatar={<Avatar icon={<UserOutlined />} />} title={item.name} />
                  <Text strong className={style.vote}>
                    投出
                    {item.applicate ? (
                      <Text className={style.agree}>支持票</Text>
                    ) : (
                      <Text className={style.disagree}>反对票</Text>
                    )}
                  </Text>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default NegoDetail;
