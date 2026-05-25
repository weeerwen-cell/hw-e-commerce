import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {  QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./features/auth/pages/AuthProvider";




function App() {
  return (
    <MantineProvider>
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
     </QueryClientProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
