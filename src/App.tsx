import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";
import CustomRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <CustomRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
