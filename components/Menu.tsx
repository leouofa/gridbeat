"use client";

import { usePreferences } from "@/contexts/PreferencesContext";
import { useState, useRef } from "react";
import { GridWidth, Instrument, SynthType } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePathname } from "next/navigation";

// Constants
const CONSTANTS = {
  GRID_WIDTH: [8, 5, 4, 3, 2] as const,
  OCTAVES: [1, 2, 3, 4] as const,
  INSTRUMENTS: ["piano", "grid", "guitar", "ukulele"] as const,
  FRETS: [3, 5, 7, 9, 12] as const,
  SYNTH_TYPES: [
    { value: "poly", label: "Synth" },
    { value: "piano", label: "Piano" },
  ] as const,
  NAV_LINKS: [
    { href: "/notes", label: "Notes" },
    { href: "/chords", label: "Chords" },
    { href: "/scales", label: "Scales" },
    { href: "/favorites", label: "Favorites" },
  ],
} as const;

// Shared Components
const DropdownButton = ({
  label,
  isOpen,
  onClick,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm bg-zinc-800 text-zinc-100 rounded-md hover:bg-zinc-700
              transition-colors duration-200 flex items-center gap-2"
  >
    <span>{label}</span>
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
);

const DropdownContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute right-0 mt-2 py-2 w-48 bg-zinc-800 rounded-md shadow-lg border-2 border-zinc-900">
    {children}
  </div>
);

