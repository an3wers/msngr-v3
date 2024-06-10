import "./styles/App.css";
import { Providers } from "./providers";
import { useEffect } from "react";
import * as model from "../entities/user/index";
import { RoutesView } from "../pages";

function App() {
  useEffect(() => {
    model.getUser();
  }, []);

  return (
    <Providers>
      {/* TODO: Заменить на Atomic router */}
      {/* <AppRouter /> */}
      <RoutesView />
    </Providers>
  );
}

export default App;
