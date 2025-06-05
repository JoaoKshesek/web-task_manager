"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { store } from "@/store";
import ThemeRegistry from "./ThemeRegistry";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <ThemeRegistry>
          {props.children}
          <Toaster position={"top-right"} toastOptions={{ className: "react-hot-toast" }} />
        </ThemeRegistry>
      </LocalizationProvider>
    </Provider>
  );
};

export default Providers;
