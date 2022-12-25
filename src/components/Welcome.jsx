import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../index.css";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import data from "./data";
import * as d3 from "d3";
import Modal from "react-modal";

const Welcome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [region, setRegion] = useState({});

  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // const getColor = (dataUsage) => {
    //   const colorScale = d3
    //     .scaleLinear()
    //     .domain([0, 100])
    //     .range(["red", "green"]);

    //   return colorScale(dataUsage);
    // };
    const getColor = (dataUsage) => {
      if (dataUsage > 75) {
        return "red"; // High usage, color the marker red
      } else if (dataUsage > 50) {
        return "blue"; // Moderate usage, color the marker orange
      } else {
        return "green"; // Low usage, color the marker green
      }
    };
    createMarkers(map, data, getColor);
   
  }, []);

  const createMarkers = (map, data, getColor) => {
    data.forEach((region) => {
      const color = getColor(region.dataUsage);
      const marker = L.circleMarker([region.lat, region.lng], {
        color: color,
        radius: 10,
      }).addTo(map);

      const showUsageDetails = (region) => {
        console.log(`Region: ${region.dataUsage}`);
        setIsModalOpen(true);
        setRegion(region);

        // You can add code here to display the usage details in an overlay or modal,
        // or fetch additional data from an API to display in the details view.
      };

      marker.on("click", () => showUsageDetails(region));
    });
  };

  return (
    <>
      
      <div className="border-indigo-800 border-4 p-8">
        <div id="map" style={{ width: "100%", height: "400px" }} className="py-1000"></div>
        <div className="w-10px h-10px">
          <Modal
            
            isOpen={isModalOpen}
            className="bg-white w-20px h-auto "
            onRequestClose={() => setIsOpen(false)}
          >
            <h2>Usage Details</h2>
            <p>Region: {region.region}</p>
            <p>Data usage: {region.dataUsage}</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Welcome;
