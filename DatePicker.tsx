import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Button,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "./constants/themes";
import { GlassView } from "expo-glass-effect";
import Picker from "./Picker";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setDay: (day: number) => void;
  setMonth: (month: string) => void;
  setYear: (year: number) => void;
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

export default function DatePicker({
  visible,
  setVisible,
  setDay,
  setMonth,
  setYear,
}: Props) {
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
      {Platform.OS === "ios" &&
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
            <GlassView
              style={{
                width: dim.width < 450 ? 280 : 320,
                backgroundColor: "#1c1c1e21",
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 16,
                height: 420,
                shadowColor: "#000",
                shadowOpacity: 0.12,
                shadowRadius: 24,
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
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
                  }}
                >
                  <TouchableOpacity
                    onPress={goPreviousMonth}
                    style={{
                      width: 44,
                      height: 44,
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
                      width: 44,
                      height: 44,
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
                          borderRadius: 18,
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
            </GlassView>
          </SafeAreaView>
        </Modal>
      }
    </>
  );
}