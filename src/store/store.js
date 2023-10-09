import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// store를 생성
// createStore은 현재 권장되지 않는 방법, 앞으로는 toolkit의 configureStore를 사용합시다.
// store에는 rootReducer를 넣어줌
// composeWithDevTools를 넣어 redux 스토어의 변화를 확인할 수 있음
const store = createStore(rootReducer, composeWithDevTools());

export default store;
