import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/chord-shapes/route";

describe("GET /api/chord-shapes", () => {
  it("should return chord shapes for valid root and chord", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/chord-shapes?root=C&chord=Major",
    );
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.root.name).toBe("C");
    expect(data.chord.name).toBe("Major");
    expect(data.chordNotes).toEqual(["C", "E", "G"]);
    expect(data.shapes.launchpad).toBeDefined();
    expect(data.shapes.push).toBeDefined();
    expect(data.shapes.guitar).toBeDefined();
    expect(data.shapes.ukulele).toBeDefined();
    expect(data.shapes.piano).toBeDefined();
  });

  it("should filter by instrument and apply layout configs", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/chord-shapes?root=G&chord=7th&instruments=guitar,push&guitarFrets=5&pushMode=inKey&pushLayout=3rds",
    );
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.root.name).toBe("G");
    expect(data.chord.name).toBe("7th");
    expect(Object.keys(data.shapes).sort()).toEqual(["guitar", "push"]);
    expect(data.shapes.guitar.frets).toBe(5);
    expect(data.shapes.push.config.pushMode).toBe("inKey");
    expect(data.shapes.push.config.pushLayout).toBe("3rds");
  });

  it("should handle custom comma-separated interval patterns", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/chord-shapes?root=D&chord=1,4,3&instrument=piano",
    );
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.root.name).toBe("D");
    expect(data.chord.name).toBe("Custom");
    expect(data.chord.pattern).toEqual([1, 4, 3]);
    expect(data.shapes.piano).toBeDefined();
    expect(data.shapes.guitar).toBeUndefined();
  });

  it("should return 400 when root is missing", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/chord-shapes?chord=Major",
    );
    const res = await GET(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("Missing required 'root'");
  });

  it("should return 400 when chord is missing", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/chord-shapes?root=C",
    );
    const res = await GET(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("Missing required 'chord'");
  });

  it("should return 400 for invalid root or chord", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/chord-shapes?root=Z&chord=Major",
    );
    const res = await GET(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("Invalid root note");
  });
});

describe("POST /api/chord-shapes", () => {
  it("should return chord shapes for valid JSON body", async () => {
    const req = new NextRequest("http://localhost:3000/api/chord-shapes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        root: "A",
        chord: "Minor",
        instruments: ["launchpad"],
        config: { gridWidth: 4 },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.root.name).toBe("A");
    expect(data.chord.name).toBe("Minor");
    expect(data.shapes.launchpad.dimensions.gridWidth).toBe(4);
    expect(data.shapes.piano).toBeUndefined();
  });

  it("should return 400 for missing root or chord in JSON body", async () => {
    const req = new NextRequest("http://localhost:3000/api/chord-shapes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ root: "C" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("Missing or invalid 'chord'");
  });
});
