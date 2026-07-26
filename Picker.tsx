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
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const [visible, setVisible] = useState<boolean>(false);
    const cellWidth: DimensionValue = dim.width / props.options.length;
    const left = useRef(new Animated.Value(0)).current;
    const ITEM_HEIGHT = 36;
    const VISIBLE_ROWS = 5;
    const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;
    const PADDING = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;
    const wheelRef = useRef<ScrollView | null>(null);

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
                                <Paragraph color={props.option === val ? themes.blue.primary : "white"} alignment="center">{val}</Paragraph>
                            </Pressable>
                        </GlassView>
                    ))}
                </View>
            }
            {Platform.OS === "ios" && props.variant === "wheel" && (
                <View style={{ margin: props.margin, alignSelf: props.alignment }}>
                    <Animated.View style={{ transform: [{ scale }] }}>
                        <GlassView
                            glassEffectStyle="regular"
                            style={{
                                padding: dim.width < 450 ? 12 : 18,
                                borderRadius: dim.width < 450 ? 24 : 36,
                            }}
                        >
                            <Pressable
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                                onPress={async () => {
                                    setVisible(true);

                                    requestAnimationFrame(() => {
                                        const index = props.options.indexOf(props.option);

                                        wheelRef.current?.scrollTo({
                                            y: index * ITEM_HEIGHT,
                                            animated: false,
                                        });
                                    });

                                    await Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Light
                                    );
                                }}
                            >
                                <Ionicons
                                    size={dim.width < 450 ? 24 : 36}
                                    name="chevron-expand-outline"
                                    color={themes.blue.primary}
                                />
                            </Pressable>
                        </GlassView>
                    </Animated.View>

                    <Modal transparent animationType="fade" visible={visible}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0,0,0,0.35)",
                            }}
                        >
                            <GlassView
                                glassEffectStyle="regular"
                                style={{
                                    width: props.wheelWidth ?? 250,
                                    borderRadius: 24,
                                    overflow: "hidden",
                                    paddingVertical: 16,
                                }}
                            >
                                <View
                                    style={{
                                        height: PICKER_HEIGHT,
                                        position: "relative",
                                    }}
                                >
                                    <ScrollView
                                        ref={wheelRef}
                                        showsVerticalScrollIndicator={false}
                                        snapToInterval={ITEM_HEIGHT}
                                        decelerationRate="fast"
                                        bounces={false}
                                        contentContainerStyle={{
                                            paddingVertical: PADDING,
                                        }}
                                        onMomentumScrollEnd={(e) => {
                                            const index = Math.round(
                                                e.nativeEvent.contentOffset.y / ITEM_HEIGHT
                                            );

                                            props.setOption(props.options[index]);
                                        }}
                                    >
                                        {props.options.map((value, index) => (
                                            <Pressable
                                                key={index}
                                                style={{
                                                    height: ITEM_HEIGHT,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                onPress={() => {
                                                    wheelRef.current?.scrollTo({
                                                        y: index * ITEM_HEIGHT,
                                                        animated: true,
                                                    });

                                                    props.setOption(value);
                                                }}
                                            >
                                                <Paragraph
                                                    alignment="center"
                                                    color={
                                                        props.option === value
                                                            ? themes.blue.primary
                                                            : "white"
                                                    }
                                                >
                                                    {value}
                                                </Paragraph>
                                            </Pressable>
                                        ))}
                                    </ScrollView>

                                    <GlassView
                                        glassEffectStyle="regular"
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            top: PADDING,
                                            height: ITEM_HEIGHT,
                                            borderRadius: 16,
                                            pointerEvents: "none",
                                        }}
                                    />
                                </View>

                                <UIButton
                                    title="Done"
                                    color={themes.red.primary}
                                    onPress={() => setVisible(false)}
                                />
                            </GlassView>
                        </View>
                    </Modal>
                </View>
            )}
        </>
    )
}