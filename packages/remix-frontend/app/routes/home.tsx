import React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { LogoIcon } from "app/icons/logo";
import homeStyles from "../styles/home.module.css";
import { auth } from "../utils/auth.server";
import {
  type MenuPanelSectionProps,
  type MenuItemProps,
  MenuPanelSection,
} from "../components/menu-panel-section";
import { type User } from "@platform/model";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json({ profile });
};

interface Team {
  datasets: DatasetProps[];
  name: string;
  members: User[];
  updatedAt: Date;
}

const mockTeam: Team = {
  name: "UNSW Immunogenomics",
  datasets: [
    {
      name: "AbseqRNA_MolsPerCell",
      files: [],
      modifiedAt: new Date(Date.now() - 4000),
      totalSize: 3,
      uploadedBy: new Date(Date.now() - 1000),
    },
  ],
  members: [
    {
      email: "email",
      id: "id",
      name: "",
      nickname: "",
      picture: "",
      rooms: [],
    },
  ],
  updatedAt: new Date(Date.now() - 1000),
};

interface DatasetProps {
  name: string;
  files: string[];
  totalSize: number;
  modifiedAt: Date;
  uploadedBy: Date;
}

const mockMenu: Pick<MenuPanelSectionProps, "type" | "items">[] = [
  {
    type: "teams",
    items: [
      { title: "UNSW Immunogenomics" },
      { title: "Seurat" },
      { title: "10X Genomics" },
    ],
  },
  {
    type: "labs",
    items: [
      { title: "All Laboratories" },
      { title: "Created by Me" },
      { title: "Shared with Me" },
    ],
  },
];

export default function Home() {
  const { profile } = useLoaderData<typeof loader>();
  console.log((profile.photos || [])[0].value);
  const [selected, setSelected] = React.useState<MenuItemProps>(
    mockMenu[0].items[0]
  );

  const handleSelectItem = React.useCallback((item: MenuItemProps) => {
    setSelected(item);
  }, []);

  return (
    <main className={homeStyles.homeView}>
      <MenuPanel selected={selected} handleSelectItem={handleSelectItem} />
      <HomePanel />
    </main>
  );
}

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

export const getTimeAgo = (date: Date) => {
  const secondsAgo = Math.round((Date.now() - Number(date)) / 1000);

  if (secondsAgo < MINUTE) {
    return secondsAgo + ` second${secondsAgo !== 1 ? "s" : ""} ago`;
  }

  let divisor;
  let unit = "";

  if (secondsAgo < HOUR) {
    [divisor, unit] = [MINUTE, "min"];
  } else if (secondsAgo < DAY) {
    [divisor, unit] = [HOUR, "hour"];
  } else if (secondsAgo < WEEK) {
    [divisor, unit] = [DAY, "day"];
  } else if (secondsAgo < MONTH) {
    [divisor, unit] = [WEEK, "week"];
  } else if (secondsAgo < YEAR) {
    [divisor, unit] = [MONTH, "month"];
  } else {
    [divisor, unit] = [YEAR, "year"];
  }

  const count = Math.floor(secondsAgo / divisor);
  return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
};

const HomePanel = () => {
  return (
    <div className={homeStyles.homePanel}>
      <hgroup className={homeStyles.homePanelHgroup}>
        <h1 className={homeStyles.homePanelHeading}>UNSW Immunogenomics</h1>
        <div className={homeStyles.homePanelMetadata}>
          <span className={homeStyles.homePanelMetadataDate}>
            {getTimeAgo(new Date(Date.now() - 1000000))}
          </span>
          <div>{/* <img src={} alt='' /> */}</div>
        </div>
      </hgroup>
    </div>
  );
};

interface MenuPanelProps {
  selected: MenuItemProps;
  handleSelectItem: (item: MenuItemProps) => void;
}

const MenuPanel: React.FC<MenuPanelProps> = ({
  selected,
  handleSelectItem,
}) => {
  return (
    <aside className={homeStyles.menuPanel}>
      <div className={homeStyles.menuPanelContent}>
        <div className={homeStyles.menuPanelLogoHeader}>
          <LogoIcon
            width={16}
            height={16}
            className={homeStyles.menuPanelLogo}
          />
          <h3 className={homeStyles.menuPanelLogoHeaderTitle}>AutoCAR</h3>
        </div>
        <div className={homeStyles.menuPanelSections}>
          {mockMenu.map((section, key) => (
            <MenuPanelSection
              key={key}
              {...section}
              selected={selected}
              handleSelectItem={handleSelectItem}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
