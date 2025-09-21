import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Main = lazy(() => import("./pages/Main"));
const Check = lazy(() => import("./pages/Check"));

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/check" element={<Check />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default CustomRoutes;
