import { useState, useRef } from 'react';
import {
  Typography,
  Select,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Button,
  Popconfirm,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseInfo from '@/components/BaseInfo';
import style from '../../style.less';

const { Option } = Select;
const { Title } = Typography;
const { Item } = Form;

const optionBySelect = {
  1: {
    key: 1,
    label: '燃气',
    name: 'gas',
    message: '请输入燃气费用',
    placeholder: '请输入燃气所需用值',
  },
  2: {
    key: 2,
    label: '电费',
    name: 'meter',
    message: '请输入电费用',
    placeholder: '请输入用电所需费用',
  },
  3: {
    key: 3,
    label: '水费',
    name: 'water',
    message: '请输入水费用',
    placeholder: '请输入用水所需费用',
  },
};

const ContractOnline = ({ opt = 1 }) => {
  const [addCon, setAddCon] = useState([]);
  const [form] = Form.useForm();

  const NewFormItem = ({ data }) => {
    return (
      <Col span={12}>
        <Item
          label={data.label}
          name={data.name}
          rules={[{ required: true, message: `请输入${data.message}` }]}
        >
          <InputNumber min={1} />
        </Item>
      </Col>
    );
  };

  const handleConfirm = () => {
    const key = form.getFieldValue('item');
    if (!key) {
      message.warning('请选择新增项目');
      return false;
    }
    // 深拷贝
    const arr = JSON.parse(JSON.stringify(addCon));
    arr.push(optionBySelect[key]);
    setAddCon(arr);
    form.resetFields(['item']);
  };

  const keyList = []; // 判断是否已选择
  const addField = addCon.map((item, index) => {
    keyList.push(item.key);
    return <NewFormItem key={index} data={item} />;
  });

  const filterOpt = [];
  for (let i in optionBySelect) {
    if (keyList.indexOf(Number(i)) === -1) {
      filterOpt.push({
        value: i,
        data: optionBySelect[i].label,
      });
    }
  }

  return (
    <div className={style.containing}>
      <Title level={4} style={{ textAlign: 'center' }}>
        租客合同
      </Title>
      <BaseInfo name="基本信息" />
      <Form className={style.form} form={form}>
        <div className={style.contain_item}>
          <Item
            label="订单编号"
            name="code"
            rules={[{ required: true, message: '请输入订单编号' }]}
          >
            <Input placeholder="输入订单编号" />
          </Item>
          <Row gutter={24}>
            <Col span={8}>
              <Item
                label="出租方"
                name="Lessor"
                rules={[{ required: true, message: '请输入出租方信息' }]}
              >
                <Input placeholder="输入出租方" />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                label="承租方"
                name="Lessee"
                rules={[{ required: true, message: '请输入承租方信息' }]}
              >
                <Input placeholder="输入承租方" />
              </Item>
            </Col>
            <Col span={8}>
              <Item label="代理" name="agency">
                <Input placeholder="输入代理" />
              </Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Item label="起租时间" name="start_time" rules={[{ required: true }]}>
                <DatePicker />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="终止时间" name="end_time" rules={[{ required: true }]}>
                <DatePicker />
              </Item>
            </Col>
          </Row>
          <Item label="备注信息" name="info">
            <Input.TextArea rows={3} placeholder="输入备注信息" />
          </Item>
        </div>
        <BaseInfo name="费用详情" />
        <div className={style.contain_item}>
          <Row gutter={24}>
            <Col span={12}>
              <Item label="押金" name="deposit" rules={[{ required: true, message: '请输入押金' }]}>
                <InputNumber min={1} placeholder="输入押金" />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="租金" name="rent" rules={[{ required: true, message: '请输入租金' }]}>
                <InputNumber min={1} placeholder="输入租金" />
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Item
                label="滞纳金"
                name="late_fee"
                rules={[{ required: true, message: '请输入滞纳金' }]}
              >
                <InputNumber min={1} placeholder="输入滞纳金" />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="宽限期"
                name="grace"
                rules={[{ required: true, message: '请输入宽限期' }]}
              >
                <InputNumber min={1} placeholder="输入宽限期" />
              </Item>
            </Col>
            {addField}
          </Row>
          {addCon.length === 3 ? null : (
            <div style={{ textAlign: 'center' }}>
              <div className={style.addItem}>
                <Item name="item">
                  <Select
                    inputValue=""
                    placeholder="请输入其他收费项目"
                    style={{ width: 300, marginRight: 10 }}
                    allowClear
                  >
                    {filterOpt.map((item, index) => {
                      return (
                        <Option key={index} value={item.value}>
                          {item.data}
                        </Option>
                      );
                    })}
                  </Select>
                </Item>
                <Popconfirm title="确认新增该项目？" onConfirm={handleConfirm} onCancel={() => {}}>
                  <Button type="dashed">
                    <PlusOutlined /> 新增
                  </Button>
                </Popconfirm>
              </div>
            </div>
          )}
        </div>
      </Form>
      <div className={style.button}>
        <Button type="primary">提交</Button>
        <Button type="danger">重置</Button>
      </div>
    </div>
  );
};

export default ContractOnline;
