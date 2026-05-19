import { Dimensions, Pressable, View } from "react-native";
import { themes } from "./constants/themes";

export default function ColorPicker({ setColor, alignment }: { setColor: any; alignment?: any; }) {
    const red: string[] = ["rgb(255, 160, 160)", themes.red.secondary, themes.red.primary, "rgb(133, 0, 0)"];
    const orange: string[] = ["rgb(255, 187, 160)", "rgb(255, 175, 100)", "rgb(255, 115, 0)", "rgb(151, 68, 0)"];
    const yellow: string[] = ["rgb(255, 249, 160)", themes.yellow.secondary, "rgb(255, 230, 0)", themes.yellow.primary];
    const green: any = ["rgb(160, 255, 160)", themes.green.secondary, themes.green.primary, "rgb(0, 121, 36)"];
    const blue: any = ["rgb(160, 220, 255)", themes.blue.secondary, themes.blue.primary, "rgb(0, 26, 255)"];
    const purple: any = [themes.pink.secondary, themes.pink.primary, "rgb(225, 0, 255)", "rgb(174, 0, 255)"];
    const dark: any = ["rgb(255, 255, 255)", "rgb(131, 131, 131)", "rgb(70, 70, 70)", "rgb(13, 13, 13)"];

    const dim = Dimensions.get("window");
    return (
        <>
            <View style={{
                backgroundColor: "rgb(80, 80, 80)",
                opacity: 50,
                padding: 12,
                margin: 12,
                borderRadius: 16,
                width: dim.width < 450 ? 180 : 240,
                alignSelf: alignment
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    {red.map((color: any, index: any) => (
                        <Pressable key={index} style={{
                            padding: 8,
                            margin: 8,
                            borderRadius: 4,
                            backgroundColor: color,
                            width: dim.width < 450 ? 24 : 36,
                            height: dim.width < 450 ? 24 : 36
                        }} onPress={() => setColor(color)} />
                    ))}
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    {orange.map((color: any, index: any) => (
                        <Pressable key={index} style={{
                            padding: 8,
                            margin: 8,
                            borderRadius: 4,
                            backgroundColor: color,
                            width: dim.width < 450 ? 24 : 36,
                            height: dim.width < 450 ? 24 : 36
                        }} onPress={() => setColor(color)} />
                    ))}
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    {yellow.map((color: any, index: any) => (
                        <Pressable key={index} style={{
                            padding: 8,
                            margin: 8,
                            borderRadius: 4,
                            backgroundColor: color,
                            width: dim.width < 450 ? 24 : 36,
                            height: dim.width < 450 ? 24 : 36
                        }} onPress={() => setColor(color)} />
                    ))}
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    {green.map((color: any, index: any) => (
                        <Pressable key={index} style={{
                            padding: 8,
                            margin: 8,
                            borderRadius: 4,
                            backgroundColor: color,
                            width: dim.width < 450 ? 24 : 36,
                            height: dim.width < 450 ? 24 : 36
                        }} onPress={() => setColor(color)} />
                    ))}
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    {blue.map((color: any, index: any) => (
                        <Pressable key={index} style={{
                            padding: 8,
                            margin: 8,
                            borderRadius: 4,
                            backgroundColor: color,
                            width: dim.width < 450 ? 24 : 36,
                            height: dim.width < 450 ? 24 : 36
                        }} onPress={() => setColor(color)} />
                    ))}
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    {purple.map((color: any, index: any) => (
                        <Pressable key={index} style={{
                            padding: 8,
                            margin: 8,
                            borderRadius: 4,
                            backgroundColor: color,
                            width: dim.width < 450 ? 24 : 36,
                            height: dim.width < 450 ? 24 : 36
                        }} onPress={() => setColor(color)} />
                    ))}
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    {dark.map((color: any, index: any) => (
                        <Pressable key={index} style={{
                            padding: 8,
                            margin: 8,
                            borderRadius: 4,
                            backgroundColor: color,
                            width: dim.width < 450 ? 24 : 36,
                            height: dim.width < 450 ? 24 : 36
                        }} onPress={() => setColor(color)} />
                    ))}
                </View>
            </View>
        </>
    );
}