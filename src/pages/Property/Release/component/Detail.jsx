import React from 'react';
import { Descriptions, Badge } from 'antd';

const Detail = () => {
  // mock获取数据
  const mockData = {
    publisher: 'daqing',
    phone: '13977327178',
    location: '广东省深圳市南山区塘朗村秀丽小区23号',
    divice_id: 'abfaferdde1210047',
    specify: '一室',
    struct: '钢筋',
    size: '100',
    price: '1000',
    payway: '押一付一',
    method: '整租',
    other: '这是一套新房',
  };

  const {
    publisher,
    phone,
    location,
    divice_id,
    specify,
    struct,
    size,
    price,
    payway,
    method,
    other
  } = mockData;

  return (
    <div>
      <Descriptions bordered layout="vertical">
        <Descriptions.Item label="发布人">{publisher}</Descriptions.Item>
        <Descriptions.Item label="手机号">{phone}</Descriptions.Item>
        <Descriptions.Item label="设备ID">{divice_id}</Descriptions.Item>
        <Descriptions.Item label="房屋类型">{specify}</Descriptions.Item>
        <Descriptions.Item label="房屋结构">{struct}</Descriptions.Item>
        <Descriptions.Item label="房屋面积">{size}m²</Descriptions.Item>
        <Descriptions.Item label="房屋地址" span={3}>
          <Badge status="processing" text={location} />
        </Descriptions.Item>
        <Descriptions.Item label="租赁形式">{method}</Descriptions.Item>
        <Descriptions.Item label="支付方式">{payway}</Descriptions.Item>
        <Descriptions.Item label="租金/月">¥{price}</Descriptions.Item>
        <Descriptions.Item label="备注信息">{other}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Detail;
