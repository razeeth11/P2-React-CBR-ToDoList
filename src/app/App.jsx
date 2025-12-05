import { useTheme } from "next-themes";
import "../styles/App.css";
import { Button } from "@/components/ui/button";

function App() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div>
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Dark
        </Button>
      </div>
    </>
  );
}

export default App;
