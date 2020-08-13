//@flow
import React from "react";
import {
  ThemeProvider,
  DEFAULT_THEME,
  PALETTE,
} from "@zendeskgarden/react-theming";
import { Dropdown, Menu, Item, Trigger } from "@zendeskgarden/react-dropdowns";

import { Dots } from "@zendeskgarden/react-loaders";

function App() {
  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME, rtl: true }}>
      <h1>Hello</h1>
      <Dropdown onSelect={(value) => console.log(`Selected: ${value}`)}>
        <Trigger>
          <button>This triggers a menu</button>
        </Trigger>
        <Dots color={PALETTE.blue[600]} />
        <Menu placement="end" arrow>
          <Item value="option-1">Option 1</Item>
          <Item value="option-2">Option 2</Item>
          <Item value="option-3">Option 3</Item>
        </Menu>
      </Dropdown>
    </ThemeProvider>
  );
}

export default App;
