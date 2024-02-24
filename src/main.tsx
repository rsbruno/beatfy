import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes/index.routes";
import "@/themes/global.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
