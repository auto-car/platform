import React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { LogoIcon } from "app/icons/logo";
import { TeamsIcon } from "app/icons/teams-icon";
import homeStyles from "../styles/home.module.css";

import { auth } from "../utils/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json({ profile });
};

export default function Home() {
  const { profile } = useLoaderData<typeof loader>();
  console.log({ profile });
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

  const [selected, setSelected] = React.useState<MenuItemProps>(
    mockMenu[0].items[0]
  );

  const handleSelectItem = React.useCallback((item: MenuItemProps) => {
    setSelected(item);
  }, []);

  return (
    <main className={homeStyles.homeView}>
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
    </main>
  );
}

interface MenuPanelSectionProps {
  type: "teams" | "labs";
  items: MenuItemProps[];
  selected: MenuItemProps;
  handleSelectItem: (item: MenuItemProps) => void;
}

interface MenuItemProps {
  title: string;
}

const MenuPanelSection: React.FC<MenuPanelSectionProps> = ({
  items,
  type,
  selected,
  handleSelectItem,
}) => {
  const sectionTitle = React.useMemo(
    () => (type === "teams" ? "Teams" : "Laboratories"),
    [type]
  );

  const sectionAddText = React.useMemo(
    () => (type === "teams" ? "+ Add new team" : "+ Create new laboratory"),
    [type]
  );

  return (
    <div className={homeStyles.menuPanelSection}>
      <div className={homeStyles.sectionHeader}>
        <TeamsIcon width={16} height={16} className={homeStyles.sectionIcon} />
        <h5 className={homeStyles.sectionTitle}>{sectionTitle}</h5>
      </div>
      <div className={homeStyles.sectionItems}>
        {items.map((item, key) => (
          <button
            key={key}
            className={
              item.title === selected.title
                ? homeStyles.sectionItemSelected
                : homeStyles.sectionItem
            }
            onClick={() => handleSelectItem(item)}
          >
            {item.title}
          </button>
        ))}
        <button className={homeStyles.sectionAddButton}>
          {sectionAddText}
        </button>
      </div>
    </div>
  );
};
