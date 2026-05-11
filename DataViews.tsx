import { Dimensions, View } from "react-native";
import { ReactNode } from "react";
import { Paragraph } from "./RichText";

type ListProps<ITEM> = {
  data?: ITEM[];
  renderItem: (i: ITEM) => ReactNode;
  alignment?: any;
  margin?: any;
};

const dim = Dimensions.get("window");

export function List<ITEM>({ data, renderItem, alignment, margin }: ListProps<ITEM>) {
  return (
    <>
      {data?.map((item: any, index) => (
        <View key={index}
          style={{
            backgroundColor: "rgba(17, 16, 16, 0.7)",
            padding: dim.width < 450 ? 12 : 16,
            borderTopLeftRadius: index == 0 ? 16 : 0,
            borderTopRightRadius: index == 0 ? 16 : 0,
            borderBottomLeftRadius: index == data.length - 1 ? 16 : 0,
            borderBottomRightRadius: index == data.length - 1 ? 16 : 0,
            borderBottomWidth: index != data.length - 1 ? dim.width < 450 ? 1.6 : 3.2 : 0,
            borderColor: "rgb(134, 134, 134)",
            margin,
            alignSelf: alignment
          }}
        >
          {renderItem?.(item)}
        </View>
      ))}
    </>
  );
};

export function Table<T extends Object>({ data, margin, alignment }: { data: T, margin?: any, alignment?: any }) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  return (
    <View style={{ flexDirection: "row", margin, alignSelf: alignment }}>
      <View>
        {keys?.map((item: any, index) => (
          <View key={index}
            style={{
              backgroundColor: "rgba(16, 16, 16, 0.7)",
              borderTopLeftRadius: index == 0 ? 16 : 0,
              borderBottomLeftRadius: index == keys.length - 1 ? 16 : 0,
              borderBottomWidth: index != keys.length - 1 ? dim.width < 450 ? 1.6 : 3.2 : 0,
              borderRightWidth: dim.width < 450 ? 1.6 : 3.2,
              borderColor: "rgb(134, 134, 134)",
              width: dim.width < 450 ? 100 : 120,
              padding: dim.width < 450 ? 12 : 16,
            }}
          >
            <Paragraph alignment={"center"}>{item}</Paragraph>
          </View>
        ))}
      </View>
      <View>
        {values?.map((item: any, index) => (
          <View key={index}
            style={{
              backgroundColor: "rgba(16, 16, 16, 0.7)",
              borderTopRightRadius: index == 0 ? 16 : 0,
              borderBottomRightRadius: index == values.length - 1 ? 16 : 0,
              borderBottomWidth: index != values.length - 1 ? dim.width < 450 ? 1.6 : 3.2 : 0,
              borderColor: "rgb(134, 134, 134)",
            }}
          >
            <View style={{
              flexDirection: "row",
            }}>
              {item?.map((subItem: any, subIndex: number) => (
                <View key={subIndex} style={{
                  borderRightWidth: subIndex !== item.length - 1 ? dim.width < 450 ? 1.6 : 3.2 : 0,
                  borderColor: "rgba(199, 199, 199, 0.7)",
                  marginHorizontal: 4,
                  width: dim.width < 450 ? 100 : 120,
                  overflow: "hidden",
                  padding: dim.width < 450 ? 12 : 16,
                }}>
                  <Paragraph alignment={"center"}>{subItem}</Paragraph>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};