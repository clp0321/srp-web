import { Modal } from 'antd';
const CreateForm = props => {
    
  const { title, modalVisible, onCancel } = props;
  return (
    <Modal
      title={title}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={modalVisible}
      footer={null}
    >
      {props.children}
    </Modal>
  )
};

export default CreateForm;