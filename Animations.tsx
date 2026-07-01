import { Animated, Dimensions, Easing } from "react-native";
import { useEffect, useRef } from "react";

const dim = Dimensions.get("window");

export function BouncyView(props: {
    children?: React.JSX.Element;
}) {
    const animatedY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const bounceAnim = Animated.timing(animatedY, {
            toValue: dim.width < 450 ? -20 : -30,
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