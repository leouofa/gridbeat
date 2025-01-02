"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Preferences, PreferencesContextType } from "@/types";

const defaultPreferences: Preferences = {
  gridWidth: 8,
  octaves: 2,
  visibleInstruments: ["piano", "grid"],
  guitarFrets: 12,
  ukuleleFrets: 12,
  activeChordName: "Major",
};

const PreferencesContext = createContext<PreferencesContextType>({
  preferences: defaultPreferences, // Provide default value here
  updatePreferences: () => {}, // Provide empty function as default
});

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);

  useEffect(() => {
    try {
      const storedPreferences = localStorage.getItem("gridbeat-preferences");
      if (storedPreferences) {
        const parsedPreferences = JSON.parse(storedPreferences);
        // Ensure all required properties exist by merging with defaults
        setPreferences({
          ...defaultPreferences,
          ...parsedPreferences,
        });
      }
    } catch (error) {
      console.error("Failed to parse stored preferences:", error);
      // Fallback to default preferences if there's an error
      setPreferences(defaultPreferences);
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPreferences };
      try {
        localStorage.setItem("gridbeat-preferences", JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save preferences:", error);
      }
      return updated;
    });
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
