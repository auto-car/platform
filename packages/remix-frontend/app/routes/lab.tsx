import React from "react";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { mockLabs } from "app/utils/constants";
import styles from "../styles/lab.module.css";
import { LogoIcon } from "app/icons/logo";
import { UserProfileButton } from "app/components/user-profile-button";
import { auth } from "app/utils/auth.server";
import { json, type LoaderArgs } from "@remix-run/cloudflare";
import { getTimeAgo } from "app/utils/date";
import { AvatarGroup } from "app/components/avatar-group";
import { DatasetIcon } from "app/icons/dataset-icon";
import { ExportIcon } from "app/icons/export-icon";
import { ShareIcon } from "app/icons/share-icon";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import placeholderImage from "../images/home-umap.png";
import { LiveList } from "@liveblocks/client";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
} from "app/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { CursorIcon } from "app/icons/cursor";
import cursorStyles from "../styles/cursor.module.css";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({ profile });
};

export default function Lab() {
  const [url] = useSearchParams();
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    setId(url.get("id") || "");
  }, [url]);

  const initialStorage = {
    availableColours: new LiveList([
      "blue",
      "green",
      "orange",
      "pink",
      "violet",
    ]),
    id,
  };

  if (id === "") {
    return <>Loading</>;
  }

  return (
    <RoomProvider
      id={id}
      initialPresence={{ cursor: null }}
      initialStorage={{ ...initialStorage }}
    >
      <ClientSideSuspense fallback={<>Loading</>}>
        {() => <LabInstance id={id} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

const LabBoard = () => {
  const [transformRef, setTransformRef] =
    React.useState<ReactZoomPanPinchRef | null>(null);
  const updateMyPresence = useUpdateMyPresence();
  const { profile: user } = useLoaderData<typeof loader>();

  return (
    <div
      id='lab-board-wrapper'
      className={styles.labBoardWrapper}
      onPointerMove={(e) => {
        const wrapper = document.getElementById("lab-board-wrapper");
        if (wrapper) {
          const presenceObj = {
            cursor: {
              x: Math.round(
                Math.round(e.clientX - (transformRef?.state.positionX || 0)) /
                  (transformRef?.state.scale || 1)
              ),
              y: Math.round(
                Math.round(
                  e.clientY -
                    wrapper.getBoundingClientRect().y -
                    (transformRef?.state.positionY || 0)
                ) / (transformRef?.state.scale || 1)
              ),
            },
            user: user.name ? user.name.givenName : "Bob",
            // userColour: getUserColour(),
          };
          updateMyPresence(presenceObj);
        }
      }}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      <TransformWrapper
        maxScale={2}
        minScale={1}
        wheel={{ touchPadDisabled: true, step: 0.2 }}
        onInit={(ref) => setTransformRef(ref)}
        // limitToBounds={false}
      >
        <TransformComponent>
          <div className={styles.labBoard}>
            <BoardWidgetLarge />
            <BoardWidgetLarge />
            <BoardWidgetLarge />
            <BoardWidgetLarge />
          </div>
        </TransformComponent>
      </TransformWrapper>
      <LabBoardCursors transformRef={transformRef} />
    </div>
  );
};

interface LabBoardCursorsProps {
  transformRef: ReactZoomPanPinchRef | null;
}

const LabBoardCursors: React.FC<LabBoardCursorsProps> = ({ transformRef }) => {
  const others = useOthers();
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (presence) {
          const { cursor, user } = presence as {
            cursor: { x: number; y: number } | null;
            user: string;
          };
          if (cursor) {
            return (
              <Cursor
                x={cursor.x + (transformRef?.state.positionX || 0)}
                user={user}
                y={cursor.y + (transformRef?.state.positionY || 0)}
                key={connectionId}
              />
            );
          }
          return null;
        }
        return null;
      })}
    </>
  );
};

interface CursorProps {
  x: number;
  y: number;
  user: string;
}

const Cursor: React.FC<CursorProps> = ({ x, y, user }) => {
  return (
    <div
      className={cursorStyles.cursor}
      style={{
        // transform: `translateX(${x}px) translateY(${y}px)`,
        top: y,
        left: x,
        position: "absolute",
        zIndex: 2,
      }}
    >
      <CursorIcon width={24} height={24} />
      <div className={cursorStyles.cursorLabel}>
        <p>{user}</p>
      </div>
    </div>
  );
};

const BoardWidgetLarge = () => {
  return (
    <div className={styles.boardWidgetLarge}>
      <hgroup className={styles.boardWidgetHGroup}>
        <h3 className={styles.boardWidgetHeading}>
          UMAP: AbseqRNA_MolsPerCell
        </h3>
        <p className={styles.boardWidgetUpdatedAt}>
          Updated {getTimeAgo(new Date(Date.now() - 1123123))}
        </p>
      </hgroup>
      <div className={styles.boardWidgetImageWrapper}>
        <img
          alt=''
          src={placeholderImage}
          className={styles.boardWidgetImage}
        />
      </div>
    </div>
  );
};

interface LabInstanceProps {
  id: string;
}

const LabInstance: React.FC<LabInstanceProps> = ({ id }) => {
  const { profile: user } = useLoaderData<typeof loader>();
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
                  href={`/lab?id=${lab.id}`}
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
                    <DatasetIcon width={16} />
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
