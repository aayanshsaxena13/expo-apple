import { Animated, Dimensions, DimensionValue, Button as UIButton, FlexAlignType, Modal, Platform, Pressable, ScrollView, View } from "react-native";
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
    variant: "segmented" | "menu" | "wheel";
    option: string;
    wheelWidth?: number;
    wheelVisible?: boolean;
    setWheelVisible?: (v: boolean) => void;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const [visible, setVisible] = useState<boolean>(false);
    const cellWidth: DimensionValue = dim.width / props.options.length;
    const left = useRef(new Animated.Value(0)).current;
    const wheelRef = useRef<ScrollView>(null);
    const wheelWidth = props.wheelWidth ?? 240;

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
                    width: dim.width,
                    position: "relative",
                    borderRadius: 24
                }}>
                    {/* Glass pill selector */}
                    <Animated.View style={{
                        transform: [{ translateX: left }, { scale }],
                        position: "absolute"
                    }}>
                        <GlassView
                            glassEffectStyle={"regular"}
                            style={{
                                width: cellWidth,
                                borderRadius: 24,
                                height: 36,
                                padding: 4,
                            }}
                        />
                    </Animated.View>

                    {/* Moment of truth list */}
                    {props.options.map((val: string, i: number) => (
                        <GlassView key={i.toString()} style={{
                            width: cellWidth,
                            borderTopLeftRadius: i === 0 ? 24 : 0,
                            borderTopRightRadius: i === props.options.length - 1 ? 24 : 0,
                            borderBottomLeftRadius: i === 0 ? 24 : 0,
                            borderBottomRightRadius: i === props.options.length - 1 ? 24 : 0,
                            height: 36,
                            padding: 4,
                        }} glassEffectStyle={"clear"}>
                            <Pressable onPressIn={() => {
                                Animated.sequence([
                                    Animated.timing(scale, {
                                        toValue: 1.2,
                                        duration: 100,
                                        useNativeDriver: true,
                                    }),
                                    Animated.parallel([
                                        Animated.spring(left, {
                                            toValue: (dim.width / props.options.length) * i,
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
                        </GlassView>
                    ))}
                </View>
            }
            {Platform.OS === "ios" && props.variant === "wheel" && (
                <>
                    <Modal onShow={() => {
                        const index = props.options.indexOf(props.option);

                        wheelRef.current?.scrollTo({
                            y: index * 36,
                            animated: false,
                        });
                    }} visible={props.wheelVisible} transparent animationType="slide">
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
                                }} ref={wheelRef} style={{
                                    height: 360,
                                    width: wheelWidth,
                                }} contentContainerStyle={{
                                    alignItems: "center",
                                    paddingVertical: (360 - 36) / 2,
                                }}>
                                    {props.options.map((value, index) => (
                                        <View key={index.toString()} style={{ height: 36, width: wheelWidth, justifyContent: "center", alignItems: "center" }}>
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
                                    zIndex: 2,
                                }} glassEffectStyle={"clear"} />
                            </View>
                            <UIButton title="Done" onPress={() => props.setWheelVisible?.(false)} color={themes.red.primary} />
                        </View>
                    </Modal>
                </>
            )
            }
        </>
    )
}