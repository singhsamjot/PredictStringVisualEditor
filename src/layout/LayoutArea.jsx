import { useCallback, useContext } from "react";
import { AppContext } from "../context";
import { LayoutCell } from "../components";

const LayoutArea = () => {
  const { selectedLayout, onSelectedLayoutChange } = useContext(AppContext);

  const onLayoutCellChange = useCallback(
    (updatedCell) => {
      onSelectedLayoutChange(
        selectedLayout.layout.map((lc) =>
          lc.id === updatedCell.id ? updatedCell : lc
        )
      );
    },
    [onSelectedLayoutChange, selectedLayout.layout]
  );

  const onCellSwap = useCallback((sourceId, destinationId) => {
    const layout = [...selectedLayout.layout];
    const layoutIds = layout.map((l) => l.id);
    const sourceIndex = layoutIds.indexOf(sourceId);
    const destinationIndex = layoutIds.indexOf(destinationId);

    layout[sourceIndex] = selectedLayout.layout[destinationIndex];
    layout[destinationIndex] = selectedLayout.layout[sourceIndex];

    onSelectedLayoutChange(layout);
  }, [onSelectedLayoutChange, selectedLayout.layout]);

  return (
    <div className="layout">
      <center>
        <p>Double click on the layout cell to split</p>
      </center>
      <div>
        {selectedLayout.layout.map((item) => {
          return (
            <div key={item.id} className="layout-cell-root">
              <LayoutCell
                cellProps={item}
                onCellChange={onLayoutCellChange}
                onCellSwap={onCellSwap}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayoutArea;
