import { useState } from 'react';
import { Upload, message, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const UploadComponent = ({ form, handleFile }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [house_id, setHouse_id] = useState('');
  const [files, setFiles] = useState([]);
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
    username: localStorage.getItem('name'),
    files,
  };
  const props = {
    action: '/back/housePic',
    method: 'post',
    multiple: true,
    data,
    beforeUpload: (file) => {
      // 文件上传需绑定设备编号信息
      const newForm = form.current || form;
      const cur_id = newForm.getFieldValue('deviceId');
      if (!cur_id) {
        message.error('请首先完善门锁编号信息');
        newForm.setFields([
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
      const newFile = files.slice();
      newFile.push(file); // 添加新的文件对象
      setFiles(newFile);
      setHouse_id(cur_id); // 更新当前house_id值
      return isJpgOrPng && isLt1M;
    },
    onChange: (info) => {
      handleFile(info);
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 图片上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 图片上传失败`);
      }
    },
  };
  return (
    <>
      <Upload.Dragger {...props} onPreview={handlePreview}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽图片至此处上传</p>
        <p className="ant-upload-hint">支持单文件或多文件上传</p>
      </Upload.Dragger>
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

export default UploadComponent;
