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
    if (itemReceived && isDraggingOverElement === "stack-container") {
      itemReceived = JSON.parse(itemReceived);
      const { id, stackable } = itemReceived;
      const uniqueId = uuidv4();
      const newItem = { id: uniqueId, title: `Stackable Item ${id}` };
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
      setDimensionsArray((prev) => {
        return {
          ...prev,
          [element?.id]: {
            ...prev[element?.id],
            stackDimensions: {
              ...prev[element?.id]?.stackDimensions,
              [uniqueId]: {
                width: 50,
                height: 50,
              },
            },
          },
        };
      });
      if (isDraggingOverElement === "stack-container")
        setIsDraggingOverElement("container");
      event.dataTransfer.setData("element", null);
    } else {
      event.preventDefault();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (isDraggingOverElement !== "stack-container") {
      setIsDraggingOverElement("stack-container");
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("stack-container-index", index);
  };

  const reArrangeItems = (e, index) => {
    const sourceIndex = e.dataTransfer.getData("stack-container-index");
    if (
      isDraggingOverElement === "container" ||
      (sourceIndex && isDraggingOverElement !== "stack")
    ) {
      e.preventDefault();
      const newItems = [...items];
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(index, 0, removed);
      setItems([...newItems]);
      e.dataTransfer.setData("stack-container-index", null);
    }
    if (isDraggingOverElement === "stack-container")
      setIsDraggingOverElement("container");
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    if (isDraggingOverElement !== "container") {
      setIsDraggingOverElement("container");
    }
  };

  const onStackContainerResize = (event, { resizeElement, size, handle }) => {
    event.preventDefault();
    setDimensionsArray((prev) => {
      return {
        ...prev,
        [element.id]: {
          ...prev[element.id],
          width: size.width,
          height: size.height,
        },
      };
    });
  };

  const onStackResize = (event, { resizeElement, size, handle }, id) => {
    event.preventDefault();
    setDimensionsArray((prev) => {
      return {
        ...prev,
        [element?.id]: {
          ...prev[element?.id],
          stackDimensions: {
            ...prev[element?.id]?.stackDimensions,
            [id]: { width: size.width, height: size.height },
          },
        },
      };
    });
  };

  const onStackDragStart = (e, index) => {
    e.dataTransfer.setData("stack-index", index);
  };

  const onStackDragOver = (e) => {
    e.preventDefault();
    if (isDraggingOverElement !== "stack") setIsDraggingOverElement("stack");
  };

  const onStackDragLeave = (e) => {
    e.preventDefault();
    if (isDraggingOverElement === "stack")
      setIsDraggingOverElement("stack-container");
  };

  const onStackDrop = (e, index) => {
    const sourceIndex = e.dataTransfer.getData("stack-index");
    if (sourceIndex) {
      e.preventDefault();
      const newItems = [...element?.stack];
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(index, 0, removed);
      const tempItemsStack = items.map((ele) => {
        if (ele.id === element.id) {
          return {
            ...ele,
            stack: [...newItems],
          };
        } else {
          return ele;
        }
      });
      setItems(tempItemsStack);
      e.dataTransfer.setData("stack-index", null);
    }
    if (isDraggingOverElement === "stack-container")
      setIsDraggingOverElement("container");
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
          onResize={onStackContainerResize}
          handle={<CustomResizeHandle />}
          handleSize={[8, 8]}
        >
          <div
            style={{
              width: dimensionsArray[element?.id]?.width ?? 200 + "px",
              height: dimensionsArray[element?.id]?.height ?? 200 + "px",
            }}
          >
            {element?.title}
            Dimensions :{dimensionsArray[element.id]?.height ?? 200} X{" "}
            {dimensionsArray[element.id]?.width ?? 200}
            {element?.stack?.length &&
              element.stack?.map((stackItem, i) => {
                let width =
                  dimensionsArray[element?.id]?.stackDimensions[stackItem?.id]
                    ?.width ?? 50;
                let height =
                  dimensionsArray[element?.id]?.stackDimensions[stackItem?.id]
                    ?.height ?? 50;
                return (
                  <div
                    className="stack-resize"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                  >
                    <Resizable
                      height={height}
                      width={width}
                      onResize={(e, data) =>
                        onStackResize(e, data, stackItem?.id)
                      }
                      handle={<CustomResizeHandle />}
                      handleSize={[8, 8]}
                    >
                      <div
                        key={stackItem?.id}
                        className="stack"
                        draggable
                        onDragStart={(e) => onStackDragStart(e, i)}
                        onDragOver={onStackDragOver}
                        onDragLeave={onStackDragLeave}
                        onDrop={(e) => onStackDrop(e, i)}
                        style={{
                          width: `${width}px`,
                          height: `${height}px`,
                        }}
                      >
                        Dimensions :{width} X {height}
                        {stackItem.title} {stackItem.id}
                      </div>
                    </Resizable>
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
