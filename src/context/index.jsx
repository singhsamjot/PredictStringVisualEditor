import React, { useCallback, useMemo, useState } from "react";

export const AppContext = React.createContext({});

const DEFAULT_DIMENSION = 320;

const DEFAULT_LAYOUT = [
  {
    id: 1,
    level: 1,
    width: DEFAULT_DIMENSION,
    height: DEFAULT_DIMENSION,
    children: [],
  },
  {
    id: 2,
    level: 1,
    width: DEFAULT_DIMENSION,
    height: DEFAULT_DIMENSION,
    children: [],
  },
  {
    id: 3,
    level: 1,
    width: DEFAULT_DIMENSION,
    height: DEFAULT_DIMENSION,
    children: [],
  },
];

const NEW_LAYOUT = {
  id: -1,
  layout: DEFAULT_LAYOUT,
  label: "New Layout",
};

const AppContextProvider = ({ children }) => {
  const [layoutList, setLayoutList] = useState([NEW_LAYOUT]);
  const [selectedLayoutId, setSelectedLayoutId] = useState(-1);

  const selectedLayout = useMemo(() => {
    return layoutList.find((l) => l.id === selectedLayoutId);
  }, [layoutList, selectedLayoutId]);

  const onSelectedLayoutChange = useCallback(
    (updatedLayout) => {
      setLayoutList((prev) =>
        prev.map((l) =>
          l.id === selectedLayoutId ? { ...l, layout: updatedLayout } : l
        )
      );
    },
    [selectedLayoutId]
  );

  const onAddNewLayoutCell = () => {
    const maxId = selectedLayout.layout.length
      ? Math.max(...selectedLayout.layout.map((item) => item.id))
      : 0;
    const nextId = maxId + 1;
    onSelectedLayoutChange(
      selectedLayout.layout.concat({
        id: nextId,
        width: DEFAULT_DIMENSION,
        height: DEFAULT_DIMENSION,
        children: [],
      })
    );
    window.alert("Layout cell added successfully.");
  };

  const onSaveNewLayout = (name) => {
    const existingLayouts = layoutList.filter((item) => item.id !== -1);
    const maxId = existingLayouts.length
      ? Math.max(...existingLayouts.map((item) => item.id))
      : 0;
    const nextId = maxId + 1;

    setLayoutList([
      NEW_LAYOUT,
      {
        ...selectedLayout,
        id: nextId,
        label: name,
      },
      ...existingLayouts,
    ]);
    setSelectedLayoutId(nextId);
    return nextId;
  };

  const onLayoutSelectionChange = (id) => setSelectedLayoutId(id);

  return (
    <AppContext.Provider
      value={{
        layoutList,
        selectedLayout,
        onSelectedLayoutChange,
        onSaveNewLayout,
        onLayoutSelectionChange,
        onAddNewLayoutCell,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
