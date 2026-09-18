import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dimensions,
  Modal,
  Platform,
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
            <BlurView intensity={16}
              style={{
                width: dim.width < 450 ? 280 : 320,
                borderRadius: 12,
                padding: 8,
                height: 420,
                shadowColor: "#ffffff",
                shadowOpacity: 0.4,
                shadowRadius: 12,
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
      }
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