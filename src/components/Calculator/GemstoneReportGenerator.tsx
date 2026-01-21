import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, CalculatorParams } from '@/API/Calculator';
import { toastError } from '@/utlity/AlertSystem';
import { getStoneInfo, StoneInfo } from '@/utlity/StoneMapper';

interface Props {}

const GemstoneReportGenerator: React.FC<Props> = () => {
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ dob?: string; tob?: string; pob?: string }>({});
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<{
    healthStone: StoneInfo | null;
    lifeStones: StoneInfo[];
    luckStone: StoneInfo | null;
  } | null>(null);

  const valid = useMemo(() => !!dob && !!tob && !!pob, [dob, tob, pob]);

  // 🔼 SCROLL TO TOP ON PAGE LOAD (ADDED)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Autocomplete logic
  useEffect(() => {
    if (pob.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            pob
          )}&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const t = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(t);
  }, [pob]);

  const handleSuggestionClick = (s: any) => {
    setPob(s.display_name);
    setCoords({ lat: parseFloat(s.lat), lng: parseFloat(s.lon) });
    setSuggestions([]);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toastError("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          setPob(data.display_name || "");
        } catch (error) {
          toastError("Unable to fetch address");
        }
      },
      (err) => toastError(err.message)
    );
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!dob) e.dob = "Please enter your date of birth";
    if (!tob) e.tob = "Please enter your time of birth";
    if (!pob) e.pob = "Please enter your place of birth";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fetchReportStones = async () => {
    try {
      const data: CalculatorParams = {
        type: "report",
        dob,
        tob,
        place: pob,
        latitude: coords?.lat,
        longitude: coords?.lng,
      };

      const res = await Calculator(data);

      if (!res || res.length === 0) {
        throw new Error("No stones returned from API");
      }

      const stoneInfos: StoneInfo[] = [];
      res.forEach((stone) => {
        const eng_name = stone.split("(")[0].trim();
        const stoneInfo = getStoneInfo(eng_name);
        if (stoneInfo) stoneInfos.push(stoneInfo);
      });

      return {
        healthStone: stoneInfos[0] || null,
        lifeStones: stoneInfos.slice(1, 3),
        luckStone: stoneInfos[stoneInfos.length - 1] || null,
      };
    } catch (error) {
      toastError("Unable to generate your gemstone report");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const result = await fetchReportStones();
      setReportData(result);

      setTimeout(() => {
        document
          .querySelector(".reportGenerator_resultsSection")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  // generatePDF() unchanged — kept exactly as-is

  return (
    <div className="lifeCalculator_container">
      <header className="lifeCalculator_header">
        <div className="lifeCalculator_logo">त्रिakshi Gems ॐ</div>
        <div className="lifeCalculator_tagline">
          Generate Your Personalized Gemstone Report
        </div>
      </header>

      {/* rest of JSX unchanged */}
    </div>
  );
};

export default GemstoneReportGenerator;
