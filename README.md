## redux 기본 라이브러리로 전역상태 관리하기 (without toolkit, 레거시)

>  **목차**
> 
> [1\. redux란?](#1-redux란)
> 
> [2\. redux의 구성](#2-redux의-구성)
> 
> [3\. 장점](#3-장점)
> 
> [4\. 단점](#4-단점)
> 
> [5\. 구현](#5-구현)

<br />
<hr />
<br />

### **1\. redux란?**

-   react에서 사용되는 전역 상태 관리 라이브러리
-   기존의 하향식 전달에서 벗어나 어디서든 상태를 참조, 변경을 가능하게끔 함

<br />
<hr />
<br />

### **2\. redux의 구성**

-   state
    -   redux에서 관리하는 상태 정보

<br />

-   action
    -   상태를 변경하는 요청
    -   어떠한 상태 변경을 하겠다를 타입에 명시
    -   ex) 이름을 변경시키겠다, 나이를 변경시키겠다

<br />

-   reducer
    -   이전 state와 action을 받아 새로운 상태를 반환하는 함수
    -   액션에 담긴 타입에 맞춰 로직 실행
    -   상태를 변경시키는 로직이 담겨 있음

<br />

-   store
    -   state, action, reducer 모두를 관리하는 중앙 저장소
    -   action을 reducer로 전달하여 상태 변경을 적용

<br />

-   dispatch
    -   action을 store로 전달하는 메서드

![redux 그림](https://github.com/ka0824/redux_basic/assets/79782594/63d53ae0-26a7-4b74-86ac-1462efd7087a)


<br />
<hr />
<br />

### **3\. 장점**

-   쉬운 디버깅
    -   redux devtools를 사용하면 디버깅이 쉬움

<br />

-   높은 점유율
    -   redux는 다른 상태 관리 라이브러리와 비교해 점유율이 높음
    -   따라서 관련 자료들을 쉽게 찾을 수 있음

<br />

-   middleware 지원
    -   middleware는 reducer가 action을 처리하기 전에 추가적인 로직을 가능하게 해줌
    -   비동기 작업, 인증 등 추가적인 작업을 처리가능
 
<br />
<hr />
<br />

### **4\. 단점**

-   boilerplate (작성해야 하는 코드가 많음)
    -   redux를 사용하기 위해 기본적으로 작성해야 하는 코드가 많은 편
    -   redux-toolkit 등의 라이브러리를 통해 코드를 줄일 수 있지만, 그럼에도 다른 상태 관리 라이브러리로 보다는 코드가 긴편

<br />

-   비동기 작업 복잡
    -   비동기 작업을 처리하기 위해 Redux Thunk, Redux Saga 등 middleware를 사용할 수 있지만, 이 역시 다른 상태 관리 라이브러리 보다 사용법이 다소 복잡한 편

<br />
<hr />
<br />

### **5\. 구현**

-   reducer 설치

<br />

```
npm i redux react-redux redux-devtools-extension
```

<br />

-   reducer를 작성
    -   초기 상태 값을 작성
    -   reducer 내부에 각 액션에 따라 어떠한 로직을 실행할 지 작성
    -   action을 작성, payload는 action의 parameter를 의미
    -   생성한 reducer와 action을 export

<br />

```
// store/reducers/infoReducer.js

// 기본 상태 값을 설정
const initialState = {
  name: "홍길동",
  age: 20,
};

// reducer를 작성
// 각 액션에 따라 어떠한 로직을 실행할 지 작성
const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGENAME":
      return { ...state, name: action.payload };
    case "CHANGEAGE":
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

// 액션 작성

// changeName 액션 작성
// payload는 action에 담긴 parameter를 의미
const changeName = (value) => ({
  type: "CHANGENAME",
  payload: value,
});

// changeAge 액션 작성
const changeAge = (value) => ({
  type: "CHANGEAGE",
  payload: value,
});

// 생성한 reducer와 action export
export { infoReducer, changeName, changeAge };
```

<br />

-   rootReducer 작성
    -    combineReducers를 통해 생성한 reducer를 모두 묶어줌
    -   comibineReducers에서 reducer에 지정한 키를 통해 상태를 불러 올 수 있음 (useSelector 부분 참고)

<br />

```
// store/reducers/rootReducer.js

import { combineReducers } from "redux";
import { infoReducer } from "./infoReducer";

// 생성한 리듀서를 하나로 묶어 줌
const rootReducer = combineReducers({

// state에서 해당 상태를 불러올 때 state.info를 통해 접근할 수 있음
  info: infoReducer,
});

export default rootReducer;
```

<br />

-   store 작성
    -   createStore은 현재 사용을 권장하지 않음. 현재 코드에서는 redux toolkit을 사용하지 않기에 사용
    -   store에 rootReducer 추가
    -   composeWithDevTools()를 적용하여 redux 개발자 도구 사용 가능

<br />

```
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// store를 생성
// createStore은 현재 권장되지 않는 방법, 앞으로는 toolkit의 configureStore를 사용합시다.
// store에는 rootReducer를 넣어줌
// composeWithDevTools를 넣어 redux 스토어의 변화를 확인할 수 있음
const store = createStore(rootReducer, composeWithDevTools());

export default store;
```

<br />

-   redux를 사용하고자 하는 컴포넌트 최상단에 store 적용

<br />

```
// main.jsx

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
```

<br />

-   redux 사용하기
    -   useSelector로 store 상태 불러오기
    -   useDispatch로 dispatch 사용하기
    -   dispatch를 통해 action을 store로 전달하기

<br />

```
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAge, changeName } from "./store/reducers/infoReducer";

function App() {

  // useSelector를 통해 store의 상태를 불러올 수 있음
  // rootReducer의 할당한 키를 통해 불러올 수 있음
  const info = useSelector((state) => state.info);

  // useDispatch에 action을 이용하면 상태 변화 로직을 실행할 수 있음
  const dispatch = useDispatch();

  const [name, setName] = useState("홍길동");
  const [age, setAge] = useState(20);

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputAge = (e) => {
    setAge(e.target.value);
  };

  const submitName = () => {
  
    // action을 dispatch를 통해 store로 전달
    // changeName에 해당하는 상태 변화 로직 실행
    dispatch(changeName(name));
  };

  const submitAge = () => {
  
    // action을 dispatch를 통해 store로 전달
    // changeAge에 해당하는 상태 변화 로직 실행
    dispatch(changeAge(age));
  };

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <div>{`현재 이름은 ${info.name} 입니다.`}</div>
      <div>{`현재 나이는 ${info.age}세 입니다.`}</div>
      <div>
        <label>
          이름
          <input onChange={handleInputName} />
        </label>
        <button onClick={submitName}>이름 변경</button>
      </div>
      <div>
        <label>
          나이
          <input type="number" onChange={handleInputAge} />
        </label>
        <button onClick={submitAge}>나이 변경</button>
      </div>
    </div>
  );
}

export default App;
```
