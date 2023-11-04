import { useDrag } from "react-dnd";

const ImageContainer = ({ image }) => {
  const [, drag] = useDrag(
    () => ({
      type: "image",
      item: { type: "image", value: image },
    }),
    [image]
  );
  return (
    <div ref={drag} className="image-container draggable">
      {<img src={image} alt={image} />}
    </div>
  );
};

export default ImageContainer;
