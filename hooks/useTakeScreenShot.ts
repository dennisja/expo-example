import { useRef } from "react";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { Platform, View } from "react-native";
import domToImage from "dom-to-image";

const useTakeScreenshot = () => {
  const screenshotRef = useRef<View>();

  const [mediaLibStatus, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();

  if (mediaLibStatus === null) {
    requestMediaLibraryPermission();
  }

  const onSaveImage = async () => {
    if (Platform.OS !== "web") {
      try {
        const localURI = await captureRef(screenshotRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localURI);
        if (localURI) {
          alert("Saved");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataURL = await domToImage.toJpeg(screenshotRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        const link = document.createElement("a");
        link.download = "sticker-smash";
        link.href = dataURL;
        link.click();
        link.remove();
      } catch (error) {
        console.log("Error");
      }
    }
  };

  return { screenshotRef, onSaveImage };
};

export { useTakeScreenshot };
