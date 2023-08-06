import { Image, ImageProps, StyleSheet } from "react-native";

type ImageViewerProps = {
  placeholderImageSource: ImageProps["source"];
};

const ImageViewer = ({ placeholderImageSource }: ImageViewerProps) => {
  return <Image source={placeholderImageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export { ImageViewer };