const DropdownOption = ({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm font-sans ${
      isSelected
        ? "bg-zinc-700 text-white"
        : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
    } transition-colors duration-200`}
  >
    {children}
  </button>
);

// Helper functions
const getLayoutLabel = (width: GridWidth) =>
  width === 8 ? "Sequential" : `${width} Finger`;

const getInstrumentLabel = (instrument: Instrument): string =>
  ({
    grid: "Grid",
    piano: "Piano",
    guitar: "Guitar",
    ukulele: "Ukulele",
  })[instrument];

// Main Menu Component
export function Menu() {
  const { preferences, updatePreferences } = usePreferences();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useClickOutside(menuRef as React.RefObject<HTMLElement>, () => {
    setOpenDropdown(null);
  });

  const toggleDropdown = (dropdown: string) => {
    // Special handling for settings dropdown
    if (dropdown === "settings") {
      // If settings is open and user clicks it again, close it
      if (openDropdown === "settings") {
        setOpenDropdown(null);
      }
      // If another dropdown is open, close it and open settings
      else if (openDropdown !== null) {
        setOpenDropdown("settings");
      }
      // If no dropdown is open, open settings
      else {
        setOpenDropdown("settings");
      }
    }
    // For all other dropdowns
    else {
      setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    }
  };

  const updatePreference = <T extends keyof typeof preferences>(
    key: T,
    value: (typeof preferences)[T],
  ) => {
    updatePreferences({ ...preferences, [key]: value });
    // Don't close the dropdown if we're updating instruments
    if (key !== "visibleInstruments") {
      setOpenDropdown(null);
    }
  };

  const handleInstrumentToggle = (instrument: Instrument) => {
    const currentInstruments = preferences.visibleInstruments;
    const newInstruments = currentInstruments.includes(instrument)
      ? currentInstruments.filter((i) => i !== instrument)
      : [...currentInstruments, instrument];
    updatePreference("visibleInstruments", newInstruments);
    // Don't close the dropdown after toggling an instrument
  };

  const renderNavigation = (currentPath: string) => {
    return (
      <nav className="flex space-x-4">
        {CONSTANTS.NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-md transition-colors duration-200
              ${
                currentPath === href
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    );
  };

  const renderDropdowns = () => (
    <div ref={menuRef} className="flex gap-2">
      {/* Guitar Frets Dropdown - Only show if guitar is visible */}
      {preferences.visibleInstruments.includes("guitar") && (
        <div className="relative">
          <DropdownButton
            label={"Guitar"}
            isOpen={openDropdown === "guitarFrets"}
            onClick={() => toggleDropdown("guitarFrets")}
          />
          {openDropdown === "guitarFrets" && (
            <DropdownContainer>
              <div className="px-4 py-2 text-md text-zinc-400 font-mono font-semibold">
                Frets
              </div>
              <div className="border-t border-1 border-zinc-500" />
              {CONSTANTS.FRETS.map((frets) => (
                <DropdownOption
                  key={frets}
                  isSelected={preferences.guitarFrets === frets}
                  onClick={() => updatePreference("guitarFrets", frets)}
                >
                  {frets} Frets
                </DropdownOption>
              ))}
            </DropdownContainer>
          )}
        </div>
      )}

      {/* Ukulele Frets Dropdown - Only show if ukulele is visible */}
      {preferences.visibleInstruments.includes("ukulele") && (
        <div className="relative">
          <DropdownButton
            label={"Ukulele"}
            isOpen={openDropdown === "ukuleleFrets"}
            onClick={() => toggleDropdown("ukuleleFrets")}
          />
          {openDropdown === "ukuleleFrets" && (
            <DropdownContainer>
              <div className="px-4 py-2 text-md text-zinc-400 font-mono font-semibold">
                Frets
              </div>
              <div className="border-t border-1 border-zinc-500" />
              {CONSTANTS.FRETS.map((frets) => (
                <DropdownOption
                  key={frets}
                  isSelected={preferences.ukuleleFrets === frets}
                  onClick={() => updatePreference("ukuleleFrets", frets)}
                >
                  {frets} Frets
                </DropdownOption>
              ))}
            </DropdownContainer>
          )}
        </div>
      )}

      {/* Octaves Dropdown - Only show if piano is visible */}
      {preferences.visibleInstruments.includes("piano") && (
        <div className="relative">
          <DropdownButton
            label={"Piano"}
            isOpen={openDropdown === "octaves"}
            onClick={() => toggleDropdown("octaves")}
          />
          {openDropdown === "octaves" && (
            <DropdownContainer>
              <div className="px-4 py-2 text-md text-zinc-400 font-mono font-semibold">
                Octaves
              </div>
              <div className="border-t border-1 border-zinc-500" />
              {CONSTANTS.OCTAVES.map((octaves) => (
                <DropdownOption
                  key={octaves}
                  isSelected={preferences.octaves === octaves}
                  onClick={() => updatePreference("octaves", octaves)}
                >
                  {octaves} Octave{octaves > 1 ? "s" : ""}
                </DropdownOption>
              ))}
            </DropdownContainer>
          )}
        </div>
      )}

      {/* Grid Width Dropdown - Only show if grid is visible */}
      {preferences.visibleInstruments.includes("grid") && (
        <div className="relative">
          <DropdownButton
            label={"Grid"}
            isOpen={openDropdown === "gridWidth"}
            onClick={() => toggleDropdown("gridWidth")}
          />
          {openDropdown === "gridWidth" && (
            <DropdownContainer>
              <div className="px-4 py-2 text-md text-zinc-400 font-mono font-semibold">
                Overlap
              </div>
              <div className="border-t border-1 border-zinc-500" />
              {CONSTANTS.GRID_WIDTH.map((width) => (
                <DropdownOption
                  key={width}
                  isSelected={preferences.gridWidth === width}
                  onClick={() => updatePreference("gridWidth", width)}
                >
                  {getLayoutLabel(width)}
                </DropdownOption>
              ))}
            </DropdownContainer>
          )}
        </div>
      )}

      {/* Settings Dropdown */}
      <div className="relative">
        <DropdownButton
          label={`Settings`}
          isOpen={openDropdown === "settings"}
          onClick={() => toggleDropdown("settings")}
        />
        {openDropdown === "settings" && (
          <DropdownContainer>
            <div className="px-4 py-2 text-md text-zinc-400 font-mono font-semibold">
              Instruments
            </div>
            <div className="border-t border-1 border-zinc-500" />
            {CONSTANTS.INSTRUMENTS.map((instrument) => (
              <DropdownOption
                key={instrument}
                isSelected={preferences.visibleInstruments.includes(instrument)}
                onClick={() => handleInstrumentToggle(instrument)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferences.visibleInstruments.includes(
                      instrument,
                    )}
                    onChange={() => {}}
                    className="h-4 w-4"
                  />
                  {getInstrumentLabel(instrument)}
                </div>
              </DropdownOption>
            ))}
            <div className="px-4 py-2 text-md text-zinc-400 font-mono font-semibold mt-2">
              Sound Type
            </div>
            <div className="border-t border-1 border-zinc-500" />
            {CONSTANTS.SYNTH_TYPES.map(({ value, label }) => (
              <DropdownOption
                key={value}
                isSelected={preferences.synthType === value}
                onClick={() =>
                  updatePreference("synthType", value as SynthType)
                }
              >
                {label}
              </DropdownOption>
            ))}
          </DropdownContainer>
        )}
      </div>
    </div>
  );

  const MobileNotice = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 p-4 text-center md:hidden">
      <div className="max-w-sm">
        <Image
          src="/logo.png"
          alt="GridBeat Logo"
          width={64}
          height={64}
          priority
          className="h-14 w-auto mx-auto mb-4"
        />
        <h2 className="text-xl font-bold font-mono text-white mb-2">
          Desktop & Tablet Only
        </h2>
        <p className="text-zinc-300 font-sans">
          GridBeat is optimized for tablets and computers. Please visit us on a
          larger screen for the best experience.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <MobileNotice />
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 bg-zinc-900 text-zinc-100 font-mono">
        <div className="flex items-center gap-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="GridBeat Logo"
              width={64}
              height={64}
              priority
              className="hidden lg:block h-14 w-14 object-contain r-5"
            />
          </Link>
          {/* Hide navigation on mobile */}
          <div className="hidden md:block">{renderNavigation(pathname)}</div>
        </div>
        {/* Hide dropdowns on mobile */}
        <div className="hidden md:block">{renderDropdowns()}</div>
      </div>
    </>
  );
}
