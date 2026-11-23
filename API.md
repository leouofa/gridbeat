# 🔌 GridBeat Chord Shapes API Reference

GridBeat provides an HTTP API at `/api/chord-shapes` for retrieving deterministic chord shapes and layout calculations across multiple musical instruments. It is designed for external applications, music composition tools, and Model Context Protocol (MCP) agents (such as Antigravity, Claude, and Cursor).

---

## Endpoint Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/chord-shapes` | Query chord shapes using URL search parameters |
| `POST` | `/api/chord-shapes` | Query chord shapes using a JSON request body |

---

## Request Parameters

### Core Parameters

| Parameter | Type | Required | Description | Examples |
| :--- | :--- | :--- | :--- | :--- |
| `root` | `string \| number` | **Yes** | Root note name, accidental enharmonic, or 1–12 index | `"C"`, `"C#"`, `"Db"`, `"F♯"`, `1` |
| `chord` | `string \| number[]` | **Yes** | Chord name, alias, or comma-separated / array intervals | `"Major"`, `"Minor"`, `"7th"`, `"Maj7"`, `"1,4,3"`, `[1, 4, 3]` |
| `instrument` / `instruments` | `string \| string[]` | No | Comma-separated or array of instruments. Defaults to all 5 | `"guitar,launchpad"`, `["push", "piano"]` |

#### Supported Instruments
- `launchpad`: Novation Launchpad 8x8 isomorphic grid
- `push`: Ableton Push 8x8 isomorphic grid
- `guitar`: 6-string guitar fretboard (standard tuning)
- `ukulele`: 4-string ukulele fretboard (standard tuning)
- `piano`: Piano keyboard across configurable octaves

#### Supported Chords & Aliases
- `Major` (`maj`)
- `Minor` (`min`, `m`)
- `Diminished` (`dim`)
- `Augmented` (`aug`)
- `Sustained` (`sus`, `sus4`)
- `Sustained2` (`sus2`)
- `6th` (`6`)
- `7th` (`7`, `dom7`)
- `Maj7` (`major7`)
- `9` (`9th`)
- `5` (`power`)
- Custom interval arrays (e.g., `[1, 4, 3]`)

---

### Layout Configuration Parameters

You can customize each instrument's layout calculation by supplying configuration parameters:

| Parameter | Type | Allowed Values | Default | Target Instrument |
| :--- | :--- | :--- | :--- | :--- |
| `gridWidth` | `number` | `2`, `3`, `4`, `5`, `8` | `8` | `launchpad` |
| `pushMode` | `string` | `"chromatic"`, `"inKey"` | `"chromatic"` | `push` |
| `pushLayout` | `string` | `"4ths"`, `"3rds"`, `"sequent"` | `"4ths"` | `push` |
| `scale` | `string` | `"Major"`, `"Minor"` | Inferred | `push` (inKey) |
| `scaleRootNote` | `number` | `1`–`12` | Chord root | `push` (inKey) |
| `guitarFrets` | `number` | `3`, `5`, `7`, `9`, `12` | `12` | `guitar` |
| `ukuleleFrets` | `number` | `3`, `5`, `7`, `9`, `12` | `12` | `ukulele` |
| `octaves` | `number` | `1`, `2`, `3`, `4` | `2` | `piano` |

---

## Response Structure

The endpoint returns a JSON payload containing:
- `root`: Canonical root note information (name, alias, color codes, natural flag).
- `chord`: Chord name, interval pattern, and description.
- `chordNotes`: Array of note names contained in the chord (e.g. `["C", "E", "G"]`).
- `shapes`: Dictionary of calculated instrument shapes keyed by instrument name.

### Shape Representations

#### 1. Grid Instruments (`launchpad`, `push`)
```json
{
  "instrument": "launchpad",
  "type": "grid",
  "dimensions": { "rows": 8, "columns": 8, "gridWidth": 8 },
  "activePositions": [
    { "row": 0, "column": 0, "note": "C", "pitch": "C2", "isRoot": true },
    { "row": 0, "column": 4, "note": "E", "pitch": "E2", "isRoot": false }
  ]
}
```

#### 2. Fretboard Instruments (`guitar`, `ukulele`)
```json
{
  "instrument": "guitar",
  "type": "fretboard",
  "frets": 12,
  "tuning": [
    { "string": 1, "note": "E", "octave": 4 },
    { "string": 2, "note": "B", "octave": 3 },
    { "string": 3, "note": "G", "octave": 3 },
    { "string": 4, "note": "D", "octave": 3 },
    { "string": 5, "note": "A", "octave": 2 },
    { "string": 6, "note": "E", "octave": 2 }
  ],
  "activePositions": [
    { "string": 1, "fret": 0, "note": "E", "pitch": "E4", "isRoot": false },
    { "string": 2, "fret": 1, "note": "C", "pitch": "C4", "isRoot": true }
  ]
}
```

#### 3. Keyboard Instrument (`piano`)
```json
{
  "instrument": "piano",
  "type": "keyboard",
  "octaves": 2,
  "totalKeys": 25,
  "activePositions": [
    { "keyIndex": 0, "octave": 0, "note": "C", "pitch": "C2", "isRoot": true, "isBlack": false },
    { "keyIndex": 4, "octave": 0, "note": "E", "pitch": "E2", "isRoot": false, "isBlack": false }
  ]
}
```

---

## Examples

### 1. Simple GET Request (All Instruments)
```bash
curl "http://localhost:3000/api/chord-shapes?root=C&chord=Major"
```

### 2. Filtered GET with Custom Layout Options
```bash
curl "http://localhost:3000/api/chord-shapes?root=G&chord=7th&instruments=guitar,push&guitarFrets=5&pushMode=inKey&pushLayout=3rds"
```

### 3. POST Request with JSON Body
```bash
curl -X POST "http://localhost:3000/api/chord-shapes" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "A",
    "chord": "Minor",
    "instruments": ["launchpad", "piano"],
    "config": {
      "gridWidth": 4,
      "octaves": 3
    }
  }'
```

### 4. Custom Interval Pattern
```bash
curl "http://localhost:3000/api/chord-shapes?root=D&chord=1,4,3&instruments=piano"
```

---

## Error Handling

If required parameters are missing or an invalid root note or chord is provided, the API returns HTTP `400 Bad Request` with an explanatory JSON payload:

```json
{
  "error": "Invalid root note: \"Z\""
}
```
