// IMPORT STATEMENTS...
import { ActivityIndicator, Button, Modal, Pressable, View } from "react-native";
import { List } from "./DataViews";
import { Paragraph } from "./RichText";
import { themes } from "./constants/themes";
import { SafeAreaView } from "react-native-safe-area-context";

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
                alignContent: "center",
                flex: 1
            }}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    {!isLoading ? <List data={options} renderItem={(i: string) => (
                        <Pressable style={({ pressed }) => [{
                            backgroundColor: !pressed ? "transparent" : "rgba(255, 255, 255, 0.03)",
                        }]} onPress={() => setOption(i)}>
                            <Paragraph color={"white"} alignment={"left"}>{i}</Paragraph>
                        </Pressable>
                    )} /> : <ActivityIndicator size={"large"} color={themes.green.primary} />}
                    <Button title="Done" color={themes.red.primary} onPress={() => setVisible(false)} />
                </View>
            </SafeAreaView>
        </Modal>
    );
}