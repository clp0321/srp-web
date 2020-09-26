import { useState } from 'react';
import {
  Select,
  InputNumber,
  Radio,
  Button,
  Upload,
  Checkbox,
  Input,
  Typography,
  DatePicker,
  Space,
  Form,
  Row,
  Col,
  message,
  Modal,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import style from '../style.less';

const { Item } = Form;
const { Option } = Select;
const { Text, Title, Paragraph } = Typography;
const CheckboxGroup = Checkbox.Group;

// Mock租金信息
const RentInfoList = [
  {
    title: '水费',
    value: 1,
  },
  {
    title: '电费',
    value: 2,
  },
  {
    title: '燃气费',
    value: 3,
  },
  {
    title: '贷款费',
    value: 4,
  },
  {
    title: '物业费',
    value: 5,
  },
  {
    title: '停车费',
    value: 6,
  },
];

const rentContain = ['水费', '电费', '燃气费', '贷款费', '物业费', '停车费'];

// Mock房屋配置信息
const configuration = [
  '冰箱',
  '电视',
  '洗衣机',
  '热水器',
  '空调',
  '宽带',
  '沙发',
  '床',
  '暖气',
  '衣柜',
  '可做饭',
  '卫生间',
  '阳台',
  '智能门锁',
  '油烟机',
  '燃气社',
];

// 正则数字
const numberRegex = {
  pattern: /^\+?[1-9][0-9]*$/,
  message: '请输入不小于0的正整数',
};

// 房屋面积正则
const sizeRegex = {
  pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
  message: '请输入最多两位小数的数字',
};

// Title
const TitleCon = ({ title }) => {
  return (
    <Title level={4} className={style.title}>
      {title}
    </Title>
  );
};

// RentContain 租金包含
// const RentContain = ({ data }) => {
//   return (
//     <Checkbox value={data.value} className={style.check_box}>
//       {data.title}
//     </Checkbox>
//   );
// };
// const rentList = RentInfoList.map((item, index) => {
//   return <RentContain data={item} key={index} />;
// });

// baseInfo 基础信息
const BaseInfo = () => {
  const baseLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
    },
  };
  return (
    <>
      <TitleCon title="基础信息" />
      <Row>
        <Col>
          <Item
            name="position"
            label="所在区域"
            {...baseLayout}
            rules={[
              {
                required: true,
                message: '请输入所在区域',
              },
            ]}
          >
            <Input placeholder="输入所在区域" style={{ width: 200 }} />
          </Item>
        </Col>
        <Col>
          <Item
            label="设备编号"
            name="deviceId"
            {...baseLayout}
            rules={[
              {
                required: true,
                message: '请输入设备编号',
              },
            ]}
            style={{ marginLeft: 8 }}
          >
            <Input style={{ display: 'inline-block', width: 200 }} placeholder="输入设备编号" />
          </Item>
        </Col>
        <Col>
          <Item
            {...baseLayout}
            name="direction"
            label="房屋朝向"
            rules={[
              {
                required: true,
                message: '请选择房屋朝向',
              },
            ]}
            style={{ marginLeft: 8 }}
          >
            <Select placeholder="选择房屋朝向" style={{ display: 'inline-block', width: 200 }}>
              <Option value={0}>东</Option>
              <Option value={1}>南</Option>
              <Option value={2}>西</Option>
              <Option value={3}>北</Option>
            </Select>
          </Item>
        </Col>
      </Row>
      <Item label="房屋类型" style={{ display: 'flex' }} className={style.add_require}>
        <Item
          name="room"
          rules={[{ required: true, message: '请输入室', ...numberRegex }]}
          style={{ display: 'inline-block', width: 200, marginRight: 8 }}
          className={style.margin}
        >
          <Input addonAfter="室" placeholder="输入室" />
        </Item>
        <Item
          name="hall"
          rules={[{ required: true, message: '请输入厅', ...numberRegex }]}
          className={style.margin}
        >
          <Input addonAfter="厅" placeholder="输入厅" />
        </Item>
        <Item
          name="guard"
          rules={[{ required: true, message: '请输入卫', ...numberRegex }]}
          className={style.margin}
        >
          <Input addonAfter="卫" placeholder="输入卫" />
        </Item>
        <Item
          name="size"
          rules={[{ required: true, message: '请输入面积', ...sizeRegex }]}
          className={style.margin}
        >
          <Input addonAfter="㎡" addonBefore="共" placeholder="输入面积" />
        </Item>
      </Item>
    </>
  );
};
// rentInfo 租金信息
const RentInfo = () => {
  return (
    <>
      <TitleCon title="租金信息" className={style.sub_title} />
      <Item label="月租金" className={[style.flex_item, style.add_require].join(' ')}>
        <Item
          name="price"
          rules={[{ required: true, message: '请输入租金', ...sizeRegex }]}
          className={style.margin}
        >
          <Input addonAfter="￥" placeholder="输入租金" />
        </Item>
        <Item name="payway">
          <Select placeholder="请选择付款方式" className={style.margin}>
            <Option value={0}>押一付一</Option>
            <Option value={1}>押一付二</Option>
            <Option value={2}>半年付</Option>
            <Option value={3}>年付</Option>
          </Select>
        </Item>
        <Item name="method">
          <Select
            placeholder="请选择租赁形式"
            style={{ display: 'inline-block', width: 200, marginRight: 8 }}
          >
            <Option value={0}>整租</Option>
            <Option value={1}>合租</Option>
          </Select>
        </Item>
      </Item>
      <Item label="租金包含" name="contain">
        <Checkbox.Group className={style.rent_contain} options={rentContain} />
      </Item>
    </>
  );
};

