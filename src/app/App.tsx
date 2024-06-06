import "./styles/App.css";
import { AppRouter } from "./routes";
import { Providers } from "./providers";

function App() {
  return (
    <Providers>
      {/* TODO: Заменить на Atomic router */}
      <AppRouter />
    </Providers>
  );
}

export default App;
