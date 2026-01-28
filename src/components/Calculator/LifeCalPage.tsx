import { Calculator, CalculatorParams } from "@/API/Calculator";
import { toastError } from "@/utlity/AlertSystem";
import { getStoneInfo, StoneInfo } from "@/utlity/StoneMapper";
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./luckyStoneCalculator.css";

interface Props {}

// Stone URL mapping
const STONE_URL_MAP: Record<string, string> = {
  'Ruby': 'https://triakshi.co.in/gem-view/696b91788cd5859c4f598a29',
  'Pearl': 'https://triakshi.co.in/gem-view/69722de4b100ec8faf05d963',
  'Red Coral': 'https://triakshi.co.in/gem-view/696b51538cd5859c4f598a00',
  'Emerald': 'https://triakshi.co.in/gem-view/6971a135b100ec8faf05d955',
  'Yellow Sapphire': 'https://triakshi.co.in/gem-view/696b5c008cd5859c4f598a08',
  'Opal': 'https://triakshi.co.in/gem-view/6970a34eb9e593c765145ae5',
  'Blue Sapphire': 'https://triakshi.co.in/gem-view/696b9cb28cd5859c4f598a36',
  "Cat's Eye": 'https://triakshi.co.in/gem-view/696b94a08cd5859c4f598a2a',
  'Hessonite': 'https://triakshi.co.in/gem-view/6971a90cb100ec8faf05d960',
  'Gomed': 'https://triakshi.co.in/gem-view/6971a90cb100ec8faf05d960',
};

const LifeStoneCalculator: React.FC<Props> = () => {
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ dob?: string; tob?: string; pob?: string }>({});
  const [loading, setLoading] = useState(false);
  const [stones, setStones] = useState<StoneInfo[] | null>(null);

  const navigate = useNavigate();
  const valid = useMemo(() => !!dob && !!tob && !!pob, [dob, tob, pob]);

  // Scroll to top on page load
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

  // User Location
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

  // Fetch Life Stones
  const fetchLifeStones = async (): Promise<StoneInfo[]> => {
    try {
      const data: CalculatorParams = {
        type: "life",
        dob,
        tob,
        place: pob,
        latitude: coords?.lat,
        longitude: coords?.lng,
      };

      const res = await Calculator(data);

      const stoneInfos: StoneInfo[] = [];
      if (!res || res.length === 0) {
        throw new Error("No stones returned from API");
      }

      res.forEach((stone) => {
        const eng_name = stone.split("(")[0].trim();
        const stoneInfo = getStoneInfo(eng_name);
        if (stoneInfo) stoneInfos.push(stoneInfo);
      });

      return stoneInfos;
    } catch (error) {
      toastError("Unable to get your life stones");
      return [];
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const result = await fetchLifeStones();
      setStones(result);

      setTimeout(() => {
        document
          .querySelector(".lifeCalculator_resultsSection")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const handleStoneClick = (stoneName: string) => {
    // Get the URL from the mapping
    const url = STONE_URL_MAP[stoneName];
    if (url) {
      window.open(url, '_blank');
    } else {
      toastError(`No URL found for ${stoneName}`);
    }
  };

  return (
    <div className="lifeCalculator_container">
      <header className="lifeCalculator_header">
        <div className="lifeCalculator_logo">त्रिakshi Gems ॐ</div>
        <div className="lifeCalculator_tagline">
          Unlock Your True Life Path with Personalized Gemstones
        </div>
      </header>

      <section className="lifeCalculator_inputSection">
        <h2 className="lifeCalculator_sectionTitle">Discover Your Life Stones</h2>

        <form id="lifeCalculator_birthForm" onSubmit={onSubmit}>
          <div className="lifeCalculator_formGroup">
            <label>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dob && <span className="lifeCalculator_errorMessage">{errors.dob}</span>}
          </div>

          <div className="lifeCalculator_formGroup">
            <label>Time of Birth</label>
            <input type="time" value={tob} onChange={(e) => setTob(e.target.value)} />
            {errors.tob && <span className="lifeCalculator_errorMessage">{errors.tob}</span>}
          </div>

          <div className="lifeCalculator_formGroup" style={{ position: "relative" }}>
            <label>Place of Birth</label>
            <input
              type="text"
              placeholder="Start typing your birth city..."
              value={pob}
              onChange={(e) => setPob(e.target.value)}
            />

            {suggestions.length > 0 && (
              <ul className="lifeCalculator_suggestionList">
                {suggestions.map((s, idx) => (
                  <li key={idx} onClick={() => handleSuggestionClick(s)}>
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}

            <button type="button" className="lifeCalculator_geoBtn" onClick={handleUseMyLocation}>
              📍 Use My Current Location
            </button>

            {errors.pob && <span className="lifeCalculator_errorMessage">{errors.pob}</span>}
          </div>

          <button
            type="submit"
            className={`lifeCalculator_calculateBtn ${loading ? "lifeCalculator_loading" : ""}`}
            disabled={!valid || loading}
          >
            {loading ? "Calculating..." : "Find My Life Stones"}
          </button>
        </form>
      </section>

      {stones && stones.length > 0 && (
        <section className="lifeCalculator_resultsSection">
          <h2 className="lifeCalculator_resultsTitle">Your Personal Life Stones</h2>
          <div className="lifeCalculator_stonesGrid">
            {stones.map((stone, index) => (
              <article key={index} className="lifeCalculator_stoneCard">
                <img
                  src={stone.image}
                  alt={stone.englishName}
                  className="lifeCalculator_stoneImage"
                />

                <div className="lifeCalculator_stoneContent">
                  <h3 className="lifeCalculator_stoneName">{stone.englishName}</h3>
                  {stone.hindiName && (
                    <p className="lifeCalculator_stoneHindiName">({stone.hindiName})</p>
                  )}
                  <button
                    onClick={() => handleStoneClick(stone.englishName)}
                    className="lifeCalculator_exploreBtn"
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default LifeStoneCalculator;