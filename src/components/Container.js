import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import DraggedItem from "./DraggedItem";

const Container = () => {
  const [items, setItems] = useState([]);
  const [isDraggingOverElement, setIsDraggingOverElement] =
    useState("container");
  const [dimensionsArray, setDimensionsArray] = useState({});

  const handleDrop = (event) => {
    let itemReceived = event.dataTransfer.getData("element");
    if (itemReceived && isDraggingOverElement === "container") {
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
      setDimensionsArray((prev) => {
        return {
          ...prev,
          [uniqueId]: {
            height: 200,
            width: 200,
          },
        };
      });
      event.dataTransfer.setData("element", null);
    } else {
      event.preventDefault();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        className="container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
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
      </div>
      <button
        onClick={() =>
          console.log({ items, isDraggingOverElement, dimensionsArray })
        }
      >
        Show
      </button>
    </>
  );
};

export default Container;
