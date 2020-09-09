import { useState } from 'react';
import { Typography, Button } from 'antd';
import findLock from '@/assets/images/findEquip.png';

const { Paragraph, Text } = Typography;

const BaseLock = () => {
  return (
    <div style={{ textAlign: 'center'}}>
      <img src={findLock} height={200} />
      <Paragraph>该楼栋未安装相关设备</Paragraph>
      <Paragraph>安装热线：<Text type="danger" strong>400-861-3878</Text></Paragraph>
      <Button type="primary">设备授权</Button>
    </div>
  );
};
export default BaseLock;
