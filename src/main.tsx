import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PostHogProvider } from "@posthog/react";
import "./index.css";
import App from "./App.tsx";
import { About } from "./components/About.tsx";
import { Privacy } from "./components/Privacy.tsx";

const posthogKey = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;
const isPostHogConfigured = Boolean(posthogKey && posthogHost);

const options = {
  api_host: posthogHost,
  autocapture: true,
  capture_pageleave: true,
  defaults: "2026-05-30",
  disable_session_recording: true,
  person_profiles: "never",
  persistence: "memory",
  capture_exceptions: {
    capture_unhandled_errors: true,
    capture_unhandled_rejections: true,
    capture_console_errors: false,
  },
} as const;

const app = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App isPostHogConfigured={isPostHogConfigured} />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {posthogKey && posthogHost ? (
      <PostHogProvider apiKey={posthogKey} options={options}>
        {app}
      </PostHogProvider>
    ) : (
      app
    )}
  </StrictMode>,
);
