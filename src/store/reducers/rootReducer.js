import { combineReducers } from "redux";
import { infoReducer } from "./infoReducer";

// 생성한 리듀서를 하나로 묶어 줌
const rootReducer = combineReducers({
  info: infoReducer,
});

export default rootReducer;
