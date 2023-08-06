import { FlatList, Image, Platform, Pressable, StyleSheet } from "react-native";

const emojiList = [
  require("../assets/images/emoji1.png"),
  require("../assets/images/emoji2.png"),
  require("../assets/images/emoji3.png"),
  require("../assets/images/emoji4.png"),
  require("../assets/images/emoji5.png"),
  require("../assets/images/emoji6.png"),
];

type EmojiListProps = {
  onSelect: (emoji: any) => void;
  onCloseModal: () => void;
};

const EmojiList = ({ onSelect, onCloseModal }: EmojiListProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emojiList}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
          >
            <Image key={index} source={item} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

export { EmojiList };
