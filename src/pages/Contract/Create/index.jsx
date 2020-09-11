import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs, Select } from 'antd';
import ContractOnline from './component/ContractOnline';
import ContractUpload from './component/ContractUpload';
import style from './style.less';

const { TabPane } = Tabs;
const { Option } = Select;

const Create = () => {
  const [key, setKey] = useState('1')
  const [opt, setOpt] = useState(1);
  const handleChange = (val) => {
    setOpt(val);
  };

  const SelectOpt = () => (
    <Select defaultValue={opt} style={{ float: 'right', display: 'block' }} onChange={handleChange}>
      <Option value={1}>租客</Option>
      <Option value={2}>代理</Option>
    </Select>
  );

  return (
    <PageContainer>
      <Card className={style.contain}>
        <Tabs
          defaultActiveKey={key}
          size="large"
          tabBarExtraContent={key === '1' ? null : <SelectOpt />}
          onChange={val => setKey(val)}
        >
          <TabPane tab="在线合同填写" key="1">
            <ContractOnline  />
          </TabPane>
          <TabPane tab="上传电子合同" key="2">
            <ContractUpload opt={opt} />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Create;
