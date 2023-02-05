import React from "react";
import { AnalyseView } from "../../screens/dashboard/analyse-view";
import styles from "./dashboard-screen.module.css";
import { PredictView } from "../../screens/dashboard/predict-view";
import { PresentView } from "../../screens/dashboard/present-view";
import { MenuType } from "./types";

interface DashboardRendererProps {
  selectedScreen: MenuType;
}
export const DashboardRenderer: React.FC<DashboardRendererProps> = ({
  selectedScreen,
}) => {
  const getView = () => {
    switch (selectedScreen) {
      case MenuType.ANALYSE:
        return <AnalyseView />;
      case MenuType.PREDICT:
        return <PredictView />;
      case MenuType.PRESENT:
        return <PresentView />;
    }
  };
  return <main className={styles.dashboardView}>{getView()}</main>;
};
