import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {  QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import { queryClient } from "./lib/queryClient";





function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
     </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
