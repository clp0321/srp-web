import { useState } from 'react';
import { Input, Button, Typography, Modal, Form } from 'antd';
import { Link, history, connect } from 'umi';
import { SearchOutlined } from '@ant-design/icons';
import logUrl from '@/assets/images/yzl_logo.png';
import style from './style.less';
import { values } from 'lodash';
import FormItem from 'antd/lib/form/FormItem';

const { Text } = Typography;
const { Search } = Input;
const { confirm } = Modal;

const hotSearchList = ['民治', '大剧院', '坪山', '会展中心', '固戍', '老街', '田贝'];

const SearchBar = ({ currentUser, handle }) => {
  const { role, userName } = currentUser;

  const showModal = (roles) => {
    // 判断当前用户的登陆身份
    confirm({
      title: (
        <span>
          <Text strong>{userName}</Text>，{roles === 1 ? '是否发布房源' : '是否发布需求'}？
        </span>
      ),
      onOk: () => {
        if (roles === 1) {
          history.replace('/srp/release');
        } else {
          history.replace('/srp/agent');
        }
      },
      okCancel: () => {},
    });
  };

  const handleSearch = (values) => {
    handle(true);
  };

  const handleQuery = (value) => {
    handle(true);
  };

  return (
    <div className={style.search}>
      <div className={style.search_h}>
        <div className={style.search_l}>
          <Link to="/srp/welcome">
            <img src={logUrl} height={40} />
            <Text strong style={{ fontSize: 18 }}>
              共享房屋租赁平台
            </Text>
          </Link>
        </div>
        {/* 查询条件 */}
        <div>
          <Search
            icon={<SearchOutlined />}
            placeholder="请输入区域、商圈或小区名开始找房"
            enterButton="查询"
            className={style.search_btn}
            onSearch={handleSearch}
          />
          {/* 热门搜索 */}
          <ul className={style.search_opt}>
            <li>热门搜索：</li>
            {hotSearchList.map((item) => (
              <li key={item}>
                <a onClick={() => handleQuery(FormItem)}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <Button className={style.realase} type="primary" onClick={() => showModal(role)}>
          {role === 1 ? '发布房源' : '需求发布'}
        </Button>
      </div>
    </div>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(SearchBar);
