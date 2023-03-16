import React from "react";

import Container from "./components/Container";
import SidebarItem from "./components/SidebarItem";
import "./App.css";
import Sample from "./components/sample";

const App = () => {
  return (
    <>
      <div className="App">
        <div className="sidebarContainer">
          <div className="sidebar">
            <SidebarItem
              id="1"
              title="Non-Stackable Item 1"
              stackable={false}
            />
            <SidebarItem
              id="2"
              title="Non-Stackable Item 2"
              stackable={false}
            />
            <SidebarItem
              id="3"
              title="Non-Stackable Item 3"
              stackable={false}
            />
            <SidebarItem
              id="4"
              title="Non-Stackable Item 4"
              stackable={false}
            />
          </div>
          <div className="sidebar">
            <SidebarItem id="1" title="Stackable Item 1" stackable={true} />
            <SidebarItem id="2" title="Stackable Item 2" stackable={true} />
            <SidebarItem id="3" title="Stackable Item 3" stackable={true} />
            <SidebarItem id="4" title="Stackable Item 4" stackable={true} />
          </div>
        </div>
        <div>
          <Container />
        </div>
      </div>
      {/* <Sample /> */}
    </>
  );
};

export default App;
