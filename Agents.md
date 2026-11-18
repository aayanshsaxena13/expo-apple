# Best Practices for Coding Agents
This skill covers design system, native design, and animations...

# Design System
Always use 4-point grid design.<br />
```js
// Typography styling

/* Paragraph styles
fontWeight: 700,
fontSize: 16
*/
/* Header styles
fontWeight: 800,
fontSize: 28
*/

// Container Styles for instance, cards, graphs, etc...

/*
padding: 8,
borderRadius: 12,
margin: 8,
gap: 8,

Anything other than these values in unacceptable
*/

// For Toolbar Icons...
/*
<Ionicons name="example" size={28} /> - for toolbar icons
<Ionicons name="example" size={16} /> - for button icons
*/
```

# Project File System
```file-system
components/
    [my ui library files are here]
app/
    [expo router file based routing]

and more...Remember not to modify files in components folder by yourself...
```

# components/constants/themes.ts
```ts
export const themes = {
    yellow: {
        primary: "rgb(255, 166, 0)",
        secondary: "rgb(255, 227, 135)"
    },
    neutral: {
        primary: "rgb(80, 80, 80)",
        secondary: "rgb(117, 117, 117)"
    },
    blue: {
        primary: "rgb(0, 153, 255)",
        secondary: "rgb(113, 198, 255)"
    },
    green: {
        primary: "rgb(0, 255, 100)",
        secondary: "rgb(137, 255, 100)"
    },
    pink: {
        primary: "rgb(255, 59, 167)",
        secondary: "rgb(255, 162, 205)"
    },
    red: {
        primary: "rgb(255, 59, 59)",
        secondary: "rgb(255, 125, 125)"
    }
};
```

# components/Animations.tsx
```tsx
import { Animated, Dimensions, Easing } from "react-native";
import { useEffect, useRef } from "react";

const dim = Dimensions.get("window");

export function BouncyView(props: {
    children?: React.JSX.Element;
}) {
    const animatedY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const bounceAnim = Animated.timing(animatedY, {
            toValue: dim.width < 450 ? -6 : -8,
            easing: Easing.inOut(Easing.quad),
            duration: 600,
            useNativeDriver: true,
        });

        const dropAnim = Animated.timing(animatedY, {
            toValue: 0,
            easing: Easing.inOut(Easing.quad),
            duration: 600,
            useNativeDriver: true,
        });
        const animLoop = Animated.loop(
            Animated.sequence([
                bounceAnim,
                dropAnim
            ]),
        );

        animLoop.start();

        return () => {
            animLoop.stop();
        };
    }, []);
    return (
        <Animated.View style={{
            transform: [{ translateY: animatedY }]
        }}>
            {props.children}
        </Animated.View>
    )
}

export function ScaledView(props: {
    children?: React.JSX.Element;
}) {
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const scaleIn = Animated.timing(scale, {
            toValue: dim.width < 450 ? 1.12 : 1.20,
            easing: Easing.inOut(Easing.quad),
            duration: 600,
            useNativeDriver: true,
        });

        const scaleOut = Animated.timing(scale, {
            toValue: 1.00,
            easing: Easing.inOut(Easing.quad),
            duration: 600,
            useNativeDriver: true,
        });
        const animLoop = Animated.loop(
            Animated.sequence([
                scaleIn,
                scaleOut
            ]),
        );

        animLoop.start();

        return () => {
            animLoop.stop();
        };
    }, []);
    return (
        <Animated.View style={{
            transform: [{ scale: scale }]
        }}>
            {props.children}
        </Animated.View>
    )
}

export function MovingView(props: {
    children?: React.JSX.Element;
}) {
    const x = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const scaleIn = Animated.timing(x, {
            toValue: dim.width < 450 ? 402 : 1000,
            duration: 2400,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
        });

        const scaleOut = Animated.timing(x, {
            toValue: dim.width < 450 ? -402 : -1000,
            easing: Easing.inOut(Easing.quad),
            duration: 2400,
            useNativeDriver: true,
        });
        const animLoop = Animated.loop(
            Animated.sequence([
                scaleIn,
                scaleOut
            ]),
        );

        animLoop.start();

        return () => {
            animLoop.stop();
        };
    }, []);
    return (
        <Animated.View style={{
            transform: [{ translateX: x }]
        }}>
            {props.children}
        </Animated.View>
    )
}
```

