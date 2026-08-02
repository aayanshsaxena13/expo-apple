import { Ionicons } from "@expo/vector-icons";
import { GlassView } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import { Animated, FlexAlignType, Platform, Pressable, ScrollView, View } from "react-native";
import { GlassButton } from "./Button";
import { themes } from "./constants/themes";
import Menu from "./Menu";
import { Paragraph } from "./RichText";

export default function Picker(props: {
    options: string[];
    setOption: (i: string) => void;
    margin?: number;
    alignment?: FlexAlignType;
    variant: "segmented" | "menu" | "wheel";
    option: string;
    wheelWidth?: number;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const [visible, setVisible] = useState<boolean>(false);
    const left = useRef(new Animated.Value(0)).current;
    const wheelRef = useRef<ScrollView>(null);
    const wheelWidth = props.wheelWidth ?? 240;

    return (
        <>
            {Platform.OS === "ios" && props.variant === "menu" &&
                <View style={{
                    margin: props.margin,
                    alignSelf: props.alignment,
                }}>
                    <GlassButton onPress={() => setVisible(true)}>
                        <Ionicons name="chevron-expand-outline" size={32} />
                    </GlassButton>

                    <Menu options={props.options} visible={visible} setOption={props.setOption} setVisible={setVisible} />
                </View>
            }
            {Platform.OS === "ios" && props.variant === "segmented" &&
                <GlassView style={{
                    margin: props.margin,
                    alignSelf: props.alignment,
                    flexDirection: "row",
                    width: 300,
                    position: "relative",
                    borderRadius: 24
                }} glassEffectStyle={"regular"}>
                    {/* Moment of truth list */}
                    {props.options.map((val: string, i: number) => (
                        <View key={i.toString()} style={{
                            width: 300 / props.options.length,
                            height: 36,
                            padding: 4,
                            zIndex: 1,
                        }}>
                            <Pressable onPressIn={() => {
                                Animated.sequence([
                                    Animated.timing(scale, {
                                        toValue: 1.2,
                                        duration: 100,
                                        useNativeDriver: true,
                                    }),
                                    Animated.parallel([
                                        Animated.spring(left, {
                                            toValue: (300 / props.options.length) * i,
                                            useNativeDriver: true,
                                        }),
                                        Animated.timing(scale, {
                                            toValue: 1,
                                            duration: 100,
                                            useNativeDriver: true,
                                        }),
                                    ])
                                ]).start();
                            }} onPressOut={() => props.setOption(val)}>
                                <View style={{ height: 36 }}>
                                    <Paragraph color={props.option === val ? themes.blue.primary : "white"} alignment="center">{val}</Paragraph>
                                </View>
                            </Pressable>
                        </View>
                    ))}

                    {/* Glass pill selector */}
                    <Animated.View style={{
                        transform: [{ translateX: left }, { scale }],
                        position: "absolute"
                    }}>
                        <GlassView
                            glassEffectStyle={"clear"}
                            style={{
                                width: 300 / props.options.length,
                                borderRadius: 24,
                                height: 36,
                                padding: 4,
                            }}
                        />
                    </Animated.View>
                </GlassView>
            }
            {Platform.OS === "ios" && props.variant === "wheel" && (
                <>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <View
                            style={{
                                position: "relative",
                                height: 360,
                                width: wheelWidth,
                                overflow: "hidden",
                            }}
                        >
                            <ScrollView disableIntervalMomentum scrollEventThrottle={16} snapToInterval={26} decelerationRate={"fast"} showsVerticalScrollIndicator={false} onMomentumScrollEnd={(e) => {
                                const index = Math.round(
                                    e.nativeEvent.contentOffset.y / 36
                                );

                                props.setOption(props.options[index]);

                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }} ref={wheelRef} style={{
                                height: 360,
                                width: wheelWidth,
                            }} contentContainerStyle={{
                                alignItems: "center",
                                paddingVertical: (360 - 36) / 2,
                            }}>
                                {props.options.map((value, index) => (
                                    <View key={index.toString()} style={{ height: 36, width: wheelWidth, justifyContent: "center", alignItems: "center", zIndex: 2 }}>
                                        <Paragraph alignment="center" color={props.option !== value ? "white" : themes.blue.primary}>{value}</Paragraph>
                                    </View>
                                ))}
                            </ScrollView>

                            <GlassView pointerEvents="none" style={{
                                position: "absolute",
                                height: 36,
                                width: wheelWidth,
                                borderRadius: 24,
                                top: (360 - 36) / 2,
                                zIndex: -1,
                            }} glassEffectStyle={"clear"} />
                        </View>
                    </View>
                </>
            )
            }
        </>
    )
}