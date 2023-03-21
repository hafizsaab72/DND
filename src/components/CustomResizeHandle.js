import React from "react";

const CustomResizeHandle = React.forwardRef((props, ref) => {
  const { handleAxis, ...restProps } = props;
  return <div className="custom-handle" ref={ref} {...restProps}></div>;
});

export default CustomResizeHandle;
