import { Animated, Dimensions, FlexAlignType, Platform, Pressable, View } from "react-native";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "./constants/themes";
import Menu from "./Menu";
import { GlassView } from "expo-glass-effect";

const dim = Dimensions.get("window");

export default function Picker(props: {
    options: string[];
    setOption: (i: string) => void;
    margin?: number;
    alignment?: FlexAlignType;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const [visible, setVisible] = useState<boolean>(false);

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 1.2,
            useNativeDriver: true,
        }).start();
    }

    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }

    return (
        <>
            {Platform.OS === "ios" &&
                <View style={{
                    margin: props.margin,
                    alignSelf: props.alignment,
                }}>
                    <Animated.View style={{
                        transform: [{ scale: scale }],
                    }}>
                        <GlassView style={{
                            padding: dim.width < 450 ? 12 : 18,
                            borderRadius: dim.width < 450 ? 24 : 36,
                        }} glassEffectStyle={"regular"}>
                            <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={() => setVisible(true)}>
                                <Ionicons size={dim.width < 450 ? 24 : 36} name="chevron-expand-outline" color={themes.blue.primary} />
                            </Pressable>
                        </GlassView>
                    </Animated.View>

                    <Menu options={props.options} visible={visible} setOption={props.setOption} setVisible={setVisible} />
                </View>
            }
        </>
    )
}