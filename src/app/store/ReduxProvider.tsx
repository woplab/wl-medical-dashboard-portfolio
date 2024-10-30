"use client"; // Add the "use client" directive at the top

import { Provider } from "react-redux";
import store  from "./store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;