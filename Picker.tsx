import { Animated, Dimensions, DimensionValue, FlexAlignType, Platform, Pressable, useColorScheme, View } from "react-native";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "./constants/themes";
import Menu from "./Menu";
import { GlassView } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { Paragraph } from "./RichText";

const dim = Dimensions.get("window");

export default function Picker(props: {
    options: string[];
    setOption: (i: string) => void;
    margin?: number;
    alignment?: FlexAlignType;
    variant: "segmented" | "menu";
    option: string;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const [visible, setVisible] = useState<boolean>(false);
    const cellWidth: DimensionValue = `${100 / props.options.length}%`;
    const colorScheme = useColorScheme();
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
            {Platform.OS === "ios" && props.variant === "menu" &&
                <View style={{
                    margin: props.margin,
                    alignSelf: props.alignment,
                }}>
                    <Animated.View style={{
                        transform: [{ scale }],
                    }}>
                        <GlassView style={{
                            padding: dim.width < 450 ? 12 : 18,
                            borderRadius: dim.width < 450 ? 24 : 36,
                        }} glassEffectStyle={"regular"}>
                            <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={async () => {
                                setVisible(true);
                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            }}>
                                <Ionicons size={dim.width < 450 ? 24 : 36} name="chevron-expand-outline" color={themes.blue.primary} />
                            </Pressable>
                        </GlassView>
                    </Animated.View>

                    <Menu options={props.options} visible={visible} setOption={props.setOption} setVisible={setVisible} />
                </View>
            }
            {Platform.OS === "ios" && props.variant === "segmented" &&
                <View style={{
                    margin: props.margin,
                    alignSelf: props.alignment,
                    flexDirection: "row",
                    width: "100%",
                }}>
                    {props.options.map((val: string, i: number) => (
                        <SGC key={i.toString()} props={props} val={val} i={i} cellWidth={cellWidth} colorScheme={colorScheme} />
                    ))}
                </View>
            }
        </>
    )
}

function SGC({ colorScheme, props, val, cellWidth, i }: any) {
    const scale = useRef(new Animated.Value(1)).current;

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
        <Animated.View style={{ transform: [{ scale }], width: cellWidth }}>
            <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={() => props.setOption(val)}>
                <GlassView tintColor={props.option !== val ? "rgba(31, 31, 31, 0.1)" : "rgba(31, 31, 31, 0.3)"}
                    style={{
                        padding: dim.width < 450 ? 12 : 16,
                        borderTopLeftRadius: i === 0 ? dim.width < 450 ? 12 : 16 : 0,
                        borderTopRightRadius: i === props.options.length - 1 ? dim.width < 450 ? 12 : 16 : 0,
                        borderBottomLeftRadius: i === 0 ? dim.width < 450 ? 12 : 16 : 0,
                        borderBottomRightRadius: i === props.options.length - 1 ? dim.width < 450 ? 12 : 16 : 0,
                    }}>
                    <Paragraph color={colorScheme !== "dark" ? "black" : "white"} alignment="center">{val}</Paragraph>
                </GlassView>
            </Pressable>
        </Animated.View>
    );
}