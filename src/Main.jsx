import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { AudioProvider } from "./context/AudioContext"

import { SceneProvider } from "./context/SceneContext"
import { ViewProvider } from "./context/ViewContext"

import { SoundProvider } from "./context/SoundContext"

// import i18n (needs to be bundled ;))
import "./lib/localization/i18n"

import App from "./App"
import { LanguageProvider } from "./context/LanguageContext"
import { initBridge } from "./bridge"

// Initialize WebView bridge for React Native communication
initBridge()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <AudioProvider>
        <ViewProvider>
          <SceneProvider>
            <SoundProvider>
              <Suspense>
                <App />
              </Suspense>
            </SoundProvider>
          </SceneProvider>
        </ViewProvider>
      </AudioProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
