import { Animated, Dimensions, FlexAlignType, Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import NativeSlider from "@react-native-community/slider";
import { themes } from "./constants/themes";
import { Paragraph } from "./RichText";
import * as Haptics from "expo-haptics";

const dim = Dimensions.get("window");

export function TextField({ placeholder, alignment, color, security, value, onChange, margin }: { alignment?: FlexAlignType, color?: string, security?: boolean, value?: string, onChange?: (i: string) => void, margin?: number, placeholder?: string }) {
  return (
    <TextInput
      placeholder={placeholder}
      defaultValue={value}
      onChangeText={onChange}
      style={{
        alignSelf: alignment,
        color: color ? color : "white",
        fontWeight: 700,
        padding: 8,
        margin: margin,
        borderColor: "rgba(59, 59, 59, 0.5)",
        backgroundColor: "transparent",
        borderWidth: dim.width < 450 ? 1.6 : 3.2,
        width: dim.width < 450 ? 280 : 320,
        fontSize: dim.width < 450 ? 20 : 24,
        overflow: "hidden",
        borderRadius: 12,
      }}
      secureTextEntry={security}
    />
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
        margin: 12,
      }}>
        <Pressable style={({ pressed }) => [{
          backgroundColor: !pressed ? "rgba(31, 31, 31, 0.5)" : "rgba(62, 62, 62, 0.5)",
          padding: 12,
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          borderRightWidth: dim.width < 450 ? 1.6 : 3.2,
          borderColor: "rgba(134, 134, 134, 0.5)",
        }]} onPress={() => props.setValue((prev: number) => prev - 1)}>
          <Paragraph color={themes.blue.primary}>-</Paragraph>
        </Pressable>
        <Pressable style={({ pressed }) => [{
          backgroundColor: !pressed ? "rgba(31, 31, 31, 0.5)" : "rgba(62, 62, 62, 0.5)",
          padding: 12,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }]} onPress={() => props.setValue((prev: number) => prev + 1)}>
          <Paragraph color={themes.blue.primary}>+</Paragraph>
        </Pressable>
      </View>
    </View>
  );
}