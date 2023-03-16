import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import DraggedItem from "./DraggedItem";

const Container = () => {
  const [items, setItems] = useState([]);
  const [isDraggingOverElement, setIsDraggingOverElement] = useState(false);

  const handleDrop = (event, index) => {
    if (isDraggingOverElement) {
      event.preventDefault();
    } else {
      let itemReceived = event.dataTransfer.getData("element");
      itemReceived = JSON.parse(itemReceived);
      const { id, stackable } = itemReceived;
      const newItem = {
        id: uuidv4(),
        title: `Parent Element ${id} ${
          stackable ? "stackable" : "non-stackable"
        } `,
      };
      setItems([...items, newItem]);
      setIsDraggingOverElement(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="container"
      onDrop={(e) => handleDrop(e, items.length)}
      onDragOver={handleDragOver}
    >
      {items?.map((item, index) => (
        <DraggedItem
          element={item}
          items={items}
          setItems={setItems}
          index={index}
          isDraggingOverElement={isDraggingOverElement}
          setIsDraggingOverElement={setIsDraggingOverElement}
        />
      ))}
    </div>
  );
};

export default Container;
