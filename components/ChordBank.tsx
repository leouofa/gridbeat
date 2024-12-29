"use client"

import React, { useState } from 'react';

interface Chord {
    name: string;
    pattern: number[];
}

const ChordBank: React.FC = () => {
    const chords: Chord[] = [
        { name: 'Major', pattern: [1, 4, 3] },
        { name: 'Minor', pattern: [1, 3, 4] },
        { name: 'Diminished', pattern: [1, 3, 3] },
        { name: 'Augmented', pattern: [1, 4, 4] },
        { name: 'Sustained', pattern: [1, 5, 2] },
        { name: 'Sustained2', pattern: [1, 2, 5] },
        { name: '6th', pattern: [1, 4, 3, 2] },
        { name: '7th', pattern: [1, 4, 3, 3] },
        { name: 'Maj7', pattern: [1, 4, 3, 4] },
        { name: '9', pattern: [1, 4, 3, 3, 4] },
        { name: '5', pattern: [1, 7, 5] },
    ];

    const [selectedChord, setSelectedChord] = useState<Chord | null>(null);

    // Handle selection of a chord
    const handleSelectChord = (chordName: string) => {
        const chord = chords.find((c) => c.name === chordName);
        setSelectedChord(chord || null);
    };

    return (
        <div className="p-8 font-mono">
            <h1 className="text-2xl font-bold mb-4">Chord Bank</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Available Chords</h2>
                <ul className="flex space-x-4">
                    {chords.map((chord) => (
                        <li key={chord.name}>
                            <button
                                onClick={() => handleSelectChord(chord.name)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {chord.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedChord && (
                <div className="p-4 border rounded shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Selected Chord</h2>
                    <p className="mb-1"><strong>Name:</strong> {selectedChord.name}</p>
                    <p><strong>Pattern:</strong> {selectedChord.pattern.join(' - ')}</p>
                </div>
            )}
        </div>
    );
};

export default ChordBank;