"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PlaceDetailsCard () {
    const[places, setPlaces] = useState<any[]>([]);
    const fetchPopularPlaces = async () => {
        try {
            const response = await fetch('/api/placeDetails', {
                method: 'POST',
                headers: {'Content-Type': 'application/JSON'},
                body: JSON.stringify({ message: "10 popular places to visit now"}),
            });

            const data = await response.json();
            setPlaces(Array.isArray(data) ? data : data.places || []);
        } catch (error) {
            console.error("error fetching: ", error);
        }
    };
    useEffect(() => {
        fetchPopularPlaces();
    },[]);

    useEffect(() => {
        if(places) {
            console.log(places);
        }
    },[places]);
    return (
        <div>
            {places.map((place, index) => (
                <div key={index} className="card">
                    <img src={`https://www.google.com/imgres?q=${place.name}`} alt={place.name}/>
                    <div className="container">
                        <h2>{place.name}</h2>
                        <p>{place.description}</p>
                        <a href="#" className="button">Learn More</a>
                    </div>
                </div>
            ))}
            <style jsx>{`
                .card {
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    width: 300px;
                    margin: auto;
                    text-align: center;
                    border-radius: 5px;
                }
                .card img {
                    width: 100%;
                    border-radius: 5px 5px 0 0;
                }
                .container {
                    padding: 16px;
                }
                .button {
                    background-color: #000;
                    color: white;
                    padding: 12px;
                    text-decoration: none;
                    border-radius: 5px;
                }   
            `}</style> 
        </div>
    );
}