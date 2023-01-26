import dashboardStyles from "./dashboard-screen.module.css";

export const PresentView = () => {
  return (
    <div>
      <hgroup className={dashboardStyles.dashboardViewHGroup}>
        <h1 className={dashboardStyles.dashboardViewHeading}>Present</h1>
        <p className={dashboardStyles.dashboardViewDescription}>
          Organise your findings with presentation or dashboard creation.
        </p>
      </hgroup>
      <div></div>
    </div>
  );
};
