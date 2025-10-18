import { Calculator, CalculatorParams } from "@/API/Calculator";
import { toastError } from "@/utlity/AlertSystem";
import { getStoneInfo, StoneInfo } from "@/utlity/StoneMapper";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./luckyStoneCalculator.css";

interface Props {}

const LuckyStoneCalculator: React.FC<Props> = () => {
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");

  const [errors, setErrors] = useState<{ dob?: string; tob?: string; pob?: string }>({});
  const [loading, setLoading] = useState(false);
  const [stones, setStones] = useState<StoneInfo[] | null>(null);

  const navigate = useNavigate();
  const valid = useMemo(() => !!dob && !!tob && !!pob, [dob, tob, pob]);
  
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
      };
      
      const res = await Calculator(data);
      console.log("API response for lucky stones:", res);
      // Map API response to StoneInfo objects
      const stoneInfos: StoneInfo[] = [];
      
      if (!res) {
        throw new Error("No stones returned from API");
      }
      const eng_name = res.split('(')[0].trim();
      console.log("Processing stone:", res, "->", eng_name);
      const stoneInfo = getStoneInfo(eng_name);
      if (stoneInfo) {
        stoneInfos.push(stoneInfo);
      } else {

        throw new Error(`Stone not found in mapping: ${res}`);
      }
  
      
      return stoneInfos;
    } catch (error) {
      throw new Error(error);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    console.log("Calculating lucky stones for", { dob, tob, pob });
    setLoading(true);
    
    try {
      const result = await fetchLuckyStones();
      setStones(result);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        const resultsSection = document.querySelector('.lifeCalculator_resultsSection');
        resultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error("Error fetching lucky stones:", err);
      toastError("Failed to calculate lucky stones. Please try again.");
      // You can add error toast here
    } finally {
      setLoading(false);
    }
  };

  const handleStoneClick = (productUrl: string) => {
    navigate(productUrl);
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
              max={new Date().toISOString().split('T')[0]}
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

          <div className="lifeCalculator_formGroup">
            <label htmlFor="lifeCalculator_pob">Place of Birth</label>
            <input
              type="text"
              id="lifeCalculator_pob"
              placeholder="e.g., New Delhi, India"
              value={pob}
              onChange={(e) => setPob(e.target.value)}
            />
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
          <p className="lifeCalculator_resultsSubtitle">
            Based on your birth details, these gemstones are recommended for you
          </p>
          
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
                    onClick={() => handleStoneClick(stone.productUrl)}
                    className="lifeCalculator_exploreBtn"
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
          
          <div className="lifeCalculator_disclaimer">
            <p>
              * These recommendations are based on Vedic astrology principles. 
              For personalized consultation, please contact our experts.
            </p>
          </div>
        </section>
      )}

      {stones && stones.length === 0 && (
        <section className="lifeCalculator_resultsSection">
          <div className="lifeCalculator_noResults">
            <h3>No stones found</h3>
            <p>Unable to calculate lucky stones based on the provided information.</p>
            <p>Please verify your birth details and try again.</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default LuckyStoneCalculator;