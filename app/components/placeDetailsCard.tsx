"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function placeDetailsCard () {
    const popularPlaces = async () => {
        try {
            const response = await fetch('/api/placeDetails', {
                method: 'POST',
                headers: {'Content-Type': 'application/JSON'},
                body: JSON.stringify({ message: "10 popular places to visit now"})
            });

            const data = await response.json();
            
        }
    };
    return (
        <div>

        </div>
    );
}