import { Alert, Animated, Dimensions, FlexAlignType, Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import NativeSlider from "@react-native-community/slider";
import { themes } from "./constants/themes";
import { Paragraph } from "./RichText";

const dim = Dimensions.get("window");

export function TextField({ placeholder, alignment, color, secondaryColor, security, value, onChange, margin }: { alignment?: FlexAlignType, color?: string, security?: boolean, value?: string, onChange?: (i: string) => void, margin?: number, placeholder?: string, secondaryColor?: string }) {
  return (
    <TextInput
      placeholder={placeholder}
      defaultValue={value}
      onChangeText={onChange}
      style={{
        alignSelf: alignment,
        color: color ? color : "white",
        fontWeight: 700,
        padding: dim.width < 450 ? 8 : 12,
        margin: margin,
        backgroundColor: "rgba(59, 59, 59, 0.7)",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: dim.width < 450 ? 280 : 320,
        borderBottomWidth: dim.width < 450 ? 2 : 4,
        borderColor: secondaryColor ? secondaryColor : themes.neutral.secondary,
        fontSize: dim.width < 450 ? 20 : 24,
        overflow: "hidden",
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

  const handlePress = () => {
    // quick scale animation
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.85,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    onChange?.(); // parent toggle karega
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={{
        transform: [{ scale }],
        margin: margin,
        alignSelf: alignment
      }}>
        <Ionicons
          name={value ? "ellipse" : "ellipse-outline"}
          size={30}
          color="rgb(0, 92, 255)"
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
  value?: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  label?: string;
}) {
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      margin: props.margin,
      alignSelf: props.alignment,
    }}>
      <Paragraph margin={12} color={"white"}>{props.label ? props.label : props.value}</Paragraph>
      <View style={{
        flexDirection: "row",
        margin: 12
      }}>
        <Pressable style={({ pressed }) => [{
          backgroundColor: !pressed ? "rgba(73, 73, 73, 0.9)" : "rgba(73, 73, 73, 0.9)",
          padding: dim.width < 450 ? 12 : 16,
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          borderRightColor: "rgb(134, 134, 134)",
          borderRightWidth: dim.width < 450 ? 1.6 : 3.2
        }]} onPress={() => props.setValue ? props.setValue((prev: number) => prev - 1) : Alert.alert("Give the prop.")}>
          <Paragraph color={themes.blue.primary}>-</Paragraph>
        </Pressable>
        <Pressable style={({ pressed }) => [{
          backgroundColor: !pressed ? "rgba(73, 73, 73, 0.9)" : "rgba(73, 73, 73, 0.9)",
          padding: dim.width < 450 ? 12 : 16,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }]} onPress={() => props.setValue ? props.setValue((prev: number) => prev + 1) : Alert.alert("Give the prop.")}>
          <Paragraph color={themes.blue.primary}>+</Paragraph>
        </Pressable>
      </View>
    </View>
  );
}