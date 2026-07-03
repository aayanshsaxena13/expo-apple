import { useEffect, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  Pressable,
} from 'react-native';
import { themes } from './constants/themes';
import { Paragraph } from './RichText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setDay: (day: number) => void;
  setMonth: (month: string) => void;
  setYear: (year: number) => void;
}

const dim = Dimensions.get("window");

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function DatePicker({
  visible,
  setVisible,
  setDay,
  setMonth,
  setYear
}: Props) {
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[new Date().getMonth()]);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [currentDay, _] = useState<number>(selectedDay);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const getDaysInMonth = (month: string, year: number): number[] => {
    const monthIndex = MONTHS.indexOf(month);
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    const days = [];

    for (let day = 1; day <= lastDay; day++) {
      days.push(day);
    }

    return days;
  };

  const daysGrid = getDaysInMonth(selectedMonth, selectedYear);

  const updateMonthAndValidateDay = (newMonth: string) => {
    setSelectedMonth(newMonth);
    setMonth(newMonth);

    const validDays = getDaysInMonth(newMonth, selectedYear);
    const maxValidDay = validDays[validDays.length - 1];

    if (selectedDay > maxValidDay) {
      setSelectedDay(maxValidDay);
      setDay(maxValidDay);
    }
  };

  useEffect(() => {
    setDay(selectedDay);
    setMonth(selectedMonth);
    setYear(selectedYear);
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'>
      <SafeAreaView style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        {/* This is the main card */}
        <View style={{
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
          width: dim.width < 450 ? 360 : 420,
        }}>
          {/* Top month change bar */}
          <View style={{
            flexDirection: "row"
          }}>
            <Paragraph margin={20} color={"white"} alignment={"left"}>{selectedMonth} {`${selectedYear}`}</Paragraph>

            <View style={{ flexDirection: "row", margin: 20 }}>
              <TouchableOpacity style={{
                margin: 8,
              }} onPress={() => {
                const key = MONTHS.findIndex((month) => month === selectedMonth) - 1;
                if (key >= 0) {
                  updateMonthAndValidateDay(MONTHS[key]);
                } else {
                  updateMonthAndValidateDay(MONTHS[11]);
                  setSelectedYear(selectedYear - 1);
                  setYear(selectedYear - 1);
                }
              }}>
                <Ionicons name="chevron-back-outline" color={themes.blue.primary} size={dim.width < 450 ? 20 : 24} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                margin: 8,
              }} onPress={() => {
                const key = MONTHS.findIndex((month) => month === selectedMonth) + 1;
                if (key <= 11) {
                  updateMonthAndValidateDay(MONTHS[key]);
                } else {
                  updateMonthAndValidateDay(MONTHS[0]);
                  setSelectedYear(selectedYear + 1);
                  setYear(selectedYear + 1);
                }
              }}>
                <Ionicons name="chevron-forward-outline" color={themes.blue.primary} size={dim.width < 450 ? 20 : 24} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Days grid */}
          <View style={{
            flexWrap: "wrap",
            flexDirection: "row",
          }}>
            {daysGrid.map((day, index) => (
              <Pressable style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 12,
                margin: 8,
                width: dim.width < 450 ? 50 : 60,
                borderRadius: 50,
                backgroundColor: selectedDay !== day ? "rgba(61, 61, 61, 0)" : "#0058d22f",
              }} key={index} onPress={() => {
                setSelectedDay(day);
                setDay(day);
              }}>
                <Paragraph color={selectedDay !== day ? currentDay !== day ? "white" : themes.blue.primary : themes.blue.primary}>{day}</Paragraph>
              </Pressable>
            ))}
          </View>

          {/* Bottom done button */}
          <Button title='Done' onPress={() => setVisible(false)} color={themes.red.primary} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}