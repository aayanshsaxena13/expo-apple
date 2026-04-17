import { Animated, Dimensions, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import NativeSlider from "@react-native-community/slider";
import { themes } from "@/constants/themes";

const dim = Dimensions.get("window");

export function TextField({ placeholder, alignment, color, secondaryColor, role, value, onChange, margin }: { alignment?: any, color?: any, role?: boolean, value?: string, onChange?: any, margin?: any, placeholder?: string, secondaryColor?: any }) {
  return (
    <TextInput
      placeholder={placeholder}
      defaultValue={value}
      onChangeText={onChange}
      style={{
        alignSelf: alignment,
        color: color ? color : "white",
        fontWeight: 700,
        padding: dim.width < 420 ? 8 : 12,
        margin: margin,
        backgroundColor: "rgba(59, 59, 59, 0.7)",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: dim.width < 420 ? 280 : 320,
        borderBottomWidth: dim.width < 420 ? 2 : 4,
        borderColor: secondaryColor ? secondaryColor : themes.neutral.secondary,
        fontSize: dim.width < 420 ? 20 : 24,
        overflow: "hidden",
      }}
      secureTextEntry={role}
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
  alignment?: any;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // quick scale animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 80,
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
  onValueChange?: any;
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
      minimumTrackTintColor="#0084ff"
      maximumTrackTintColor="rgba(255,255,255,0.7)"
      thumbTintColor="#00ff95"
    />
  );
}