# components/Bubble.tsx
```tsx
import { FlexAlignType, View } from "react-native";
import { Paragraph } from "./RichText";
import { themes } from "./constants/themes";

export default function Bubble({ children, margin, alignment, color }: { children?: string; margin?: number; alignment?: FlexAlignType; color?: string; }) {
    return (
        <View style={{
            alignSelf: alignment,
            margin: margin,
            backgroundColor: color ? color : themes.blue.primary,
            padding: 8,
            borderTopRightRadius: 12,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
        }}>
            <Paragraph>{children}</Paragraph>
        </View>
    )
}
```

# components/Button.tsx
```tsx
import { FlexAlignType, Pressable, Animated, Platform, Dimensions } from "react-native";
import { Paragraph } from "./RichText";
import { JSX, useRef } from "react";
import { GlassView } from "expo-glass-effect";
import { BlurView } from "expo-blur";

const dim = Dimensions.get("window");
const supportsGlass = Platform.OS === "ios" && Number(Platform.Version) >= 26;

export function Button(props: {
    onPress?: () => void;
    children?: string;
    color?: string;
    margin?: number;
    alignment?: FlexAlignType;
    secondaryColor?: string;
    variant?: "regular" | "capsule",
}) {
    return (
        <>
            {props.variant === "regular" ?
                <Pressable onPress={props.onPress} style={({ pressed }) => [{
                    alignSelf: props.alignment,
                    margin: props.margin,
                    backgroundColor: !pressed ? props.color : props.secondaryColor,
                    opacity: !pressed ? 1 : 0.75,
                    padding: 8,
                    borderRadius: 12,
                    overflow: "hidden",
                }]}>
                    <Paragraph alignment={"center"}>{props.children}</Paragraph>
                </Pressable> :
                <Pressable style={({ pressed }) => [{
                    borderRadius: 12,
                    overflow: "hidden",
                    padding: 8,
                    alignSelf: props.alignment,
                    margin: props.margin,
                    backgroundColor: !pressed ? "rgba(36, 36, 36, 0.2)" : "rgba(72, 72, 72, 0.2)",
                }]} onPress={props.onPress}>
                    <Paragraph color={props.color} alignment={"center"}>{props.children}</Paragraph>
                </Pressable>
            }
        </>
    );
}

export function GlassButton(props: {
    onPress?: () => void;
    children?: JSX.Element;
    margin?: number;
    alignment?: FlexAlignType;
    variant: "regular" | "toolbar";
    color?: string;
}) {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = Animated.spring(scale, {
        toValue: 0.8,
        useNativeDriver: true,
    });

    const onPressOut = Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
    });

    const onLongPress = Animated.spring(scale, {
        toValue: 1.2,
        useNativeDriver: true,
    });

    return (
        <>
            {supportsGlass && props.variant === "regular" &&
                <Animated.View style={{
                    transform: [{ scale: scale }],
                }}>
                    <GlassView style={{
                        padding: 8,
                        margin: props.margin,
                        alignSelf: props.alignment,
                        borderRadius: 12,
                        backgroundColor: props?.color
                    }} glassEffectStyle={"regular"}>
                        <Pressable onLongPress={() => onLongPress.start()} onPressIn={() => onPressIn.start()} onPressOut={() => onPressOut.start()} onPress={props.onPress}>
                            {props.children}
                        </Pressable>
                    </GlassView>
                </Animated.View>
            }
            {!supportsGlass && props.variant === "regular" &&
                <Animated.View style={{
                    transform: [{ scale: scale }],
                }}>
                    <BlurView intensity={16} style={{
                        padding: 8,
                        margin: props.margin,
                        alignSelf: props.alignment,
                        borderRadius: 12,
                        overflow: 'hidden',
                        borderColor: 'rgba(59, 59, 59, 0.5)',
                        borderWidth: dim.width < 450 ? 1.6 : 3.2,
                        backgroundColor: props?.color
                    }}>
                        <Pressable onLongPress={() => onLongPress.start()} onPressIn={() => onPressIn.start()} onPressOut={() => onPressOut.start()} onPress={props.onPress}>
                            {props.children}
                        </Pressable>
                    </BlurView>
                </Animated.View>
            }
            {supportsGlass && props.variant === "toolbar" &&
                <Animated.View style={{
                    transform: [{ scale: scale }],
                }}>
                    <GlassView style={{
                        padding: 8,
                        margin: props.margin,
                        alignSelf: props.alignment,
                        borderRadius: 999,
                        backgroundColor: props?.color
                    }} glassEffectStyle={"regular"}>
                        <Pressable onLongPress={() => onLongPress.start()} onPressIn={() => onPressIn.start()} onPressOut={() => onPressOut.start()} onPress={props.onPress}>
                            {props.children}
                        </Pressable>
                    </GlassView>
                </Animated.View>
            }
            {!supportsGlass && props.variant === "toolbar" &&
                <Animated.View style={{
                    transform: [{ scale: scale }],
                }}>
                    <BlurView style={{
                        padding: 8,
                        margin: props.margin,
                        alignSelf: props.alignment,
                        borderRadius: 999,
                        overflow: 'hidden',
                        borderColor: 'rgba(59, 59, 59, 0.5)',
                        borderWidth: dim.width < 450 ? 1.6 : 3.2,
                        backgroundColor: props?.color
                    }} intensity={16}>
                        <Pressable onLongPress={() => onLongPress.start()} onPressIn={() => onPressIn.start()} onPressOut={() => onPressOut.start()} onPress={props.onPress}>
                            {props.children}
                        </Pressable>
                    </BlurView>
                </Animated.View>
            }
        </>
    )
}
```

