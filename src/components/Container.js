import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import DraggedItem from "./DraggedItem";

const Container = () => {
  const [items, setItems] = useState([]);
  const [isDraggingOverElement, setIsDraggingOverElement] =
    useState("container");
  const [dimensionsArray, setDimensionsArray] = useState({});

  const handleDrop = (event) => {
    if (isDraggingOverElement === "stack-container") {
      event.preventDefault();
    } else {
      let itemReceived = event.dataTransfer.getData("element");
      itemReceived = JSON.parse(itemReceived);
      const { id, stackable } = itemReceived;
      const uniqueId = uuidv4();

      const newItem = {
        id: uniqueId,
        title: `Parent Element ${id} ${
          stackable ? "stackable" : "non-stackable"
        } `,
      };
      setItems([...items, newItem]);

      if (isDraggingOverElement === "stack-container")
        setIsDraggingOverElement("container");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="container"
      onDrop={(e) => handleDrop(e)}
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
          dimensionsArray={dimensionsArray}
          setDimensionsArray={setDimensionsArray}
        />
      ))}
      <button
        onClick={() =>
          console.log({ items, isDraggingOverElement, dimensionsArray })
        }
      >
        Show
      </button>
    </div>
  );
};

export default Container;
