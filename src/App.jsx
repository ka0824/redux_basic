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