# components/ColorPicker.tsx
```tsx
import { Dimensions, Pressable, View, Modal, Button } from "react-native";
import { themes } from "./constants/themes";

export default function ColorPicker({ setColor, visible, setVisible }: { setColor: (s: string) => void; visible?: boolean; setVisible: (b: boolean) => void; }) {
    const red: string[] = ["rgb(255, 160, 160)", themes.red.secondary, themes.red.primary, "rgb(133, 0, 0)"];
    const orange: string[] = ["rgb(255, 187, 160)", "rgb(255, 175, 100)", "rgb(255, 115, 0)", "rgb(151, 68, 0)"];
    const yellow: string[] = ["rgb(255, 249, 160)", themes.yellow.secondary, "rgb(255, 230, 0)", themes.yellow.primary];
    const green: string[] = ["rgb(160, 255, 160)", themes.green.secondary, themes.green.primary, "rgb(0, 121, 36)"];
    const blue: string[] = ["rgb(160, 220, 255)", themes.blue.secondary, themes.blue.primary, "rgb(0, 26, 255)"];
    const purple: string[] = [themes.pink.secondary, themes.pink.primary, "rgb(225, 0, 255)", "rgb(174, 0, 255)"];
    const dark: string[] = ["rgb(255, 255, 255)", "rgb(131, 131, 131)", "rgb(70, 70, 70)", "rgb(13, 13, 13)"];

    const dim = Dimensions.get("window");
    return (
        <>
            <Modal visible={visible} presentationStyle="formSheet" backdropColor={"rgba(16, 16, 16, 0.4)"} animationType="slide">
                <View style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <View style={{
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            {red.map((color: string, index: number) => (
                                <Pressable key={index} style={{
                                    padding: 8,
                                    backgroundColor: color,
                                    width: dim.width < 450 ? 24 : 36,
                                    height: dim.width < 450 ? 24 : 36
                                }} onPress={() => setColor(color)} />
                            ))}
                        </View>

                        <View style={{
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            {orange.map((color: string, index: number) => (
                                <Pressable key={index} style={{
                                    padding: 8,
                                    backgroundColor: color,
                                    width: dim.width < 450 ? 24 : 36,
                                    height: dim.width < 450 ? 24 : 36
                                }} onPress={() => setColor(color)} />
                            ))}
                        </View>

                        <View style={{
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            {yellow.map((color: string, index: number) => (
                                <Pressable key={index} style={{
                                    padding: 8,
                                    backgroundColor: color,
                                    width: dim.width < 450 ? 24 : 36,
                                    height: dim.width < 450 ? 24 : 36
                                }} onPress={() => setColor(color)} />
                            ))}
                        </View>

                        <View style={{
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            {green.map((color: string, index: number) => (
                                <Pressable key={index} style={{
                                    padding: 8,
                                    backgroundColor: color,
                                    width: dim.width < 450 ? 24 : 36,
                                    height: dim.width < 450 ? 24 : 36
                                }} onPress={() => setColor(color)} />
                            ))}
                        </View>

                        <View style={{
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            {blue.map((color: string, index: number) => (
                                <Pressable key={index} style={{
                                    padding: 8,
                                    backgroundColor: color,
                                    width: dim.width < 450 ? 24 : 36,
                                    height: dim.width < 450 ? 24 : 36
                                }} onPress={() => setColor(color)} />
                            ))}
                        </View>

                        <View style={{
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            {purple.map((color: string, index: number) => (
                                <Pressable key={index} style={{
                                    padding: 8,
                                    backgroundColor: color,
                                    width: dim.width < 450 ? 24 : 36,
                                    height: dim.width < 450 ? 24 : 36
                                }} onPress={() => setColor(color)} />
                            ))}
                        </View>

                        <View style={{
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            {dark.map((color: string, index: number) => (
                                <Pressable key={index} style={{
                                    padding: 8,
                                    backgroundColor: color,
                                    width: dim.width < 450 ? 24 : 36,
                                    height: dim.width < 450 ? 24 : 36
                                }} onPress={() => setColor(color)} />
                            ))}
                        </View>
                    </View>
                    <Button title="Done" color={themes.red.primary} onPress={() => setVisible(false)} />
                </View>
            </Modal>
        </>
    );
}
```

