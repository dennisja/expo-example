import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import PlaceHolderImage from "./assets/images/background-image.png";
import { ImageViewer } from "./components/ImageViewer";
import { Button } from "./components/Button";
import { useState } from "react";
import { IconButton } from "./components/IconButton";
import { CircleButton } from "./components/CircleButton";

type SelectedImage = Pick<ImagePicker.ImagePickerResult["assets"][0], "uri">;

export default function App() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri });
      setShowAppOptions(true);
    } else {
      alert("You did not select any image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {};

  const onSaveImage = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={selectedImage || PlaceHolderImage}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton iconName="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              iconName="save-alt"
              label="Save"
              onPress={onSaveImage}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button variant="icon" label="Choose a photo" onPress={pickImage} />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
