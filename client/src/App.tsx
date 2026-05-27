import { Divider, MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {  QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./features/auth/pages/AuthProvider";
import { Suspense } from "react";



function App() {
  return (
    <MantineProvider>
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback = {<div>Loading</div>}>
      <RouterProvider router={router} />
      </Suspense>
     </QueryClientProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