// detail 详细介绍
const Detail = ({
  indeterminate,
  checkAll,
  onCheckAllChange,
  changeCheckList,
  checkedList,
  form,
}) => {
  const handleCheck = (e) => {
    onCheckAllChange(e.target.checked);
    if (e.target.checked) {
      form.current.setFields([{ name: ['configurate'], value: configuration }]);
    } else {
      form.current.setFields([{ name: ['configurate'], value: [] }]);
    }
  };

  const handleChange = (checkedList) => {
    changeCheckList(checkedList);
  };

  return (
    <>
      <TitleCon title="详细介绍" className={style.sub_title} />
      <Item label="最早入住" className={style.flex_item}>
        <Item name="enterTime">
          <DatePicker className={style.margin} />
        </Item>
        <Item name="fitPeople" rules={[{ required: true, message: '请输入室', ...numberRegex }]}>
          <Input addonAfter="人" placeholder="宜住" className={style.margin} />
        </Item>
      </Item>
      <Item label="看房时间" name="watchTime">
        <Radio.Group>
          <Radio value={1}>仅周末</Radio>
          <Radio value={2}>仅工作日</Radio>
          <Radio value={3}>随时看房</Radio>
          <Radio value={4}>工作日晚和周末</Radio>
        </Radio.Group>
      </Item>
      <Item label="房屋配置" className={style.configuration}>
        <Checkbox indeterminate={indeterminate} onChange={handleCheck} checked={checkAll}>
          全选
        </Checkbox>
        <Item name="configurate">
          <CheckboxGroup options={configuration} value={checkedList} onChange={handleChange} />
        </Item>
      </Item>
      <Item label="房屋描述" name="descrition">
        <Input.TextArea
          rows={5}
          placeholder="可以介绍房源亮点,交通,周边环境,可以入住二点时间和对租客的要求等,详细的房源描述信息会大大增加快速出租的机会!"
        />
      </Item>
    </>
  );
};

// houstpic 房源图片
const HousePic = ({ form, fileList, handleFile }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [house_id, setHouse_id] = useState('');
  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImage(src); //这个图片路径根据自己的情况而定
    setPreviewVisible(true);
  };
  const data = {
    house_id,
    username: 'daqing',
    files: fileList,
  };
  const props = {
    action: '/back/housePic',
    method: 'post',
    multiple: true,
    data,
    fileList,
    beforeUpload: (file) => {
      const cur_id = form.current.getFieldValue('deviceId')
      if (!cur_id) {
        message.error('请补充完整设备信息');
        form.current.setFields([
          { name: ['deviceId'], value: '', errors: ['上传图片前，请完善设备信息！'] },
        ]);
        return false;
      }
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error(`只能上传JPG/PNG上传图片`);
        return false;
      }
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        message.error('图片必须小于1M!');
        return false;
      }
      setHouse_id(cur_id) // 更新当前house_id值
      return isJpgOrPng && isLt1M;
    },
    onChange: (info) => {
      handleFile(info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 图片上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 图片上传失败`);
      }
    },
  };
  return (
    <>
      <TitleCon title="房源图片" className={style.sub_title} />
      <Item
        label="上传图片"
        name="upload"
        rules={[{ require: true }]}
        className={[style.house_pic, style.add_require].join(' ')}
      >
        <Paragraph>
          请上传清晰、实拍的室内图片，请不要在图片上添加文字、数字、网址等内容，请勿上传名片、二维码、自拍照、风景照等与房源无关的图片，最多上传12张，每张最大1M
        </Paragraph>
        <Item noStyle>
          <Upload.Dragger {...props} onPreview={handlePreview}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽图片至此处上传</p>
            <p className="ant-upload-hint">支持单文件或多文件上传</p>
          </Upload.Dragger>
        </Item>
      </Item>
      <Modal
        visible={previewVisible}
        title="预览照片"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

// contactInfo 联系信息
const ContactInfo = () => {
  return (
    <>
      <TitleCon title="联系信息" className={style.sub_title} />
      <Item label="发布人" name="publisher">
        <Input disabled />
      </Item>
      <Item label="身份选择" name="role">
        <Input disabled />
      </Item>

      <Item
        label="手机号"
        name="phone"
        rules={[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号！',
          },
        ]}
      >
        <Input placeholder="输入手机号" />
      </Item>
    </>
  );
};

// 按钮集合
const ButtonList = ({ handleSubmit, resetData }) => {
  return (
    <div className={style.btn_list}>
      <Space size="large">
        <Button type="primary" onClick={handleSubmit}>
          房源发布
        </Button>
        <Button type="danger" onClick={resetData}>
          信息重置
        </Button>
      </Space>
    </div>
  );
};

export { BaseInfo, RentInfo, Detail, HousePic, ContactInfo, ButtonList };
