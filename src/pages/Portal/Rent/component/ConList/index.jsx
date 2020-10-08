import { useState, useEffect } from 'react';
import { Tabs, Pagination, Button, Typography, Tag, Card } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import hotroom1 from '@/assets/images/hotroom1.jpg';
import hotroom2 from '@/assets/images/hotroom2.jpg';
import { getProperty } from '@/services/property';
import moment from 'moment';
import style from './style.less';

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const TagColor = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

const ConList = () => {
  const [visible, setVisible] = useState(true);
  const [propertyArr, setProperty] = useState([]);
  const [key, setKey] = useState('1');
  // 点击跳转至房源详情页
  const handleClick = (houseId) => {
    const w = window.open('about:blank');
    w.location.href = `/srp/detail?houseId=${houseId}`;
  };

  const HouseList = ({ data }) => {
    const { method, position, size, specify, updateTime, price, houseId, picUrl, btnList } = data;
    return (
      <Card
        hoverable
        bodyStyle={{ width: 800, display: 'flex' }}
        className={style.list_card}
        onClick={() => handleClick(houseId)}
      >
        <img src={picUrl} width="270" height="200" alt="房源图片" />
        <div className={style.mid_dec}>
          <Title level={4}>
            {method === 0 ? '整租' : '合租'} | {position}
          </Title>
          <Paragraph>
            {size} m² / {specify}
          </Paragraph>
          <Paragraph>
            {btnList.map((item, index) => {
              return (
                <Tag key={index} color={TagColor[index]}>
                  {item}
                </Tag>
              );
            })}
          </Paragraph>
          <Paragraph>发布时间：{moment(updateTime).format('YYYY-MM-DD hh:mm:ss')}</Paragraph>
        </div>
        <div className={style.price}>
          <Text>{price}</Text>元/月
        </div>
      </Card>
    );
  };
  // 房源信息列表
  const house_list = propertyArr.map((item, index) => <HouseList key={index} data={item} />);

  useEffect(() => {
    getHouse();
  }, []);

  const getHouse = async () => {
    const resp = await getProperty();
    if (resp.msg === 'SUCCESS') {
      resp.data.map((item) => {
        item.btnList = ['拎包入住', '近地铁'];
      });
      setProperty(resp.data.concat()); // 合并mock数据
    }
  };

  return (
    <>
      <div className={style.show_result}>
        已为您找到 <span>{propertyArr.length}</span> 套深圳房租
      </div>
      <div className={style.list_contain}>
        <div className={style.list_check}>
          <Tabs defaultActiveKey={key} onChange={(val) => setKey(val)}>
            <TabPane tab="默认排序" key="1"></TabPane>
            <TabPane tab="房屋租金" key="2"></TabPane>
            <TabPane tab="房屋面积" key="3"></TabPane>
            <TabPane tab="上架时间" key="4"></TabPane>
          </Tabs>
        </div>
        <div className={[style.con, style.clearfix].join(' ')}>
          {/* 左侧房源 */}
          <div className={style.house_list}>
            {house_list}
            <Pagination total={propertyArr.length} size={10} className={style.pagination} />
          </div>
          {/* 右侧内容 */}
          <div className={style.house_recommend}>
            <div className={style.rmfy}>
              <Paragraph>
                <Title level={4}>热门房源</Title>
                <Text className={style.refesh}>
                  <ReloadOutlined style={{ marginRight: 2 }} />
                  刷新
                </Text>
              </Paragraph>
              <Card cover={<img src={hotroom1} />} hoverable className={style.hot_house}>
                <div className={style.item_out}>
                  <Text strong>合租 | 整租·都市名园·9居室</Text>
                  <Paragraph>76 m² / 3室 2厅 / 高楼层 / 朝向南</Paragraph>
                  <Paragraph>4200元/月</Paragraph>
                </div>
              </Card>
              <Card cover={<img src={hotroom2} />} hoverable className={style.hot_house}>
                <div className={style.item_out}>
                  <Text strong>整租 | 整租·雕塑家园 3室2厅 复式 南/北</Text>
                  <Paragraph>72 m² / 3室 2厅 / 高楼层 / 朝向南北</Paragraph>
                  <Paragraph>7200元/月</Paragraph>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConList;
