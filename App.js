import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  // 사용자의 입력값 상태 관리 변수
  const [enteredTodoText, setEnteredTodoText] = useState("");

  const [todoLists, setTodoLists] = useState([]);

  // 사용자가 내용을 입력할 때, 해당 입력값을 가져오는 함수
  const todoInputHandler = (enteredText) => {
    // console.log(enteredText);
    setEnteredTodoText(enteredText);
  };

  // 버튼을 누르면 할 일 목록을 추가하는 함수
  const addTodoHandler = () => {
    // console.log(enteredTodoText);

    // useState로 관리하는 상태 변수의 setter 안에 콜백 함수를 작성하면,
    // 그 콜백 함수의 매개값은 항상 해당 상태 변수의 최신 값이 전달됩니다.
    setTodoLists((currentTodoLists) => [
      ...currentTodoLists,
      { text: enteredTodoText, key: Math.random.toString() },
    ]);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="할 일을 입력하세요!"
          onChangeText={todoInputHandler}
        />
        <Button title="할 일 추가하기" onPress={addTodoHandler} />
      </View>
      <View style={styles.todoContainer}>
        {/* ScrollView는 전체 화면이 렌더링 될 때 안의 항목들을 전부 렌더링 합니다.
            이로 인해, 성능의 저하가 발생할 수 있습니다.
            (보이지 않는 영역까지 렌더링을 진행하기 때문에 목록이 많다면 로딩이 길어짐.)
            FlatList는 보이는 영역만 일단 렌더링을 진행하고, 나머지 항목들은 스크롤이 움직임이
            발생하면 렌더링을 진행합니다. */}
        <FlatList
          data={todoLists}
          renderItem={(itemData) => {
            return (
              // react-native는 스타일 상속의 개념이 없어서 각각 스타일을 지정해야 한다
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>{itemData.item.text}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.key;
          }}
          alwaysBounceVertical={false}
        ></FlatList>
      </View>
    </View>
  );
}

// 인라인 방식으로 스타일을 적용시킨다
// 공통된 디자인을 묶어서 쓰면 좋음
const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16, // 좌우 패딩 동시 지정
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  todoContainer: {
    flex: 4,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#520acc",
  },
  goalText: {
    color: "white",
  },
});
