import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* redux를 이용하고자 하는 컴포넌트 최상단에 store를 적용 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
