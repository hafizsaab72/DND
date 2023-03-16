import React from "react";
import { v4 as uuidv4 } from "uuid";

const DraggedItem = ({
  element,
  items,
  setItems,
  index,
  isDraggingOverElement,
  setIsDraggingOverElement,
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
    setIsDraggingOverElement(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!isDraggingOverElement) {
      setIsDraggingOverElement(true);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const reArrangeItems = (e, index) => {
    const sourceIndex = e.dataTransfer.getData("index");
    if (!isDraggingOverElement || sourceIndex) {
      e.preventDefault();
      const newItems = [...items];
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(index, 0, removed);
      setItems([...newItems]);
    }
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOverElement(false);
  };

  return (
    <div
      key={element.id}
      className="draggedItemContainer"
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDrop={(e) => reArrangeItems(e, index)}
      onDragOver={handleDragOver}
    >
      <div
        key={element.id}
        className="draggedItem"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={onDragLeave}
      >
        {element.title}
        {element?.stack?.length &&
          element.stack?.map((stackItem) => {
            return (
              <div key={stackItem.id} className="stack">
                {stackItem.title}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DraggedItem;