# components/DataViews.tsx
```tsx
import { Dimensions, FlexAlignType, View, FlatList, useColorScheme } from "react-native";
import { ReactNode } from "react";
import { Paragraph } from "./RichText";
import { themes } from "./constants/themes";

type ListProps<ITEM> = {
  data: ITEM[];
  renderItem: (i: ITEM) => ReactNode;
  alignment?: FlexAlignType;
  margin?: number;
  color?: string;
};

const dim = Dimensions.get("window");

export function List<ITEM extends Object>({ data, renderItem, alignment, margin, color }: ListProps<ITEM>) {
  if (!data) return;
  const colorScheme = useColorScheme();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      contentContainerStyle={{
        alignSelf: alignment,
        margin,
      }}
      keyExtractor={(_item: ITEM, index: number) => index.toString()}
      renderItem={({ item, index }) => (
        <View
          style={{
            backgroundColor: color ?? colorScheme !== "light" ? "rgba(16, 16, 16, 0.9)" : "rgba(200, 200, 200, 0.9)",
            padding: 8,
            borderTopLeftRadius: index == 0 ? 12 : 0,
            borderTopRightRadius: index == 0 ? 12 : 0,
            borderBottomLeftRadius: index == data.length - 1 ? 12 : 0,
            borderBottomRightRadius: index == data.length - 1 ? 12 : 0,
            borderBottomWidth: index != data.length - 1 ? dim.width < 450 ? 1.6 : 3.2 : 0,
            borderColor: colorScheme !== "light" ? "rgb(134, 134, 134)" : "rgb(100, 100, 100)",
          }}
        >
          {renderItem?.(item)}
        </View>
      )} />
  );
};

export function Table<T extends Object>({ data, margin, alignment, color }: { data: T[], margin?: number, alignment?: FlexAlignType; color?: string; }) {
  if (data?.length === 0) return;
  const keys = Object.keys(data[0]);
  const colorScheme = useColorScheme();
  return (
    <View style={{
      margin,
      alignSelf: alignment,
      flexDirection: "column",
      backgroundColor: color ?? colorScheme !== "light" ? "rgba(16, 16, 16, 0.9)" : "rgba(200, 200, 200, 0.9)",
      borderRadius: 12
    }}>
      <View style={{ flexDirection: "row" }}>
        {keys.map((key: string, index: number) => (
          <View style={{
            padding: 8,
            width: dim.width < 450 ? 100 : 120,
            borderColor: colorScheme !== "light" ? "rgb(134, 134, 134)" : "rgb(100, 100, 100)",
            borderRightWidth: index !== keys.length - 1 ? dim.width < 450 ? 1.6 : 3.2 : 0,
            borderBottomWidth: dim.width < 450 ? 1.6 : 3.2,
          }} key={index}>
            <Paragraph color={themes.blue.primary} alignment={"center"}>{key}</Paragraph>
          </View>
        ))}
      </View>
      {data.map((row: T, rowIndex: number) => {
        const values = Object.values(row);
        return (
          // Columns...
          <View style={{ flexDirection: "column" }} key={rowIndex}>
            <View style={{ flexDirection: "row" }}>
              {values.map((value: string | number, index: number) => (
                <View style={{
                  padding: 8,
                  width: dim.width < 450 ? 100 : 120,
                  borderColor: colorScheme !== "light" ? "rgb(134, 134, 134)" : "rgb(100, 100, 100)",
                  borderBottomWidth: rowIndex !== data.length - 1 ? dim.width < 450 ? 1.6 : 3.2 : 0,
                  borderRightWidth: index !== values.length - 1 ? dim.width < 450 ? 1.6 : 3.2 : 0,
                }} key={index}>
                  <Paragraph alignment={"center"}>{value}</Paragraph>
                </View>
              ))}
            </View>
          </View>
        )
      })}
    </View>
  );
};
```

