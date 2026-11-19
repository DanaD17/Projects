import Snowfall from "react-snowfall";

export default function SnowfallEffect() {
    return (
        <Snowfall
            color="#fff"
            snowflakeCount={220}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 9999
            }}
        />
    );
}