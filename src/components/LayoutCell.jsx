import { useCallback } from "react";
import { useDrop, useDrag } from "react-dnd";

const HORIZONTAL_SPLIT = "horizontal";
const VERTICAL_SPLIT = "vertical";

const LayoutCell = ({ cellProps, onCellChange, onCellSwap }) => {
  const [, drop] = useDrop(
    () => ({
      accept: ["image", "layoutCell"],
      drop: (item, monitor) => {
        if (item.type === "image") {
          if (monitor.isOver()) {
            if (item.value) {
              onCellChange({
                ...cellProps,
                image: item.value,
              });
            }
          }
        }
        if (item.type === "layoutCell") {
          if (item.value) {
            if (cellProps.level === 1 && item.value.level === 1)
              onCellSwap(cellProps.id, item.value.id);
          }
        }
      },
    }),
    [cellProps, onCellChange, onCellSwap]
  );

  const [, drag] = useDrag(
    () => ({
      type: "layoutCell",
      item: { type: "layoutCell", value: cellProps },
    }),
    [cellProps]
  );

  const splitCell = () => {
    const result = window.prompt(`
    Enter 1 for horizontal split
    Enter 2 for vertical split
    `);
    if (result) {
      let split = HORIZONTAL_SPLIT;
      if (result.trim() === "1") {
        split = HORIZONTAL_SPLIT;
      } else if (result.trim() === "2") {
        split = VERTICAL_SPLIT;
      }

      const width =
        split === HORIZONTAL_SPLIT ? cellProps.width : cellProps.width / 2;
      const height =
        split === VERTICAL_SPLIT ? cellProps.height : cellProps.height / 2;
      onCellChange({
        ...cellProps,
        split,
        children: [
          {
            id: 1,
            level: cellProps.level + 1,
            width: width,
            height: height,
            image: cellProps.image,
            children: [],
          },
          {
            id: 2,
            level: cellProps.level + 1,
            width: width,
            height: height,
            children: [],
          },
        ],
      });
    }
  };

  const onNestedCellChange = useCallback(
    (updatedCell) =>
      onCellChange({
        ...cellProps,
        children: cellProps.children.map((c) =>
          c.id === updatedCell.id ? updatedCell : c
        ),
      }),
    [cellProps, onCellChange]
  );

  const onNestedCellSwap = useCallback(
    (sourceId, destinationId) => {
      const children = [...cellProps.children];
      const childIds = children.map((l) => l.id);
      const sourceIndex = childIds.indexOf(sourceId);
      const destinationIndex = childIds.indexOf(destinationId);
      children[sourceIndex] = cellProps.children[destinationIndex];
      children[destinationIndex] = cellProps.children[sourceIndex];
      onCellChange({
        ...cellProps,
        children: children,
      });
    },
    [cellProps, onCellChange]
  );

  const nestedLayout = cellProps.children.map((child) => {
    return (
      <LayoutCell
        key={child.id}
        cellProps={child}
        onCellChange={onNestedCellChange}
        onCellSwap={onNestedCellSwap}
      />
    );
  });

  if (nestedLayout.length > 0) {
    const containerProps = {
      className: "layout-cell draggable",
      style: {
        width: cellProps.width,
        height: cellProps.height,
        display: "flex",
        flexDirection: cellProps.split === HORIZONTAL_SPLIT ? "column" : "row",
      },
    };

    const children = nestedLayout;
    if (cellProps.level === 1) {
      return (
        <div ref={drop}>
          <div {...containerProps} ref={drag}>
            {children}
          </div>
        </div>
      );
    } else {
      return (
        <div ref={drop} {...containerProps}>
          {children}
        </div>
      );
    }
  }

  if (cellProps.image) {
    const containerProps = {
      className: "layout-cell draggable",
      style: { width: cellProps.width, height: cellProps.height },
      onClick: splitCell,
    };
    const children = (
      <img
        src={cellProps.image}
        alt={cellProps.image}
        width="100%"
        height="100%"
      />
    );
    if (cellProps.level === 1) {
      return (
        <div ref={drop}>
          <div {...containerProps} ref={drag}>
            {children}
          </div>
        </div>
      );
    } else {
      return (
        <div ref={drop} {...containerProps}>
          {children}
        </div>
      );
    }
  }
  return (
    <div
      ref={drop}
      className="layout-cell"
      style={{ width: cellProps.width, height: cellProps.height }}
      onClick={splitCell}
    />
  );
};

export default LayoutCell;
