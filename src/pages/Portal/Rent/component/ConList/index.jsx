import { useState, useEffect } from 'react';
import { Tabs, Pagination, Empty, Typography, Tag, Card } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import { ReloadOutlined } from '@ant-design/icons';
import hotroom1 from '@/assets/images/hotroom1.jpg';
import hotroom2 from '@/assets/images/hotroom2.jpg';
import { findPropertyByItems } from '@/services/property';
import moment from 'moment';
import style from './style.less';

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const TagColor = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

const ConList = ({ visible, list, changeTab, curTab, selectOpt, handle, setConList }) => {
  // 点击跳转至房源详情页
  const handleClick = (houseId) => {
    // 跳转新得房屋详情页
    window.open(`/srp/detail?houseId=${houseId}`);
  };

  // tab切换触发请求事件
  const handleTabChange = async (value) => {
    const order = value === 'default' ? "''" : value;
    const newData = { ...selectOpt, order };
    handle(true);
    const resp = await findPropertyByItems({ ...newData });
    setTimeout(() => {
      if (resp && resp.data) {
        setConList(resp.data);
        handle(false);
      }
    }, 500);
    changeTab(value);
  };

  // 房屋展示组件
  const HouseList = ({ data }) => {
    const { method, position, size, specify, updateTime, price, houseId, picUrl } = data;
    const btnList = ['拎包入住', '近地铁'];
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
                <Tag key={item} color={TagColor[index]}>
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
  const house_list = list.map((item, index) => <HouseList key={index} data={item} />);

  return (
    <>
      <div className={style.show_result}>
        已为您找到 <span>{list.length}</span> 套深圳房租
      </div>
      <div className={style.list_contain}>
        <div className={style.list_check}>
          <Tabs defaultActiveKey={curTab} onChange={handleTabChange}>
            <TabPane tab="默认排序" key="default"></TabPane>
            <TabPane tab="房屋租金" key="price"></TabPane>
            <TabPane tab="房屋面积" key="size"></TabPane>
            <TabPane tab="上架时间" key="update_time"></TabPane>
          </Tabs>
        </div>
        <div className={[style.con, style.clearfix].join(' ')}>
          {/* 左侧房源 */}
          <div className={style.house_list}>
            {visible ? (
              <PageLoading />
            ) : (
              <>
                {house_list}
                {list.length ? (
                  <Pagination total={list.length} size={10} className={style.pagination} />
                ) : (
                  <Empty description="暂无房源" />
                )}
              </>
            )}
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