# components/DateTimePicker.tsx
```tsx
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themes } from "./constants/themes";
import Picker from "./Picker";

interface DPP {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setDay: (day: number) => void;
  setMonth: (month: string) => void;
  setYear: (year: number) => void;
}

interface TPP {
  hour: number;
  minute: number;
  phase: "AM" | "PM";
  setHours: (i: number) => void;
  setMinutes: (i: number) => void;
  setPhase: (i: any) => void;
  visible: boolean;
  setVisible: (i: boolean) => void;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

const dim = Dimensions.get("window");

export function DatePicker({
  visible,
  setVisible,
  setDay,
  setMonth,
  setYear,
}: DPP) {
  const today = new Date();
  const [wheelVisible, setWheelVisible] = useState<boolean>(false);

  const [selectedMonth, setSelectedMonth] = useState(
    MONTHS[today.getMonth()]
  );

  const [selectedYear, setSelectedYear] = useState(
    today.getFullYear()
  );

  const [selectedDay, setSelectedDay] = useState(
    today.getDate()
  );

  useEffect(() => {
    setDay(selectedDay);
    setMonth(selectedMonth);
    setYear(selectedYear);
  }, []);

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstWeekday(month: number, year: number) {
    return new Date(year, month, 1).getDay();
  }

  function goPreviousMonth() {
    const monthIndex = MONTHS.indexOf(selectedMonth);

    if (monthIndex === 0) {
      setSelectedMonth(MONTHS[11]);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth(MONTHS[monthIndex - 1]);
    }
  }

  function goNextMonth() {
    const monthIndex = MONTHS.indexOf(selectedMonth);

    if (monthIndex === 11) {
      setSelectedMonth(MONTHS[0]);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth(MONTHS[monthIndex + 1]);
    }
  }

  useEffect(() => {
    const monthIndex = MONTHS.indexOf(selectedMonth);

    const maxDay = getDaysInMonth(
      monthIndex,
      selectedYear
    );

    if (selectedDay > maxDay) {
      setSelectedDay(maxDay);
      setDay(maxDay);
    }

    setMonth(selectedMonth);
    setYear(selectedYear);
  }, [selectedMonth, selectedYear]);

  const calendar = useMemo(() => {
    const monthIndex = MONTHS.indexOf(selectedMonth);

    const totalDays = getDaysInMonth(
      monthIndex,
      selectedYear
    );

    const firstWeekday = getFirstWeekday(
      monthIndex,
      selectedYear
    );

    const cells: (number | null)[] = [];

    for (let i = 0; i < firstWeekday; i++) {
      cells.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      cells.push(i);
    }

    while (cells.length < 42) {
      cells.push(null);
    }

    return cells;
  }, [selectedMonth, selectedYear]);

  const daysGrid = calendar.filter((item) => item !== null).map((item) => `${item}`);

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BlurView intensity={16}
            style={{
              width: dim.width < 450 ? 280 : 320,
              borderRadius: 12,
              padding: 8,
              height: 420,
              shadowColor: "#ffffff",
              shadowOpacity: 0.4,
              shadowRadius: 12,
              overflow: 'hidden'
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <Pressable onPress={() => {
                setWheelVisible(true);
              }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 28,
                    fontWeight: "600",
                  }}
                >
                  {selectedMonth} {selectedYear}
                </Text>
              </Pressable>

              <Modal transparent animationType="fade" visible={wheelVisible}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Picker wheelWidth={120} option={selectedMonth} setOption={setSelectedMonth} options={MONTHS} variant="wheel" />
                    <Picker wheelWidth={100} option={`${selectedDay}`} setOption={(i: string) => {
                      setSelectedDay(Number(i));
                    }} options={daysGrid} variant="wheel" />
                  </View>
                  <Button title="Done" color={themes.red.primary} onPress={() => setWheelVisible(false)} />
                </View>
              </Modal>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  onPress={goPreviousMonth}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="chevron-back"
                    size={22}
                    color={themes.blue.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={goNextMonth}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={themes.blue.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 8,
              }}
            >
              {WEEKDAYS.map((weekday) => (
                <View
                  key={weekday}
                  style={{
                    width: `${100 / 7}%`,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#8E8E93",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.5,
                    }}
                  >
                    {weekday}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar grid starts here */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {calendar.map((day, index) => {
                if (day === null) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={{
                        width: `${100 / 7}%`,
                        height: 44,
                      }}
                    />
                  );
                }

                const isToday =
                  day === today.getDate() &&
                  selectedMonth === MONTHS[today.getMonth()] &&
                  selectedYear === today.getFullYear();

                const isSelected = selectedDay === day;

                return (
                  <View
                    key={`${selectedMonth}-${selectedYear}-${day}`}
                    style={{
                      width: `${100 / 7}%`,
                      height: 44,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        setSelectedDay(day);
                        setDay(day);
                      }}
                      android_ripple={null}
                      style={({ pressed }) => ({
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        justifyContent: "center",
                        alignItems: "center",

                        backgroundColor: isToday && isSelected ? themes.blue.primary : isSelected
                          ? "#003366ad"
                          : "transparent",

                        opacity: pressed ? 0.55 : 1,
                      })}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: isSelected ? "600" : "400",
                          color: isToday && isSelected ? "white" : isSelected ? themes.blue.primary : "white",
                        }}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>

            <Button color={themes.red.primary} title="Done" onPress={() => setVisible(false)} />
          </BlurView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

// Time-picker constants...
const minutes: string[] = ['0'];
const hours: string[] = [];
const phases = ["AM", "PM"];

for (let i = 1; i <= 59; i++) {
  minutes.push(String(i));

  if (i < 13) {
    hours.push(String(i));
  }
};

export function TimePicker({
  hour,
  minute,
  phase,
  setHours,
  setMinutes,
  setPhase,
  visible,
  setVisible
}: TPP) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BlurView intensity={16}
          style={{
            width: 360,
            borderRadius: 12,
            padding: 8,
            overflow: 'hidden',
            height: 420,
            shadowColor: "#ffffff",
            shadowOpacity: 0.4,
            shadowRadius: 12,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Picker wheelWidth={130} option={`${hour}`} variant="wheel" options={hours} setOption={(i: string) => setHours(Number(i))} />
            <Picker wheelWidth={130} option={`${minute}`} variant="wheel" options={minutes} setOption={(i: string) => setMinutes(Number(i))} />
            <Picker wheelWidth={130} option={phase} variant="wheel" options={phases} setOption={(i) => setPhase(i)} />
          </View>
          <Button color={themes.red.primary} title="Done" onPress={() => setVisible(false)} />
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
}
```

