import type { Blocker } from "../../../../viewModels/userStory";
import AddBlocker from "./addBlocker";
import Blocker from "./blocker";

interface BlockersProps {
  blockers: Blocker[];
  onAdd: (blocker: Blocker) => void;
  onUpdate: (index: number, blocker: Blocker) => void;
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
          key={`${index}-${blocker.description}`}
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
