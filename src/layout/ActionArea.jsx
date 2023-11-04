import { useContext, useState } from "react";
import { AppContext } from "../context";

const ActionArea = () => {
  const {
    layoutList,
    selectedLayout,
    onSaveNewLayout,
    onLayoutSelectionChange,
    onAddNewLayoutCell,
  } = useContext(AppContext);

  const [selectedLayoutId, setSelectedLayoutId] = useState(selectedLayout.id);

  const onLoadLayout = () => {
    onLayoutSelectionChange(selectedLayoutId);
  };

  const onSaveLayout = () => {
    const layoutName = window.prompt("Please provide unique layout name.");
    if (layoutName && !layoutList.some((l) => l.label === layoutName)) {
      const newLayoutId = onSaveNewLayout(layoutName);
      setSelectedLayoutId(newLayoutId);
      window.alert("Layout Saved Successfully.");
    } else {
      window.alert("Please provide valid layout name.");
    }
  };

  return (
    <div className="action-area">
      <select
        value={selectedLayoutId + ""}
        onChange={(e) => setSelectedLayoutId(+e.target.value)}
      >
        {layoutList.map((l) => {
          return (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          );
        })}
      </select>
      <button
        disabled={selectedLayoutId === selectedLayout.id}
        onClick={onLoadLayout}
      >
        Load
      </button>
      <button disabled={selectedLayout.id !== -1} onClick={onSaveLayout}>
        Save
      </button>
      <button disabled={selectedLayout.id !== selectedLayoutId} onClick={onAddNewLayoutCell}>
        Add New Layout
      </button>
    </div>
  );
};

export default ActionArea;
