//@flow
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import GridContainer from "./components/GridContainer";

const store = configureStore();

const theme = {
  ...DEFAULT_THEME,
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GridContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
