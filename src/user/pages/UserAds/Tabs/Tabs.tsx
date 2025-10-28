import { useState } from "react";
import styles from "./Tabs.module.scss";

interface ITab {
  title: string;
  content: React.ReactNode;
}

interface ITabs {
  tabsData: ITab[];
  initialTab?: number;
  className?: string;
}

export const Tabs = ({ tabsData, initialTab = 0, className }: ITabs) => {
  const [currentTab, setCurrentTab] = useState(initialTab);

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <nav className={styles.tabs}>
        {tabsData.map(({ title }, index) => (
          <button
            key={title}
            className={styles.tab}
            onClick={() => {
              setCurrentTab(index);
            }}
          >
            <h4
              className={`${styles.title} ${
                currentTab === index && styles.tabActive
              }`}
            >
              {title}
            </h4>
          </button>
        ))}
      </nav>
      <section className={styles.section}>{tabsData[currentTab].content}</section>
    </div>
  );
};
