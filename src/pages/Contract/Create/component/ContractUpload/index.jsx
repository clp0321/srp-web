import { useState } from 'react';
import { Typography, Form, Row, Col, Input, Upload } from 'antd';
import BaseInfo from '@/components/BaseInfo';
import { InboxOutlined } from '@ant-design/icons';
import style from '../../style.less';

const { Title } = Typography;
const { Dragger } = Upload;
const { Item } = Form;

const ContractUpload = ({ opt }) => {
  const [form] = Form.useForm();

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className={style.containing}>
      <Title level={4} style={{ textAlign: 'center' }}>
        {opt === 1 ? '租客合同' : '代理合同'}
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
            <Col span={12}>
              <Item
                label="出租方"
                name="Lessor"
                rules={[{ required: true, message: '请输入出租方信息' }]}
              >
                <Input  placeholder="输入出租方" />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="承租方"
                name="Lessee"
                rules={[{ required: true, message: '请输入承租方信息' }]}
              >
                <Input placeholder="输入承租方"  />
              </Item>
            </Col>
          </Row>
          <BaseInfo name="签署文件" />
          <Item
            label="文件上传"
            name="upload"
            rules={[{ required: true, message: '请选择文件上传' }]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件至此处上传</p>
              <p className="ant-upload-hint">
                支持单次或批量上传。 严格禁止上传公司数据或其他机密文件
              </p>
            </Dragger>
          </Item>
        </div>
      </Form>
    </div>
  );
};
export default ContractUpload;
