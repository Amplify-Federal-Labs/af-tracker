import type { Impediment } from "../../../../models/userStory";
import AddBlocker from "./addBlocker";
import Blocker from "./blocker";

interface BlockersProps {
  blockers: Impediment[];
  onAdd: (blocker: Impediment) => void;
  onUpdate: (index: number, blocker: Impediment) => void;
  onResolve: (index: number) => void;
  onDelete: (index: number) => void;
}

const Blockers = ({
  blockers,
  onAdd,
  onUpdate,
  onResolve,
  onDelete,
}: BlockersProps) => {
  return (
    <>
      {blockers.map((blocker, index) => (
        <Blocker
          key={blocker.description}
          index={index}
          blocker={blocker}
          onUpdate={onUpdate}
          onResolve={onResolve}
          onDelete={onDelete}
        />
      ))}
      <AddBlocker onAdd={onAdd} />
    </>
  );
};

export default Blockers;