# components/InputData.tsx
```tsx
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
const supportsGlass = Platform.OS === "ios" && Number(Platform.Version) >= 26;

export function TextField({ placeholder, alignment, width, color, security, value, onChange, margin }: { alignment?: FlexAlignType, color?: string, width?: number, security?: boolean, value?: string, onChange?: (i: string) => void, margin?: number, placeholder?: string }) {
  return (
    <>
      {supportsGlass ?
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
              width
            }}
            secureTextEntry={security}
          />
        </GlassView> :
        <BlurView
          intensity={16}
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
              padding: 0,
              includeFontPadding: false,
              width
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
  width,
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
```

# components/Loaders.tsx
```tsx
import { useEffect, useRef } from "react"
import { View, StyleSheet, Animated, ViewStyle, StyleProp } from "react-native"
import Svg, { Circle } from "react-native-svg"

type BaseProps = {
  progress: number // 0 → 1
  duration?: number
  style?: StyleProp<ViewStyle>
  color?: string
  trackColor?: string
}

type LinearProps = BaseProps & {
  height?: number
}

export function LinearProgress({
  progress,
  height = 6,
  color = "#4ade80",
  trackColor = "rgba(255,255,255,0.2)",
  style
}: LinearProps) {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animated, {
      toValue: progress,
      useNativeDriver: false
    }).start()
  }, [progress]);

  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <View style={[styles.linearContainer, { height, backgroundColor: trackColor }, style]}>
      <Animated.View
        style={{
          height: "100%",
          width,
          backgroundColor: color,
          borderRadius: height
        }}
      />
    </View>
  )
}

type CircularProps = BaseProps & {
  size?: number
  strokeWidth?: number
}

export function CircularProgress({
  progress,
  size = 80,
  strokeWidth = 6,
  color = "#4ade80",
  trackColor = "rgba(255,255,255,0.2)",
  style
}: CircularProps) {
  const animated = useRef(new Animated.Value(0)).current;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.spring(animated, {
      toValue: progress,
      useNativeDriver: false
    }).start()
  }, [progress]);

  const strokeDashoffset = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0]
  });

  return (
    <View style={style}>
      <Svg width={size} height={size}>
        {/* Track */}
        <Circle
          stroke={trackColor}
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <AnimatedCircle
          stroke={color}
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
    </View>
  )
}

//////////////////////////////////////////////////////////
// 🔧 Animated SVG Circle
//////////////////////////////////////////////////////////

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

//////////////////////////////////////////////////////////
// 🎨 Styles
//////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  linearContainer: {
    width: 200,
    overflow: "hidden",
    borderRadius: 999,
    alignSelf: "center",
    margin: 8,
  },
});
```

