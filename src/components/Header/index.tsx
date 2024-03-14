import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { memo } from "react";
import Image from "../ui/Image";
import { IMAGES } from "../../utils/constants";
import { pathname, scrollToTop } from "../../utils/helper";
import React from "react";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link onClick={scrollToTop} to={pathname}>
          <Image src={IMAGES.LOGO} alt="logo VieON" />
        </Link>
      </div>
    </div>
  );
};

export default memo(Header);
