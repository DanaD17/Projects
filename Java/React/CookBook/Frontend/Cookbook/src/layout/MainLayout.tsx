import { Outlet } from "react-router-dom";
import SnowfallEffect from "../components/Snowfall/SnowfallEffect";

export function MainLayout() {
  return (
    <>
      {/* <NavBar /> */}
      <SnowfallEffect />

        <Outlet />
      <main>
      </main>
    </>
  );
}