import style from './style.less';
const Search = () => {
  return (
    <div className={style.search}>
      <div className={style.search_h}>
        <a href="#" className={style.s_logo}>
          <h2>区块链共享租赁</h2>
        </a>
        <input className={style.search_input} placeholder="请输入区域、商圈或小区名开始找房" />
        <button className={style.search_btm}>搜索</button>
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
        <button className={style.realase} onClick={() => {}}>
          发布房源
        </button>
      </div>
    </div>
  );
};

export default Search;
