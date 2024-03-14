import React from "react";
import styles from "./Style.module.scss";
import { FOOTER, IMAGES, REPORT_LINK, VieON } from "../../utils/constants";
import DownloadDesktop from "./DownloadDesktop";
import Image from "../ui/Image";
import { pathname } from "../../utils/helper";

const Footer = () => {
  const handlePushToStatic = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string = `${pathname}`
  ) => {
    e.preventDefault();
    window.open(link, "_blank");
  };

  const onClickDMCA = (e: any) => {
    e.preventDefault();
    window.open(
      "//www.dmca.com/Protection/Status.aspx?ID=598b9d29-b519-4000-b70c-4c1f1dfdc677",
      "_blank"
    );
  };

  return (
    <footer className={styles.base} id="footer">
      <div className={styles.gridLayout}>
        <div className={styles.cols1}>
          <DownloadDesktop
            className={styles.download}
            thumbClassName={styles.downloadThumb}
            contentClassName={styles.downloadContent}
            contentLabelClassName={styles.downloadContentLabel}
            btnGroup={styles.downloadBtnGroup}
            btnClassName={styles.downloadButton}
          />
        </div>
        <div className={styles.cols2}>
          <div className={styles.brandGroup}>
            <div className={styles.brandMain}>
              <Image alt="VieON" src={IMAGES.LOGO} />
            </div>
            <a
              className={styles.brandMit}
              href={FOOTER.MIT.LINK}
              title="Đã thông báo Bộ Công Thương"
              rel="nofollow noreferrer"
            >
              <Image src={FOOTER.MIT.IMAGE} alt={FOOTER.MIT.TITLE} />
            </a>
            <a
              onClick={onClickDMCA}
              style={{ width: "7.5625rem" }}
              title="DMCA.com Protection Status"
              className={styles.brandDmca}
              href="https://www.dmca.com/Protection/Status.aspx?ID=598b9d29-b519-4000-b70c-4c1f1dfdc677"
              rel="noopener noreferrer"
            >
              <Image
                src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=598b9d29-b519-4000-b70c-4c1f1dfdc677"
                alt="DMCA.com Protection Status"
              />
            </a>

            <a
              title="VALIDATION OF COMPLIANCE - PCI-SAQ"
              href="https://certificate.crossbowlabs.com/b6b03752-549a-4003-9842-ec5034048980#gs.19u98b"
              style={{ width: "7.5625rem" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={IMAGES.LOGO_PCIDSS}
                alt="VALIDATION OF COMPLIANCE - PCI-SAQ"
              />
            </a>
          </div>
          <div className={styles.menuGroup}>
            <ul>
              <li className={styles.menuTitle}>{FOOTER.NAV.ABOUT}</li>
              <li>
                <a
                  className={styles.menuIndex}
                  href={FOOTER.NAV.VieON_ABOUT.PATH}
                  title={FOOTER.NAV.VieON_ABOUT.NAME}
                  onClick={(e) =>
                    handlePushToStatic(e, FOOTER.NAV.VieON_ABOUT.PATH)
                  }
                >
                  {FOOTER.NAV.VieON_ABOUT.NAME}
                </a>
              </li>
            </ul>
            <ul>
              <li className={styles.menuTitle}>{FOOTER.NAV.RULE}</li>
              <li>
                <a
                  className={styles.menuIndex}
                  href={FOOTER.NAV.TERMS.PATH}
                  title={FOOTER.NAV.TERMS.NAME}
                  onClick={(e) => handlePushToStatic(e, FOOTER.NAV.TERMS.PATH)}
                >
                  {FOOTER.NAV.TERMS.NAME}
                </a>
              </li>
              <li>
                <a
                  className={styles.menuIndex}
                  href={FOOTER.NAV.AGREEMENT.PATH}
                  title={FOOTER.NAV.AGREEMENT.NAME}
                  onClick={(e) =>
                    handlePushToStatic(e, FOOTER.NAV.AGREEMENT.PATH)
                  }
                >
                  {FOOTER.NAV.AGREEMENT.NAME}
                </a>
              </li>
              <li>
                <a
                  className={styles.menuIndex}
                  href={FOOTER.NAV.PRIVATE_POLICY.PATH}
                  title={FOOTER.NAV.PRIVATE_POLICY.NAME}
                  onClick={(e) =>
                    handlePushToStatic(e, FOOTER.NAV.PRIVATE_POLICY.PATH)
                  }
                >
                  {FOOTER.NAV.PRIVATE_POLICY.NAME}
                </a>
              </li>
              <li>
                <a
                  className={styles.menuIndex}
                  href={FOOTER.NAV.COPY_RIGHT.PATH}
                  title={FOOTER.NAV.COPY_RIGHT.NAME}
                  onClick={(e) =>
                    handlePushToStatic(e, FOOTER.NAV.COPY_RIGHT.PATH)
                  }
                >
                  {FOOTER.NAV.COPY_RIGHT.NAME}
                </a>
              </li>
            </ul>
            <ul>
              <li className={styles.menuTitle}>{FOOTER.NAV.SUPPORT}</li>
              <li>
                <a
                  className={styles.menuIndex}
                  title={FOOTER.NAV.SUPPORT_CENTER.NAME}
                  href={FOOTER.NAV.SUPPORT_CENTER.URL}
                  rel="noopener noreferrer"
                >
                  {FOOTER.NAV.SUPPORT_CENTER.NAME}
                </a>
              </li>
              <li>
                <a
                  className={styles.menuIndex}
                  title={FOOTER.NAV.FAQS.NAME}
                  href={FOOTER.NAV.FAQS.PATH}
                  onClick={(e) => handlePushToStatic(e, FOOTER.NAV.FAQS.PATH)}
                >
                  {FOOTER.NAV.FAQS.NAME}
                </a>
              </li>
              <li>
                <a
                  className={styles.menuIndex}
                  href={`mailto:${VieON.SUPPORT_EMAIL}?Subject=Trợ%20giúp/Góp%20ý%20về%20website%20VieON`}
                  title={FOOTER.NAV.CONTACT}
                  target="_top"
                >
                  {FOOTER.NAV.CONTACT}
                </a>
              </li>
              <li>
                <a
                  className={styles.menuIndex}
                  rel="noopener noreferrer"
                  href={REPORT_LINK}
                  title={FOOTER.NAV.FEEDBACK}
                >
                  {FOOTER.NAV.FEEDBACK}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.cols3}>
          <address className={styles.address}>
            {FOOTER.COMPANY_INFO.ADDRESS}
            <br />
            {`Email: `}
            <a
              href={`mailto:${VieON.SUPPORT_EMAIL}`}
              title={`Email hỗ trợ: ${VieON.SUPPORT_EMAIL}`}
              target="_parent"
            >
              {FOOTER.COMPANY_INFO.EMAIL}
            </a>
            {` | Hotline: `}
            <a
              href="tel:(+84)1800599920"
              title="Hãy gọi cho chúng tôi theo số hotline 1800.599.920 (miễn phí)"
              target="_parent"
            >
              {FOOTER.COMPANY_INFO.HOTLINE}
            </a>
            {` (miễn phí)`}
            <br />
            {FOOTER.COMPANY_INFO.BUSINESS_LICENSE}
          </address>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
