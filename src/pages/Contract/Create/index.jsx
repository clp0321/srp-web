import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import ContractOnline from './component/ContractOnline';
import ContractUpload from './component/ContractUpload';
import style from './style.less';

const { TabPane } = Tabs;

const list = [1, 2];

const Create = () => {
  const callback = () => {};
  return (
    <PageContainer>
      <Card className={style.contain}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="在线合同填写" key="1">
            <ContractOnline />
          </TabPane>
          <TabPane tab="上传电子合同" key="2">
            <ContractUpload />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Create;
