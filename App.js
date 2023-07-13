import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View>
        <TextInput placeholder="할 일을 입력하세요!" />
        <Button title="할 일 추가하기" />
      </View>
      <View>
        <Text>할 일 목록들...</Text>
      </View>
    </View>
  );
}

// 인라인 방식으로 스타일을 적용시킨다
// 공통된 디자인을 묶어서 쓰면 좋음
const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  },
});
