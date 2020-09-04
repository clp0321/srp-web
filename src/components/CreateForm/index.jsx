import { Modal } from 'antd';
import style from './style.less';

const CreateForm = (props) => {
  const { title, modalVisible, onCancel } = props;
  return (
    <Modal
      className={style.modal}
      title={title}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={modalVisible}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
