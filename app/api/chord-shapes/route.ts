import { NextRequest, NextResponse } from "next/server";
import { getChordShapes } from "@/utils/chordShapeUtils";
import {
  ChordShapeRequest,
  Instrument,
  GridWidth,
  GuitarFrets,
  UkuleleFrets,
  OctaveLength,
  PushLayout,
  PushMode,
  ScaleName,
} from "@/types";

const VALID_INSTRUMENTS: Instrument[] = [
  "launchpad",
  "push",
  "guitar",
  "ukulele",
  "piano",
];

const parseInstruments = (input?: string | null): Instrument[] | undefined => {
  if (!input) return undefined;
  const list = input
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is Instrument =>
      VALID_INSTRUMENTS.includes(s as Instrument),
    );
  return list.length > 0 ? list : undefined;
};

const parseChordParam = (input: string): string | number[] => {
  const trimmed = input.trim();
  if (trimmed.includes(",")) {
    const parts = trimmed
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    if (parts.length >= 3) {
      return parts;
    }
  }
  return trimmed;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rootParam = searchParams.get("root");
  const chordParam = searchParams.get("chord");

  if (!rootParam) {
    return NextResponse.json(
      {
        error:
          "Missing required 'root' query parameter (e.g. root=C or root=1).",
      },
      { status: 400 },
    );
  }

  if (!chordParam) {
    return NextResponse.json(
      {
        error:
          "Missing required 'chord' query parameter (e.g. chord=Major or chord=1,4,3).",
      },
      { status: 400 },
    );
  }

  const instruments =
    parseInstruments(searchParams.get("instrument")) ??
    parseInstruments(searchParams.get("instruments"));

  const gridWidthParam = searchParams.get("gridWidth");
  const pushModeParam = searchParams.get("pushMode");
  const pushLayoutParam = searchParams.get("pushLayout");
  const scaleParam = searchParams.get("scale");
  const scaleRootNoteParam = searchParams.get("scaleRootNote");
  const guitarFretsParam = searchParams.get("guitarFrets");
  const ukuleleFretsParam = searchParams.get("ukuleleFrets");
  const octavesParam = searchParams.get("octaves");

  const config: ChordShapeRequest["config"] = {};

  if (gridWidthParam) {
    const parsed = parseInt(gridWidthParam, 10);
    if ([2, 3, 4, 5, 8].includes(parsed)) {
      config.gridWidth = parsed as GridWidth;
    }
  }

  if (pushModeParam && ["chromatic", "inKey"].includes(pushModeParam)) {
    config.pushMode = pushModeParam as PushMode;
  }

  if (pushLayoutParam && ["4ths", "3rds", "sequent"].includes(pushLayoutParam)) {
    config.pushLayout = pushLayoutParam as PushLayout;
  }

  if (scaleParam && ["Major", "Minor"].includes(scaleParam)) {
    config.scale = scaleParam as ScaleName;
  }

  if (scaleRootNoteParam) {
    const parsed = parseInt(scaleRootNoteParam, 10);
    if (!isNaN(parsed)) {
      config.scaleRootNote = parsed;
    }
  }

  if (guitarFretsParam) {
    const parsed = parseInt(guitarFretsParam, 10);
    if ([3, 5, 7, 9, 12].includes(parsed)) {
      config.guitarFrets = parsed as GuitarFrets;
    }
  }

  if (ukuleleFretsParam) {
    const parsed = parseInt(ukuleleFretsParam, 10);
    if ([3, 5, 7, 9, 12].includes(parsed)) {
      config.ukuleleFrets = parsed as UkuleleFrets;
    }
  }

  if (octavesParam) {
    const parsed = parseInt(octavesParam, 10);
    if ([1, 2, 3, 4].includes(parsed)) {
      config.octaves = parsed as OctaveLength;
    }
  }

  try {
    const chord = parseChordParam(chordParam);
    const response = getChordShapes({
      root: rootParam,
      chord,
      instruments,
      config: Object.keys(config).length > 0 ? config : undefined,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  const payload = body as Record<string, unknown>;

  const root = payload.root;
  const chord = payload.chord;

  if (!root || (typeof root !== "string" && typeof root !== "number")) {
    return NextResponse.json(
      { error: "Missing or invalid 'root' in request body." },
      { status: 400 },
    );
  }

  if (!chord || (typeof chord !== "string" && !Array.isArray(chord))) {
    return NextResponse.json(
      { error: "Missing or invalid 'chord' in request body." },
      { status: 400 },
    );
  }

  let instruments: Instrument[] | undefined;
  if (Array.isArray(payload.instruments)) {
    instruments = (payload.instruments as string[])
      .map((s) => s.toLowerCase())
      .filter((s): s is Instrument =>
        VALID_INSTRUMENTS.includes(s as Instrument),
      );
  } else if (typeof payload.instrument === "string") {
    instruments = parseInstruments(payload.instrument);
  }

  const rawConfig =
    payload.config && typeof payload.config === "object"
      ? (payload.config as Record<string, unknown>)
      : payload;

  const config: ChordShapeRequest["config"] = {};

  if (
    typeof rawConfig.gridWidth === "number" &&
    [2, 3, 4, 5, 8].includes(rawConfig.gridWidth)
  ) {
    config.gridWidth = rawConfig.gridWidth as GridWidth;
  }

  if (
    typeof rawConfig.pushMode === "string" &&
    ["chromatic", "inKey"].includes(rawConfig.pushMode)
  ) {
    config.pushMode = rawConfig.pushMode as PushMode;
  }

  if (
    typeof rawConfig.pushLayout === "string" &&
    ["4ths", "3rds", "sequent"].includes(rawConfig.pushLayout)
  ) {
    config.pushLayout = rawConfig.pushLayout as PushLayout;
  }

  if (
    typeof rawConfig.scale === "string" &&
    ["Major", "Minor"].includes(rawConfig.scale)
  ) {
    config.scale = rawConfig.scale as ScaleName;
  }

  if (typeof rawConfig.scaleRootNote === "number") {
    config.scaleRootNote = rawConfig.scaleRootNote;
  }

  if (
    typeof rawConfig.guitarFrets === "number" &&
    [3, 5, 7, 9, 12].includes(rawConfig.guitarFrets)
  ) {
    config.guitarFrets = rawConfig.guitarFrets as GuitarFrets;
  }

  if (
    typeof rawConfig.ukuleleFrets === "number" &&
    [3, 5, 7, 9, 12].includes(rawConfig.ukuleleFrets)
  ) {
    config.ukuleleFrets = rawConfig.ukuleleFrets as UkuleleFrets;
  }

  if (
    typeof rawConfig.octaves === "number" &&
    [1, 2, 3, 4].includes(rawConfig.octaves)
  ) {
    config.octaves = rawConfig.octaves as OctaveLength;
  }

  try {
    const response = getChordShapes({
      root,
      chord: chord as string | number[],
      instruments,
      config: Object.keys(config).length > 0 ? config : undefined,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
