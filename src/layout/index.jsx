import ActionArea from "./ActionArea";
import LayoutArea from "./LayoutArea";
import PallateArea from "./PallateArea";
import './layout.css'

const Layout = () => {
  return (
    <div>
      <div className="action-container">
        <ActionArea />
      </div>
      <div className="pallate-layout-container">
        <PallateArea />
        <LayoutArea />
      </div>
    </div>
  );
};

export default Layout;
