import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from '../styles/MenuBar.module.css';

function MenuBar() {

  return (
    <>
      <nav id="container" className={styles.container}>
      <div className={styles.settings}>
      <input className={styles.menu__toggle} type="checkbox" id="menu__toggle" />
      <label className={styles.menu__btn} htmlFor="menu__toggle">
        <span />
      </label>
      <nav className={styles.nav} id="setting-nav">
        <span className={styles.header}>Dashboard</span>
        <NavLink to="/task">Tasks</NavLink>
        <NavLink to="/restrictions">Restricions</NavLink>
        <NavLink to="/analytic">Analytic</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </div>
          <span className={styles.name}>ContentGuard</span><span className={styles.name2}>Pro</span>
          <input type="text" placeholder="Search Project" className="input input-bordered w-full max-w-xs" />
          <div className={styles.profile} />
        <div className={styles.logo} />
        <p className={styles.jose}>Jose Castro</p>
          <div className={styles.avatar} />
      </nav>
      <Outlet />
    </>
  );
}

export default MenuBar;