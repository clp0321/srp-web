import { Input, Button, Typography } from 'antd';
import { Link } from 'umi';
import { SearchOutlined } from '@ant-design/icons';
import style from './style.less';
import logoUrl from '@/assets/images/easy-rent.png';

const { Text } = Typography;
const { Search } = Input;

const SearchBar = () => {
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
        <Button className={style.realase} type="primary">
          发布房源
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
