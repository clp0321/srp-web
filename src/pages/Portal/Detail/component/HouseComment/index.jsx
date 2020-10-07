import { Space, List, Rate, Typography, Comment, Tooltip, Avatar, Pagination, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import style from './style.less';

const { Text, Paragraph } = Typography;

// 用户评价mock
const commentMock = [
  {
    actions: [<span key="comment-list-reply-to-0">回复</span>],
    author: '邹*清',
    avatar: <Avatar style={{ backgroundColor: '#f56a00' }}>Z</Avatar>,
    content: <p>住了2天，比较方便，适合拍照。房间东西多</p>,
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">回复</span>],
    author: '罗*寸',
    avatar: <Avatar style={{ backgroundColor: '#7265e6' }}>L</Avatar>,
    content: (
      <p>
        位置非常好找，服务很热情，房间装修的和图片上一样，没有差别，而且房间卫生打扫得特别干净，床也很舒服，性价比很高～满意
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">回复</span>],
    author: '相*奎',
    avatar: <Avatar style={{ backgroundColor: '#00a2ae' }}>X</Avatar>,
    content: <p>房间的风格是我超级喜欢的风格， 而且房东的态度超级好</p>,
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">回复</span>],
    author: '刘*刚',
    avatar: <Avatar style={{ backgroundColor: 'green' }}>Liu</Avatar>,
    content: (
      <p>
        房东人挺好，首先打电话给我们确定了到的时间，提前把微信加好，给我们发了酒店位置，酒店蛮好找的，房间装修风格我特别喜欢，简约型的，超大的一个投影，躺床上看看电影不要太舒服，交通也挺便利，去春熙路太古里天府广场就10来分钟的样子！楼下的陈麻婆豆腐强烈推荐，里面的菜真的蛮好吃的，我们连续去吃了两天，不愧为网红店，早点去，晚了还要排队！在这还要特别特别谢谢房东给我们规划去玩的路线，介绍各种好吃的店，时间排的满满当当，还有好多好玩的地方这次没时间去了，等下次有机会在来成都玩，肯定还选择这里
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

const HouseComment = () => {
  return (
    <div className={style.comment}>
      {/* 专家点评 */}
      <div className={style.com_con}>
        <div className={style.com_rate}>
          <Space>
            <Text strong style={{ fontSize: 16 }}>
              综合评分:
            </Text>
            <Rate count={5} defaultValue={4.6} />
            <Text strong style={{ fontSize: 16 }}>
              4.6分
            </Text>
          </Space>
          <div className={style.rate}>
            <Space size="large">
              <Text>整洁评分: 4.8分</Text>
              <Text>管理评分: 4.6分</Text>
              <Text>交通位置: 4.4分</Text>
              <Text>设施装修: 4.8分</Text>
            </Space>
          </div>
        </div>
        <div className={style.com_expert}>
          <Text className={style.point}>专家解读</Text>
          <div className={style.expert}>
            <Avatar
              icon="user"
              size="large"
              src="http://pic1.ajkimg.com/display/anjuke/71c556578eaabd1a88620303ce711310/120x159x0x0/100x133.jpg"
              size={50}
              className={style.expert_avatar}
            />
            <Text size={10}>乐有家地产</Text>
          </div>
          <div className={style.expert_say}>
            <Paragraph>
              <Tag color="#87d068">特色</Tag>
              <Text>小区内部有个小花园老人健身场所，儿童游乐中心。业主茶余饭后可以过来散散步</Text>
            </Paragraph>
            <Paragraph>
              <Tag color="#f50">不足</Tag>
              <Text>小区楼龄有点久，靠近马路上下班高峰期有些吵</Text>
            </Paragraph>
          </div>
        </div>
      </div>

      {/* 房屋评论 */}
      <List
        header={<Text className={style.user_comment}>{commentMock.length} 条租客评论</Text>}
        itemLayout="horizontal"
        dataSource={commentMock}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
      <Pagination total={50} size={10} className={style.pagination} />
    </div>
  );
};
export default HouseComment;
