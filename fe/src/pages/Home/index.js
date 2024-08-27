import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Home() {
   return (
      <div className={cx('wrapper')}>
         <Link to="/manage" style={{ textDecoration: 'none' }}>
            <button className={cx('button')}>Quản lý vật tư</button>
         </Link>

         <button className={cx('button')}>In báo cáo</button>
      </div>
   );
}

export default Home;
