import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalItem = (props) => {
  return (
    // react-native는 스타일 상속의 개념이 없어서 각각 스타일을 지정해야 한다
    // 하나의 목록을 터치할 수 있도록 해주는 기능 Pressable
    <Pressable onPress={props.onDeleteItem}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
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
