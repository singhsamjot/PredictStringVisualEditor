import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AppContextProvider from "./context";
import Layout from "./layout";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    </DndProvider>
  );
}

export default App;
