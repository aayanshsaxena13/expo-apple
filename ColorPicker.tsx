import { Dimensions, Pressable, View, Modal, Button } from "react-native";
import { themes } from "./constants/themes";
import { SafeAreaView } from "react-native-safe-area-context";

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
            <Modal visible={visible} transparent={true} animationType="fade">
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <SafeAreaView style={{
                        margin: 20,
                        backgroundColor: 'rgba(16, 16, 16, 0.95)',
                        borderRadius: 16,
                        padding: 12,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 12,
                        elevation: 4,
                        width: 360,
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
                    </SafeAreaView>
                </View>
            </Modal>
        </>
    );
}