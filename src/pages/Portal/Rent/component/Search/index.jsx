import { useState } from 'react';
import { Input, Button, Typography, Modal } from 'antd';
import FormModal from '../FormModal';
import { Link } from 'umi';
import { SearchOutlined } from '@ant-design/icons';
import style from './style.less';
import logoUrl from '@/assets/images/easy-rent.png';

const { Text } = Typography;
const { Search } = Input;

const SearchBar = () => {
  const [visible, setVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  
  return (
    <div className={style.search}>
      <div className={style.search_h}>
        <div className={style.search_l}>
          <Link to="/srp/welcome">
            <img src={logoUrl} height={30} />
            <Text strong style={{ fontSize: 18 }}>
              区块链共享租赁
            </Text>
          </Link>
        </div>
        <div>
          <Search
            icon={<SearchOutlined />}
            placeholder="请输入区域、商圈或小区名开始找房"
            enterButton="查询"
            className={style.search_btn}
          />
          <ul className={style.search_opt}>
            <li>热门搜索：</li>
            <li>
              <a href="#">民治</a>
            </li>
            <li>
              <a href="#">大剧院</a>
            </li>
            <li>
              <a href="#">坪山</a>
            </li>
            <li>
              <a href="#">会展中心</a>
            </li>
            <li>
              <a href="#">固戍</a>
            </li>
            <li>
              <a href="#">老街</a>
            </li>
            <li>
              <a href="#">田贝</a>
            </li>
          </ul>
        </div>
        <Button className={style.realase} type="primary" onClick={() => setVisible(true)}>
          发布房源
        </Button>
        <Modal
          title="房源发布"
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
         
        </Modal>

        <FormModal
          // onSubmit={async value => {
          //   const success = await handleUpdate(value);

          //   if (success) {
          //     handleUpdateModalVisible(false);
          //     setStepFormValues({});

          //     if (actionRef.current) {
          //       actionRef.current.reload();
          //     }
          //   }
          // }}
          onCancel={() => {
            setVisible(false);
            // setStepFormValues({});
          }}
          updateModalVisible={visible}
          values={stepFormValues}
        />
      ) 
      </div>
    </div>
  );
};

export default SearchBar;
