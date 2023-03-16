import React, { useState } from "react";
import "./sample.css";

function Sample() {
  const [elements, setElements] = useState([
    { id: 1, name: "Element 1" },
    { id: 2, name: "Element 2" },
    { id: 3, name: "Element 3" },
    { id: 4, name: "Element 4" },
  ]);

  const [items, setItems] = useState([]);

  const [draggedItem, setDraggedItem] = useState(null);

  const onDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverItem = items.find((item) => item.position === index);
    console.log(
      "🚀 ~ file: sample.js:23 ~ onDragOver ~ draggedOverItem:",
      draggedOverItem
    );
    if (draggedOverItem === undefined) {
      const newItems = [...items];
      const updatedItem = { ...draggedItem, position: index };
      newItems.splice(index, 0, updatedItem);
      console.log("🚀 ~ file: sample.js:31 ~ onDragOver ~ newItems:", newItems);
      setItems(newItems);
    }
    // else {
    //   const newItems = items.map((item) => {
    //     if (item.position <= index) {
    //       return item;
    //     } else {
    //       return {
    //         ...item,
    //         position: item.position + 1,
    //       };
    //     }
    //   });
    //   const updatedItem = { ...draggedItem, position: index };
    //   newItems.splice(index, 0, updatedItem);
    //   setItems(newItems);
    // }
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };

  const onElementDragStart = (e, element) => {
    e.dataTransfer.setData("text/plain", element.id);
  };

  const onCanvasDrop = (e, index) => {
    e.preventDefault();
    const elementId = e.dataTransfer.getData("text");
    const element = elements.find((elem) => elem.id.toString() === elementId);
    if (element !== undefined) {
      const newItems = [...items];
      const newItem = { id: Date.now(), name: element.name, position: index };
      newItems.splice(index, 0, newItem);
      setItems(newItems);
    }
  };

  console.log({ items });

  return (
    <div className="App">
      <div className="sidebar">
        {elements.map((element) => (
          <div
            key={element.id}
            className="element"
            draggable
            onDragStart={(e) => onElementDragStart(e, element)}
          >
            {element.name}
          </div>
        ))}
      </div>
      <div
        className="canvas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onCanvasDrop(e, items.length)}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            onDragOver={(e) => onDragOver(e, item.position)}
            onDragEnd={onDragEnd}
            style={{ order: item.position }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sample;
