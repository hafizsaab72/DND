import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Resizable, ResizableBox } from "react-resizable";
import CustomResizeHandle from "./CustomResizeHandle";

const DraggedItem = ({
  element,
  items,
  setItems,
  index,
  isDraggingOverElement,
  setIsDraggingOverElement,
  dimensionsArray,
  setDimensionsArray,
}) => {
  const handleDrop = (event) => {
    let itemReceived = event.dataTransfer.getData("element");
    itemReceived = JSON.parse(itemReceived);
    const { id, stackable } = itemReceived;
    const newItem = { id: uuidv4(), title: `Stackable Item ${id}` };

    const tempStack = items.map((ele) => {
      if (ele.id === element.id) {
        let tempEleStack = ele.stack ? [...ele.stack] : [];
        return {
          ...ele,
          stack: [...tempEleStack, newItem],
        };
      } else {
        return ele;
      }
    });
    setItems([...tempStack]);
    if (isDraggingOverElement === "stack-container")
      setIsDraggingOverElement("container");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (isDraggingOverElement === "container")
      setIsDraggingOverElement("stack-container");
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("stack-container-index", index);
  };

  const reArrangeItems = (e, index) => {
    const sourceIndex = e.dataTransfer.getData("stack-container-index");
    if (isDraggingOverElement === "container" || sourceIndex) {
      e.preventDefault();
      const newItems = [...items];
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(index, 0, removed);
      setItems([...newItems]);
    }
    if (isDraggingOverElement === "stack-container")
      setIsDraggingOverElement("container");
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    if (isDraggingOverElement === "stack-container") {
      setIsDraggingOverElement("container");
    }
  };

  const onResize = (event, { resizeElement, size, handle }) => {
    event.preventDefault();
    setDimensionsArray({
      ...dimensionsArray,
      [element.id]: { width: size.width, height: size.height },
    });
  };

  return (
    <div
      className="draggedItem"
      key={element.id}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDrop={(e) => reArrangeItems(e, index)}
      onDragOver={handleDragOver}
      style={{
        width: `${dimensionsArray[element.id]?.width ?? 200}px`,
        height: `${dimensionsArray[element.id]?.height ?? 200}px`,
      }}
    >
      <div
        key={element.id}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={onDragLeave}
      >
        <Resizable
          height={dimensionsArray[element.id]?.height ?? 200}
          width={dimensionsArray[element.id]?.width ?? 200}
          onResize={onResize}
          handle={<CustomResizeHandle />}
          handleSize={[8, 8]}
        >
          <div
            style={{
              width: dimensionsArray[element.id]?.width ?? 200 + "px",
              height: dimensionsArray[element.id]?.height ?? 200 + "px",
            }}
          >
            {element?.title}
            Dimensions :{dimensionsArray[element.id]?.height ?? 200} X{" "}
            {dimensionsArray[element.id]?.width ?? 200}
            {element?.stack?.length &&
              element.stack?.map((stackItem) => {
                return (
                  <div key={stackItem.id} className="stack" draggable>
                    {stackItem.title}
                    Aliqua nulla ut eu ex fugiat in anim cillum nisi velit
                    excepteur velit proident in. Laborum cupidatat deserunt
                    laborum et nisi ea sint sint eu laboris veniam. Adipisicing
                    sint velit duis ullamco excepteur est ullamco commodo. Anim
                    voluptate eu in elit enim nisi cupidatat non eu.
                  </div>
                );
              })}
          </div>
        </Resizable>
      </div>
    </div>
  );
};

export default DraggedItem;
