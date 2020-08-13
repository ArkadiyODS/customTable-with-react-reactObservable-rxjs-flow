//@flow
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";

import Test from "./components/test";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...DEFAULT_THEME, rtl: true }}>
        <Test />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
