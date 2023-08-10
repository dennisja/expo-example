import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type IconButtonProps = {
  iconName: ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  onPress?: PressableProps["onPress"];
};

const IconButton = ({ iconName, label, onPress }: IconButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.iconButton}>
      <MaterialIcons name={iconName} style={{ color: "#fff" }} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});

export { IconButton };
