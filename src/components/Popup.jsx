import React from "react";
import { useTransition, animated } from "react-spring";

export default function Popup({ children, visible, setVisible }) {
    console.log("Render Popup");

    // #################################################
    //   TRANSITIONS
    // #################################################

    const blurTransition = useTransition(visible, {
        from: { backgroundColor: "rgba(0, 0, 0, 0)", backdropFilter: "blur(10px) opacity(0)" },
        enter: { backgroundColor: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur(10px) opacity(1)" },
        leave: { backgroundColor: "rgba(0, 0, 0, 0)", backdropFilter: "blur(10px) opacity(0)" },
        reverse: visible,
    });

    const contentTransition = useTransition(visible, {
        from: { translateY: "100vh" },
        enter: { translateY: "0vh" },
        leave: { translateY: "100vh" },
        reverse: visible,
    });

    // #################################################
    //   CLOSE
    // #################################################

    return (
        <div className="popup">
            {blurTransition(
                (styles, item) =>
                    item && (
                        <animated.div className="blur" style={styles} onClick={() => setVisible(false)}></animated.div>
                    )
            )}
            {contentTransition(
                (styles, item) =>
                    item && (
                        <animated.div className="container" style={styles}>
                            {children}
                        </animated.div>
                    )
            )}
        </div>
    );
}
