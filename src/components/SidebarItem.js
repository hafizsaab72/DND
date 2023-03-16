import React, { useState } from "react";

const SidebarItem = ({ title, id, stackable }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event) => {
    setIsDragging(true);
    event.dataTransfer.setData("element", JSON.stringify({ id, stackable }));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`sidebar-item${isDragging ? " dragging" : ""}`}
    >
      {title}
    </div>
  );
};

export default SidebarItem;
