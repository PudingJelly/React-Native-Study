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

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  // 모달 상태변수 관리
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // 할 일 추가 모달을 띄워주는 함수
  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  // 모달 끄기 함수
  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

  // 사용자의 입력값 상태 관리 변수
  const [todoGoals, setTodoGoals] = useState([]);

  // 버튼을 누르면 할 일 목록을 추가하는 함수
  const addGoalHandler = (enteredGoalText) => {
    // console.log(enteredTodoText);

    // useState로 관리하는 상태 변수의 setter 안에 콜백 함수를 작성하면,
    // 그 콜백 함수의 매개값은 항상 해당 상태 변수의 최신 값이 전달됩니다.
    setTodoGoals((currentTodoGoals) => [
      ...currentTodoGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  };

  const deleteGoalHandler = (id) => {
    // console.log("DELETE!");
    setTodoGoals((currentTodoGoals) => {
      return currentTodoGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='할 일 추가하기!'
          color='#5e0acc'
          onPress={startAddGoalHandler}
        />
        {/* {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} />} */}
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalContainer}>
          {/* ScrollView는 전체 화면이 렌더링 될 때 안의 항목들을 전부 렌더링 합니다.
            이로 인해, 성능의 저하가 발생할 수 있습니다.
            (보이지 않는 영역까지 렌더링을 진행하기 때문에 목록이 많다면 로딩이 길어짐.)
            FlatList는 보이는 영역만 일단 렌더링을 진행하고, 나머지 항목들은 스크롤이 움직임이
            발생하면 렌더링을 진행합니다. */}
          <FlatList
            data={todoGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              // console.log("item: " + item);
              // console.log("index: " + index);
              return item.id;
            }}
            alwaysBounceVertical={false}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

// 인라인 방식으로 스타일을 적용시킨다
// 공통된 디자인을 묶어서 쓰면 좋음
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16, // 좌우 패딩 동시 지정
    // backgroundColor: "#1e085a",
  },
  goalContainer: {
    flex: 4,
  },
});
