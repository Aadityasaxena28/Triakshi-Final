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
};

const LuckyStoneCalculator: React.FC<Props> = () => {
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
  
  // 🔼 SCROLL TO TOP ON ROUTE LOAD (ONLY ADDITION)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // 🌍 Fetch autocomplete suggestions from OpenStreetMap (Nominatim)
  useEffect(() => {
    if (pob.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(pob)}&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 400); // debounce input
    return () => clearTimeout(debounceTimer);
  }, [pob]);

  const handleSuggestionClick = (suggestion: any) => {
    setPob(suggestion.display_name);
    setCoords({ lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) });
    setSuggestions([]);
  };

  // 🧭 Optional: Get current user location
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
          toastError("Unable to fetch address from location");
        }
      },
      (err) => {
        toastError("Failed to access location: " + err.message);
      }
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

  const fetchLuckyStones = async (): Promise<StoneInfo[]> => {
    try {
      const data: CalculatorParams = {
        type: "luck",
        dob,
        tob,
        place: pob,
        latitude: coords?.lat,
        longitude: coords?.lng,
      };

      const res = await Calculator(data);
      console.log("API response for lucky stones:", res);

      const stoneInfos: StoneInfo[] = [];

      if (!res || res.length === 0) {
        throw new Error("No stones returned from API");
      }

      res.forEach((stone) => {
        const eng_name = stone.split("(")[0].trim();
        const stoneInfo = getStoneInfo(eng_name);
        if (stoneInfo) {
          stoneInfos.push(stoneInfo);
        } else {
          toastError(`Stone not found in mapping: ${stone}`);
        }
      });

      return stoneInfos;
    } catch (error) {
      toastError(error || "Unable to get your lucky stones ");
      return [];
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const result = await fetchLuckyStones();
      setStones(result);

      setTimeout(() => {
        const resultsSection = document.querySelector(".lifeCalculator_resultsSection");
        resultsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error("Error fetching lucky stones:", err);
      toastError("Failed to calculate lucky stones. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStoneClick = (stoneName: string) => {
    // Get the URL from the mapping, fallback to productUrl if not found
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
          Unlock Your Potential with Personalized Gemstones
        </div>
      </header>

      <section className="lifeCalculator_inputSection">
        <h2 className="lifeCalculator_sectionTitle">Discover Your Lucky Stones</h2>

        <form id="lifeCalculator_birthForm" onSubmit={onSubmit}>
          <div className="lifeCalculator_formGroup">
            <label htmlFor="lifeCalculator_dob">Date of Birth</label>
            <input
              type="date"
              id="lifeCalculator_dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dob && <span className="lifeCalculator_errorMessage">{errors.dob}</span>}
          </div>

          <div className="lifeCalculator_formGroup">
            <label htmlFor="lifeCalculator_tob">Time of Birth</label>
            <input
              type="time"
              id="lifeCalculator_tob"
              value={tob}
              onChange={(e) => setTob(e.target.value)}
            />
            {errors.tob && <span className="lifeCalculator_errorMessage">{errors.tob}</span>}
          </div>

          <div className="lifeCalculator_formGroup" style={{ position: "relative" }}>
            <label htmlFor="lifeCalculator_pob">Place of Birth</label>
            <input
              type="text"
              id="lifeCalculator_pob"
              placeholder="Start typing your birth city..."
              value={pob}
              onChange={(e) => setPob(e.target.value)}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul
                className="lifeCalculator_suggestionList"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  position: "absolute",
                  background: "white",
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  zIndex: 10,
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              >
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    style={{ padding: "8px", cursor: "pointer" }}
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              className="lifeCalculator_geoBtn"
              style={{ marginTop: "8px" }}
              onClick={handleUseMyLocation}
            >
              📍 Use My Current Location
            </button>
            {errors.pob && <span className="lifeCalculator_errorMessage">{errors.pob}</span>}
          </div>

          <button
            type="submit"
            className={`lifeCalculator_calculateBtn ${loading ? "lifeCalculator_loading" : ""}`}
            disabled={!valid || loading}
          >
            {loading ? (
              <>
                Calculating...
                <span className="lifeCalculator_loadingSpinner" />
              </>
            ) : (
              "Find My Lucky Stones"
            )}
          </button>
        </form>
      </section>

      {stones && stones.length > 0 && (
        <section className="lifeCalculator_resultsSection">
          <h2 className="lifeCalculator_resultsTitle">Your Personal Lucky Stones</h2>
          <div className="lifeCalculator_stonesGrid">
            {stones.map((stone, index) => (
              <article key={`${stone.englishName}-${index}`} className="lifeCalculator_stoneCard">
                <div className="lifeCalculator_stoneImageWrapper">
                  <img
                    src={stone.image}
                    alt={stone.englishName}
                    className="lifeCalculator_stoneImage"
                    loading="lazy"
                  />
                </div>

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

export default LuckyStoneCalculator;