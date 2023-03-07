import React from "react";
import { useLoaderData, useParams } from "@remix-run/react";
import { mockLabs } from "app/utils/constants";
import styles from "./lab.module.css";
import { LogoIcon } from "app/icons/logo";
import { UserProfileButton } from "app/components/user-profile-button";
import { getTimeAgo } from "app/utils/date";
import { AvatarGroup } from "app/components/avatar-group";
// import { DatasetIcon } from "app/icons/dataset-icon";
import { ExportIcon } from "app/icons/export-icon";
import { ShareIcon } from "app/icons/share-icon";
import { type UserLoader } from "app/routes/home/$team/lab";
import { LabBoard } from "./lab-board";
import { ZoomInIcon } from "app/icons/zoom-in-icon";

interface LabViewProps {
  id: string;
}

export const LabView: React.FC<LabViewProps> = ({ id }) => {
  const params = useParams();
  const { profile: user } = useLoaderData<UserLoader>();
  const lab = React.useMemo(() => mockLabs.find((lab) => lab.id === id), [id]);

  return (
    <div className={styles.labView}>
      {lab ? (
        <>
          <div className={styles.labHeader}>
            <div className={styles.labHeaderLogoAndProfile}>
              <LogoIcon width={16} />
              <UserProfileButton
                name={user._json?.given_name || ""}
                picture={user._json?.picture || ""}
                isPositioned
              />
            </div>
            <div className={styles.labHeaderLabInfo}>
              <span className={styles.labHeaderBreadcrumbs}>
                <a className={styles.labHeaderBreadcrumbLink} href='/home'>
                  Home
                </a>
                /
                <a
                  className={styles.labHeaderBreadcrumbLink}
                  href={`/home/${params.team as string}`}
                >
                  {params.team as string}
                </a>
                /
                <a
                  className={styles.labHeaderBreadcrumbLink}
                  href={`/home/${params.team as string}/lab?id=${lab.id}`}
                >
                  {lab.name}
                </a>
              </span>
              <div className={styles.labHeaderHeadingAndActions}>
                <div className={styles.labHeaderHeadingAndAddDataset}>
                  <div className={styles.labHeaderHeadingAndMetadata}>
                    <h1 className={styles.labHeaderHeading}>{lab.name}</h1>
                    <div className={styles.labHeaderMetadata}>
                      <span className={styles.labHeaderUpdatedAt}>
                        Updated at {getTimeAgo(lab.updatedAt)}
                      </span>
                      <AvatarGroup
                        avatars={lab.members.map((member) => ({
                          src: member.picture,
                        }))}
                      />
                    </div>
                  </div>
                  <button className={styles.labHeaderAddDataset}>
                    <ZoomInIcon width={10} />
                    Add another Dataset
                  </button>
                </div>
                <div className={styles.labHeaderSecondaryActions}>
                  <button className={styles.labHeaderExportDataset}>
                    <ExportIcon width={16} />
                    Export Dashboard
                  </button>
                  <button className={styles.labHeaderShareDataset}>
                    <ShareIcon width={16} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          <LabBoard />
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};
