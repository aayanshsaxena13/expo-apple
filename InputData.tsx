import { Ionicons } from "@expo/vector-icons";
import NativeSlider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { Animated, Dimensions, FlexAlignType, Platform, Pressable, TextInput, View } from "react-native";
import { themes } from "./constants/themes";
import { Paragraph } from "./RichText";
import { GlassView } from "expo-glass-effect";
import { BlurView } from "expo-blur";

const dim = Dimensions.get("window");

export function TextField({ placeholder, alignment, color, security, value, onChange, margin }: { alignment?: FlexAlignType, color?: string, security?: boolean, value?: string, onChange?: (i: string) => void, margin?: number, placeholder?: string }) {
  return (
    <>
      {Platform.OS === "ios" ?
        <GlassView
          glassEffectStyle={"clear"}
          style={{
            alignSelf: alignment,
            margin,
            padding: 8,
            borderRadius: 12,
          }}
        >
          <TextInput
            placeholder={placeholder}
            defaultValue={value}
            onChangeText={onChange}
            style={{
              color: color ? color : "white",
              fontWeight: 700,
              fontSize: 16,
              overflow: "hidden",
            }}
            secureTextEntry={security}
          />
        </GlassView> :
        <BlurView
          style={{
            borderColor: "rgba(59, 59, 59, 0.5)",
            borderWidth: dim.width < 450 ? 1.6 : 3.2,
            margin,
            padding: 8,
            alignSelf: alignment,
            borderRadius: 12,
            overflow: "hidden"
          }}>
          <TextInput
            placeholder={placeholder}
            defaultValue={value}
            onChangeText={onChange}
            style={{
              color: color ? color : "white",
              fontWeight: 700,
              fontSize: 16,
              overflow: "hidden",
            }}
            secureTextEntry={security}
          />
        </BlurView>
      }
    </>
  );
}

export function Checkbox({
  value = false,
  onChange,
  margin,
  alignment
}: {
  value?: boolean;
  onChange?: () => void;
  margin?: number;
  alignment?: FlexAlignType;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePress = async () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.05,
        useNativeDriver: true
      }),
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true
      })
    ]).start();

    onChange?.();

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={{
        margin: margin,
        alignSelf: alignment,
        transform: [{ scale: scale }],
        width: 30
      }}>
        <Ionicons
          name={value ? "checkbox" : "square-outline"}
          size={30}
          color={themes.blue.primary}
        />
      </Animated.View>
    </Pressable>
  );
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  width = 250,
}: {
  value?: number;
  onValueChange?: (i: number) => void;
  min?: number;
  max?: number;
  step?: number,
  width?: number;
}) {
  return (
    <NativeSlider
      style={{ width, height: 40 }}
      minimumValue={min}
      maximumValue={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
    />
  );
}

export function Stepper(props: {
  margin?: number;
  alignment?: FlexAlignType;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  label?: string;
}) {
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      margin: props.margin,
      alignSelf: props.alignment,
    }}>
      {props.label && <Paragraph margin={12} color={"white"}>{props.label}</Paragraph>}
      <View style={{
        flexDirection: "row",
        margin: 8,
      }}>
        <Pressable style={({ pressed }) => [{
          backgroundColor: !pressed ? "rgba(31, 31, 31, 0.5)" : "rgba(62, 62, 62, 0.5)",
          padding: 8,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          borderRightWidth: dim.width < 450 ? 1.6 : 3.2,
          borderColor: "rgba(134, 134, 134, 0.5)",
        }]} onPress={() => props.setValue((prev: number) => prev - 1)}>
          <Paragraph color={themes.blue.primary}>-</Paragraph>
        </Pressable>
        <Pressable style={({ pressed }) => [{
          backgroundColor: !pressed ? "rgba(31, 31, 31, 0.5)" : "rgba(62, 62, 62, 0.5)",
          padding: 8,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
        }]} onPress={() => props.setValue((prev: number) => prev + 1)}>
          <Paragraph color={themes.blue.primary}>+</Paragraph>
        </Pressable>
      </View>
    </View>
  );
}