import React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";
import homeStyles from "../../styles/home.module.css";
import { auth } from "../../utils/auth.server";
import { UserProfileButton } from "app/components/user-profile-button";
import { AvatarGroup } from "app/components/avatar-group";
import { type User } from "@platform/model";
import { ZoomInIcon } from "app/icons/zoom-in-icon";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Select from "react-select";
import formStyles from "../../styles/form.module.css";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({ profile });
};

export default function Home() {
  const [team, setTeam] = React.useState("");
  const { profile: user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const goToTeam = React.useCallback(
    (team: string) => navigate(`/home/${team}`),
    [navigate]
  );

  return (
    <main className={homeStyles.homeView}>
      <UserProfileButton
        name={user?.name?.givenName || ""}
        picture={user?._json?.picture || ""}
      />
      <TeamSelector team={team} setTeam={setTeam} goToTeam={goToTeam} />
    </main>
  );
}

interface TeamSelectorProps {
  team: string;
  setTeam: React.Dispatch<React.SetStateAction<string>>;
  goToTeam: (team: string) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  team,
  setTeam,
  goToTeam,
}) => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <div className={homeStyles.homeTeamSelectorView}>
      <h1 className={homeStyles.homeTeamSelectorHeading}>
        Select your team to get started:
      </h1>
      <div className={homeStyles.teamSelectorOptions}>
        <TeamSelectorOption
          members={[
            { picture: "https://source.unsplash.com/random/?profile" } as any,
            { picture: "https://source.unsplash.com/random/?profile" } as any,
            { picture: "https://source.unsplash.com/random/?profile" } as any,
            { picture: "https://source.unsplash.com/random/?profile" } as any,
            { picture: "https://source.unsplash.com/random/?profile" } as any,
            { picture: "https://source.unsplash.com/random/?profile" } as any,
          ]}
          name='UNSW Immunogenomics'
          picture='https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2Vub21lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
          goToTeam={goToTeam}
        />
      </div>
      <button className={homeStyles.teamSelectorCreateButton} onClick={onOpen}>
        <ZoomInIcon width={12} />
        <p>Create new Team</p>
      </button>
      <span className={homeStyles.teamSelectorHelp}>
        Can't see your team here? Ask your teammate to add you, and then refresh
        this page!
      </span>
      <CreateTeamDialog onClose={onClose} isOpen={isOpen} />
    </div>
  );
};

interface TeamSelectorOptionProps {
  name: string;
  picture: string;
  members: User[];
  goToTeam: (team: string) => void;
}

const TeamSelectorOption: React.FC<TeamSelectorOptionProps> = ({
  name,
  picture,
  members,
  goToTeam,
}) => {
  return (
    <button
      className={homeStyles.teamSelectorOption}
      onClick={() => goToTeam(name)}
    >
      <img
        src={picture}
        alt='Team'
        className={homeStyles.teamSelectorOptionImg}
      />
      <div className={homeStyles.teamSelectorOptionInfo}>
        <h3 className={homeStyles.teamSelectorOptionName}>{name}</h3>
        <AvatarGroup
          avatars={members.map((member) => ({ src: member.picture }))}
        />
      </div>
    </button>
  );
};

interface CreateTeamDialogProps {
  onClose: VoidFunction;
  isOpen: boolean;
}

const CreateTeamDialog: React.FC<CreateTeamDialogProps> = ({
  onClose,
  isOpen,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent className={formStyles.dialog} background='#F5E5FF'>
        <h1 className={formStyles.dialogTitle}>Create a new team</h1>
        <ModalBody className={formStyles.dialogBody} padding={0}>
          <div className={formStyles.formSection}>
            <p className={formStyles.formSectionTitle}>Team Image</p>
            <input
              className={formStyles.formSectionInput}
              type='file'
              accept='image/*'
            />
          </div>
          <div className={formStyles.formSection}>
            <p className={formStyles.formSectionTitle}>Team Name</p>
            <input
              placeholder='e.g. Team Rocket'
              className={formStyles.formSectionInput}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <p className={formStyles.formSectionTitle}>Team Members</p>
            <Select
              isMulti
              name='members'
              options={[
                { value: "id-user-1", label: "Adi Kishore" },
                { value: "id-user-2", label: "Thor Odinson" },
                { value: "id-user-3", label: "Captain America" },
              ]}
              styles={{
                container: (base) => ({
                  ...base,
                  background: "#FDFAFF",
                  fontFamily: "Rubik",
                  fontSize: "12px",
                  border: "none",
                  outline: "none",
                  borderRadius: "4px",
                }),
                control: (base) => ({
                  ...base,
                  background: "#FDFAFF",
                  fontFamily: "Rubik",
                  fontSize: "12px",
                  border: "none",
                  outline: "none",
                  borderRadius: "4px",
                }),
              }}
              placeholder='Select team members...'
            />
          </div>
        </ModalBody>
        <ModalFooter className={formStyles.formFooterActions} padding={0}>
          <button className={formStyles.formSecondaryAction} onClick={onClose}>
            Cancel
          </button>
          <button className={formStyles.formPrimaryAction}>Submit</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
