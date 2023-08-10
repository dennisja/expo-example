import { useRef } from "react";
import { Image, ImageProps, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const AnimatedView = Animated.createAnimatedComponent(View);

type EmojiStickerProps = {
  imageSize: number;
  stickerSource?: ImageProps["source"];
};

const EmojiSticker = ({ imageSize, stickerSource }: EmojiStickerProps) => {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateOffsetRef = useRef<{ translateX: number; translateY: number }>(
    {
      translateX: 0,
      translateY: 0,
    }
  );

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

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      translateOffsetRef.current.translateX = translateX.value;
      translateOffsetRef.current.translateY = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = e.translationX + translateOffsetRef.current.translateX;
      translateY.value = e.translationY + translateOffsetRef.current.translateY;
    });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </GestureDetector>
  );
};

export { EmojiSticker };
