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
        <NavLink to="/app/settings/profile-settings">Tasks</NavLink>
        <NavLink to="/app/settings/change-password">Restricions</NavLink>
        <NavLink to="/app/settings/change-email">Analytic</NavLink>
        <NavLink to="/app/settings/change-email">Settings</NavLink>
      </nav>
    </div>
          <div className={styles.home} />
          <span className={styles.name}>ContentGuard</span><span className={styles.name2}>Pro</span>
          <div className={styles.profile} />
          <input />
        <div className={styles.logo} />
        <p>Jose Castro</p>
          <div className={styles.avatar} />
      </nav>
    </>
  );
}

export default MenuBar;