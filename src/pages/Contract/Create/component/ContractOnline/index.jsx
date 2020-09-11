import { useState, useRef } from 'react';
import {
  Divider,
  Typography,
  Select,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Button,
  Modal,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import style from './style.less';

const { Option } = Select;
const { Text, Title } = Typography;
const { confirm } = Modal;
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
  const BaseInfo = ({ name }) => {
    return (
      <div className={style.divider}>
        <Divider type="vertical" />
        <Text strong>{name}</Text>
      </div>
    );
  };

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
    // 深拷贝
    const arr = JSON.parse(JSON.stringify(addCon));
    arr.push(optionBySelect[key]);
    setAddCon(arr);
    form.resetFields(['item'])
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
    <div className={style.contain}>
      <Title level={4} style={{ textAlign: 'center' }}>
        {opt === 1 ? '房东与租客合同' : '房东与代理合同'}
      </Title>
      <BaseInfo name="基本信息" />
      <Form className={style.form} form={form}>
        <div className={style.contain_item}>
          <Item
            label="订单编号"
            name="code"
            rules={[{ required: true, message: '请输入订单编号' }]}
          >
            <Input />
          </Item>
          <Row gutter={24}>
            <Col span={8}>
              <Item
                label="出租方"
                name="Lessor"
                rules={[{ required: true, message: '请输入出租方信息' }]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                label="承租方"
                name="Lessee"
                rules={[{ required: true, message: '请输入承租方信息' }]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                label="代理"
                name="agency"
                rules={[{ required: true, message: '请输入代理服务商' }]}
              >
                <Input />
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
          </Row>{' '}
          <Item label="备注信息" name="info">
            <Input.TextArea />
          </Item>
        </div>
        <BaseInfo name="费用详情" />
        <div className={style.contain_item}>
          <Row gutter={24}>
            <Col span={12}>
              <Item label="押金" name="deposit" rules={[{ required: true, message: '请输入押金' }]}>
                <InputNumber min={1} />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="租金" name="rent" rules={[{ required: true, message: '请输入租金' }]}>
                <InputNumber min={1} />
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Item
                label="滞纳金"
                name="late_fee"
                rules={[{ required: true, message: '请输入租金' }]}
              >
                <InputNumber min={1} />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="宽限期"
                name="grace"
                rules={[{ required: true, message: '请输入宽限期' }]}
              >
                <InputNumber min={1} rules={[{ required: true }]} />
              </Item>
            </Col>
            {addField}
          </Row>
          <div style={{ textAlign: 'center' }}>
            <div className={style.addItem}>
              <Item name="item">
                <Select inputValue="" placeholder="请输入其他收费项目" style={{ width: 300, marginRight: 10 }} allowClear>
                  {filterOpt.map((item, index) => {
                    return <Option key={index} value={item.value}>{item.data}</Option>;
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
