import { Ionicons } from "@expo/vector-icons";
import { GlassView } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import { Animated, FlexAlignType, Platform, Pressable, ScrollView, View } from "react-native";
import { GlassButton } from "./Button";
import { themes } from "./constants/themes";
import Menu from "./Menu";
import { Paragraph } from "./RichText";
import { BlurView } from "expo-blur";

const supportsGlass = Platform.OS === "ios" && Number(Platform.Version) >= 26;

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
            {props.variant === "menu" &&
                <View style={{
                    margin: props.margin,
                    alignSelf: props.alignment,
                }}>
                    <GlassButton variant="toolbar" onPress={() => setVisible(true)}>
                        <Ionicons name="chevron-expand-outline" color={themes.blue.primary} size={32} />
                    </GlassButton>

                    <Menu options={props.options} visible={visible} setOption={props.setOption} setVisible={setVisible} />
                </View>
            }
            {props.variant === "segmented" && (
                <>
                    {supportsGlass ? <GlassView style={{
                        margin: props.margin,
                        alignSelf: props.alignment,
                        flexDirection: "row",
                        width: 300,
                        position: "relative",
                        borderRadius: 999
                    }} glassEffectStyle={"regular"}>
                        {/* Moment of truth list */}
                        {props.options.map((val: string, i: number) => (
                            <View key={i.toString()} style={{
                                width: 300 / props.options.length,
                                height: 36,
                                padding: 4,
                                zIndex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Pressable onPressIn={() => {
                                    Animated.sequence([
                                        // Expansion...
                                        Animated.timing(scale, {
                                            toValue: 1.5,
                                            duration: 100,
                                            useNativeDriver: true,
                                        }),
                                        // Movement in parallel...
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
                                        ]),
                                        // The Playback of sequence...
                                    ]).start();
                                }} onPressOut={() => props.setOption(val)}>
                                    <View style={{ height: 36, width: 300 / props.options.length, justifyContent: "center", alignItems: "center" }}>
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
                                    borderRadius: 999,
                                    height: 36,
                                    padding: 4,
                                }}
                            />
                        </Animated.View>
                    </GlassView> : <BlurView style={{
                        margin: props.margin,
                        alignSelf: props.alignment,
                        flexDirection: "row",
                        width: 300,
                        position: "relative",
                        borderRadius: 999,
                        overflow: "hidden"
                    }} intensity={32}>
                        {/* Moment of truth list */}
                        {props.options.map((val: string, i: number) => (
                            <View key={i.toString()} style={{
                                width: 300 / props.options.length,
                                height: 36,
                                padding: 4,
                                zIndex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Pressable onPressIn={() => {
                                    Animated.sequence([
                                        // Expansion...
                                        Animated.timing(scale, {
                                            toValue: 1.5,
                                            duration: 100,
                                            useNativeDriver: true,
                                        }),
                                        // Movement in parallel...
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
                                        ]),
                                        // The Playback of sequence...
                                    ]).start();
                                }} onPressOut={() => props.setOption(val)}>
                                    <View style={{ height: 36, width: 300 / props.options.length, justifyContent: "center", alignItems: "center" }}>
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
                            <BlurView
                                intensity={16}
                                style={{
                                    width: 300 / props.options.length,
                                    borderRadius: 999,
                                    height: 36,
                                    padding: 4,
                                    overflow: "hidden"
                                }}
                            />
                        </Animated.View>
                    </BlurView>}
                </>
            )
            }
            {props.variant === "wheel" && (
                <>
                    <View style={{ margin: props.margin, alignSelf: props.alignment }}>
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

                            {supportsGlass ? <GlassView pointerEvents="none" style={{
                                position: "absolute",
                                height: 36,
                                width: wheelWidth,
                                borderRadius: 999,
                                top: (360 - 36) / 2,
                                zIndex: -1,
                            }} glassEffectStyle={"clear"} /> :
                                <BlurView pointerEvents="none" style={{
                                    position: "absolute",
                                    height: 36,
                                    width: wheelWidth,
                                    borderRadius: 999,
                                    top: (360 - 36) / 2,
                                    overflow: "hidden",
                                    zIndex: -1,
                                }} intensity={16} />}
                        </View>
                    </View>
                </>
            )
            }
        </>
    )
}