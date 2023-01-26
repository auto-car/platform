import dashboardStyles from "./dashboard-screen.module.css";

export const PredictView = () => {
  return (
    <div>
      <hgroup className={dashboardStyles.dashboardViewHGroup}>
        <h1 className={dashboardStyles.dashboardViewHeading}>Predict</h1>
        <p className={dashboardStyles.dashboardViewDescription}>
          Integrate similar datasets and generate predictive insights.
        </p>
      </hgroup>
      <div></div>
    </div>
  );
};
