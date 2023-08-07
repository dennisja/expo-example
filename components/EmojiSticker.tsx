import { Image, ImageProps, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

type EmojiStickerProps = {
  imageSize: number;
  stickerSource?: ImageProps["source"];
};

const EmojiSticker = ({ imageSize, stickerSource }: EmojiStickerProps) => {
  const scaleImage = useSharedValue(imageSize);

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = imageSize;
      }
    },
  });

  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  }));

  return (
    <View style={{ top: -350 }}>
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
        <AnimatedImage
          source={stickerSource}
          resizeMode="contain"
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
      </TapGestureHandler>
    </View>
  );
};

export { EmojiSticker };
