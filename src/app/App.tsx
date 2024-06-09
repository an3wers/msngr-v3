import "./styles/App.css";
import { AppRouter } from "./routes";
import { Providers } from "./providers";
import { useEffect } from "react";
import * as model from "../entities/user/index";
import { Home } from "../pages/home";

function App() {
  useEffect(() => {
    model.getUser();
  }, []);

  return (
    <Providers>
      {/* TODO: Заменить на Atomic router */}
      {/* <AppRouter /> */}
      <Home />
    </Providers>
  );
}

export default App;
