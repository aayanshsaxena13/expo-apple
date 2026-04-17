import { useEffect, useRef } from "react"
import { View, StyleSheet, Animated, Easing, ViewStyle, StyleProp, Dimensions } from "react-native"
import Svg, { Circle } from "react-native-svg"

const dim = Dimensions.get("window");

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
  duration = 500,
  height = 6,
  color = "#4ade80",
  trackColor = "rgba(255,255,255,0.2)",
  style
}: LinearProps) {
  const animated = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animated, {
      toValue: progress,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false
    }).start()
  }, [progress])

  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  })

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
  duration = 800,
  size = 80,
  strokeWidth = 6,
  color = "#4ade80",
  trackColor = "rgba(255,255,255,0.2)",
  style
}: CircularProps) {
  const animated = useRef(new Animated.Value(0)).current

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    Animated.timing(animated, {
      toValue: progress,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start()
  }, [progress])

  const strokeDashoffset = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0]
  })

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

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

//////////////////////////////////////////////////////////
// 🎨 Styles
//////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  linearContainer: {
    width: 200,
    overflow: "hidden",
    borderRadius: 999,
    alignSelf: "center",
    margin: 8
  }
})