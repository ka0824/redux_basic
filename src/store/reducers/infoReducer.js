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
