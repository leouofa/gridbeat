"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Preferences, PreferencesContextType } from "@/types";

const defaultPreferences: Preferences = {
  gridWidth: 8,
  octaves: 2,
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined,
);

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedPreferences = localStorage.getItem("gridbeat-preferences");
    if (storedPreferences) {
      try {
        setPreferences(JSON.parse(storedPreferences));
      } catch (error) {
        console.error("Failed to parse stored preferences:", error);
      }
    }
  }, []);

  // Update preferences and persist to localStorage
  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPreferences };
      localStorage.setItem("gridbeat-preferences", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

// Custom hook to use preferences
export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