# components/Menu.tsx
```tsx
// IMPORT STATEMENTS...
import { BlurView } from "expo-blur";
import { ActivityIndicator, Button, Modal, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from "./DataViews";
import { Paragraph } from "./RichText";
import { themes } from "./constants/themes";

// TYPING THE PICKER PROPS...
type props = {
    options: string[];
    setOption: (i: string) => void;
    visible?: boolean;
    setVisible: (i: boolean) => void;
    isLoading?: boolean;
}

// CREATE THE COMPONENT...
export default function Menu({
    options,
    setOption,
    visible,
    setVisible,
    isLoading
}: props) {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <SafeAreaView style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
            }}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    {!isLoading ? <BlurView tint="dark" intensity={20} style={{
                        width: "100%",
                        overflow: 'hidden'
                    }}>
                        <List data={options} renderItem={(i: string) => (
                            <Pressable style={({ pressed }) => [{
                                backgroundColor: !pressed ? "transparent" : "rgba(255, 255, 255, 0.03)",
                            }]} onPress={() => setOption(i)}>
                                <Paragraph color={"white"} alignment={"left"}>{i}</Paragraph>
                            </Pressable>
                        )} />
                    </BlurView> : <ActivityIndicator size={"large"} color={themes.green.primary} />}
                    <Button title="Done" color={themes.red.primary} onPress={() => setVisible(false)} />
                </View>
            </SafeAreaView>
        </Modal>
    );
}
```

# components/Picker.tsx
```tsx
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
```

# components/RichText.tsx
```tsx
import { Link, RelativePathString } from "expo-router";
import { Text } from "react-native";

export function LinkView({ color, href, children, alignment, margin }: { color?: string, href: RelativePathString, children?: string | string[] | number, alignment?: "center" | "auto" | "justify" | "left" | "right", margin?: number }) {
    return (
        <Link style={{
            color: color ? color : "rgb(63, 146, 255)",
            textAlign: alignment,
            fontSize: 16,
            fontWeight: 700,
            margin: margin,
        }} href={href}>
            {children}
        </Link>
    );
}

export function Header({ color, alignment, children, margin }: { color?: string, alignment?: "center" | "auto" | "justify" | "left" | "right", children?: string | number | string[], margin?: number }) {
    return (
        <Text style={{
            color: color ? color : "rgb(255, 255, 255)",
            fontSize: 28,
            fontWeight: 800,
            textAlign: alignment,
            margin: margin,
        }}>
            {children}
        </Text>
    );
}

export function Paragraph({ color, alignment, children, margin }: { color?: string, alignment?: "center" | "auto" | "justify" | "left" | "right", children?: string | string[] | number, margin?: number }) {
    return (
        <Text style={{
            color: color ? color : "rgb(255, 255, 255)",
            fontSize: 16,
            fontWeight: 700,
            textAlign: alignment,
            margin: margin,
        }}>
            {children}
        </Text>
    );
}
```

# Tech Stack
You can use React Native + Expo SDK + Expo Router (even Expo API Routes, Server Middleware, and more...), use expo npx start -c --tunnel and give development server url to user so they can test in cloud simulators.
