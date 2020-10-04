import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Steps, Card, Form, message } from 'antd';
import { BaseInfo, Configurate, Template } from './component';
import { addProperty } from '@/services/property';
import style from './style.less';

const { Step } = Steps;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class Release extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      fileList: [],
      baseInfo: {},
      configureInfo: {},
    };
  }

  // 处理图片
  handleFile = (info) => {
    this.setState({
      fileList: info.fileList.filter((file) => !!file.status),
    });
  };

  // 下一步
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  // 上一步
  prev() {
    const current = this.state.current - 1;
    this.setState({ current: current });
  }

  // 提交数据
  handleForm = (name, { forms }) => {
    const { baseInfo, fileList } = this.state;
    const username = localStorage.getItem('name');
    if (name === 'base') {
      let that = this;
      if (fileList.length === 0) {
        message.warning('请至少上传一张房源图片');
        return;
      }
      forms.base.validateFields().then((values) => {
        this.setState({
          baseInfo: values,
        });
        that.next();
      });
    }
    if (name === 'configure') {
      forms.configure.validateFields().then((values) => {
        const data = { ...values, ...baseInfo, houseId: baseInfo.deviceId };
        data.publisher = username;
        data.houseOwner = username;
        addProperty(data).then((resp) => {
          console.log(resp)
          if (resp.msg === 'SUCCESS') {
            forms.configure.resetFields();
            this.setState({
              fileList: [],
              baseInfo: {},
            });
            this.next()
          } else {
            message.error('房源发布失败');
          }
        });
      });
    }
  };

  render() {
    const { current, fileList, baseInfo } = this.state;
    // 内容分块
    const steps = [
      {
        title: '房源基本信息',
        content: <BaseInfo fileList={fileList} handleFile={this.handleFile} baseInfo={baseInfo} />,
      },
      {
        title: '价格配置信息',
        content: <Configurate prev={() => this.prev()} />,
      },
      {
        title: '发布完成',
        content: <Template />,
      },
    ];
    return (
      <PageContainer>
        <Card className={style.realse}>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <Form.Provider {...formItemLayout} onFormFinish={this.handleForm}>
            <div className={style.content}>{steps[current].content}</div>
          </Form.Provider>
        </Card>
      </PageContainer>
    );
  }
}

export default Release;
