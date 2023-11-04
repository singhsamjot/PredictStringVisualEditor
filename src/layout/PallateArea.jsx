import { ImageContainer } from "../components";

const IMAGE_LIST = [...new Array(20)].map(
  (_, index) => `image-${index + 1}.jpg`
);

const PallateArea = () => {
  return (
    <div className="pallate">
      {IMAGE_LIST.map((image) => {
        return <ImageContainer key={image} image={image} />;
      })}
    </div>
  );
};

export default PallateArea;
