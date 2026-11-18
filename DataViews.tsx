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