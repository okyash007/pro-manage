import { Provider } from "react-redux";
import Body from "./Body";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}

export default App;
