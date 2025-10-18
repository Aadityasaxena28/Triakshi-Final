import React, { useMemo, useState } from "react";
import "./LifeCal.css";


type StoneKey =
  | "Ruby"
  | "Pearl"
  | "Red Coral"
  | "Emerald"
  | "Yellow Sapphire"
  | "Diamond"
  | "Blue Sapphire"
  | "Hessonite"
  | "Cat's Eye";

type GemInfo = {
  category: string;
  benefit: string;
  image: string;
  productUrl: string;
};

const GEM_DATA: Record<StoneKey, GemInfo> = {
  Ruby: {
    category: "Life Stone",
    benefit:
      "Enhances courage, vitality, and leadership. Strengthens the Sun's positive influence in your life.",
    image:
      "",
    productUrl: "#ruby",
  },
  Pearl: {
    category: "Mind Stone",
    benefit:
      "Brings emotional balance, peace, and mental clarity. Harmonizes lunar energies for inner calm.",
    image:
      "",
    productUrl: "#pearl",
  },
  "Red Coral": {
    category: "Energy Stone",
    benefit:
      "Boosts physical energy, courage, and determination. Empowers Mars energy for action.",
    image:
      "",
    productUrl: "#coral",
  },
  Emerald: {
    category: "Wisdom Stone",
    benefit:
      "Enhances intelligence, communication, and business acumen. Activates Mercury's blessings.",
    image:
      "",
    productUrl: "#emerald",
  },
  "Yellow Sapphire": {
    category: "Prosperity Stone",
    benefit:
      "Attracts wealth, wisdom, and good fortune. Amplifies Jupiter's benevolent energies.",
    image:
      "",
    productUrl: "#yellow-sapphire",
  },
  Diamond: {
    category: "Luxury Stone",
    benefit:
      "Brings love, luxury, and artistic creativity. Enhances Venus's gifts of beauty and harmony.",
    image:
      "",
    productUrl: "#diamond",
  },
  "Blue Sapphire": {
    category: "Discipline Stone",
    benefit:
      "Provides structure, discipline, and karmic protection. Channels Saturn's transformative power.",
    image:
      "",
    productUrl: "#blue-sapphire",
  },
  Hessonite: {
    category: "Shadow Stone",
    benefit:
      "Removes obstacles and confusion. Balances Rahu's energy for spiritual growth.",
    image:
      "",
    productUrl: "#hessonite",
  },
  "Cat's Eye": {
    category: "Protection Stone",
    benefit:
      "Shields from negative energies and hidden enemies. Harmonizes Ketu's mystical influence.",
    image:
      "",
    productUrl: "#cats-eye",
  },
};

type Props = {
  /** Optional: set your API base like "http://localhost:5000" */
  apiBase?: string;
  /**
   * If you already have stones (4 names) from parent you can pass them in
   * and the component will render the results directly.
   */
  initialStones?: StoneKey[];
};

const LifeCalPage: React.FC<Props> = ({ apiBase, initialStones }) => {
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");
  const [errors, setErrors] = useState<{ dob?: string; tob?: string; pob?: string }>({});
  const [loading, setLoading] = useState(false);
  const [stones, setStones] = useState<StoneKey[] | null>(initialStones || null);

  const valid = useMemo(() => !!dob && !!tob && !!pob, [dob, tob, pob]);

  const validate = () => {
    const e: typeof errors = {};
    if (!dob) e.dob = "Please enter your date of birth";
    if (!tob) e.tob = "Please enter your time of birth";
    if (!pob) e.pob = "Please enter your place of birth";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Replace this with your backend integration when ready
  // You said your calculator endpoint can return:
  // - type="luck"  -> stone9
  // - type="health"-> stone5
  // - type="life"  -> [stone1, stoneNak]
  // If you want all 4 at once for display, you can call 3 times or create a backend that returns all.
  const calculateViaBackend = async (): Promise<StoneKey[]> => {
    if (!apiBase) {
      // Mock fallback if no API base provided
      return ["Ruby", "Emerald", "Yellow Sapphire", "Pearl"];
    }

    // Example of fetching all by making multiple calls (adjust endpoints as per your server)
    const payload = { dob, tob, place: pob };

    const [luckRes, healthRes, lifeRes] = await Promise.all([
      fetch(`${apiBase}/api/astro/calculator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type: "luck" }),
      }),
      fetch(`${apiBase}/api/astro/calculator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type: "health" }),
      }),
      fetch(`${apiBase}/api/astro/calculator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type: "life" }),
      }),
    ]);

    const luckJson = await luckRes.json();   // { success:true, result: "Yellow Sapphire" }
    const healthJson = await healthRes.json(); // { success:true, result: "Emerald" }
    const lifeJson = await lifeRes.json();   // { success:true, result: ["Ruby", "Pearl"] }

    const out: string[] = [];
    if (luckJson?.result) out.push(luckJson.result);
    if (healthJson?.result) out.push(healthJson.result);
    if (Array.isArray(lifeJson?.result)) out.push(...lifeJson.result);

    // Narrow to StoneKey by filtering
    const filtered = out.filter((s): s is StoneKey => s in GEM_DATA) as StoneKey[];
    // De-duplicate and take max 4
    return Array.from(new Set(filtered)).slice(0, 4);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const result = await calculateViaBackend();
      setStones(result);
    } catch (err) {
      console.error(err);
      // Optional: surface a toast or inline error
    } finally {
      setLoading(false);
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
        <form id="lifeCalculator_form" onSubmit={onSubmit}>
          <div className="lifeCalculator_formGroup">
            <label htmlFor="lifeCalculator_dob">Date of Birth</label>
            <input
              id="lifeCalculator_dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              aria-invalid={!!errors.dob}
            />
            {errors.dob && (
              <span className="lifeCalculator_error">{errors.dob}</span>
            )}
          </div>

          <div className="lifeCalculator_formGroup">
            <label htmlFor="lifeCalculator_tob">Time of Birth</label>
            <input
              id="lifeCalculator_tob"
              type="time"
              value={tob}
              onChange={(e) => setTob(e.target.value)}
              aria-invalid={!!errors.tob}
            />
            {errors.tob && (
              <span className="lifeCalculator_error">{errors.tob}</span>
            )}
          </div>

          <div className="lifeCalculator_formGroup">
            <label htmlFor="lifeCalculator_pob">Place of Birth</label>
            <input
              id="lifeCalculator_pob"
              type="text"
              placeholder="e.g., New Delhi, India"
              value={pob}
              onChange={(e) => setPob(e.target.value)}
              aria-invalid={!!errors.pob}
            />
            {errors.pob && (
              <span className="lifeCalculator_error">{errors.pob}</span>
            )}
          </div>

          <button
            className={`lifeCalculator_btn ${loading ? "lifeCalculator_btnLoading" : ""}`}
            type="submit"
            disabled={!valid || loading}
          >
            {loading ? (
              <>
                Calculating...
                <span className="lifeCalculator_spinner" />
              </>
            ) : (
              "Find My Luck Stones"
            )}
          </button>
        </form>
      </section>

      {stones && stones.length > 0 && (
        <section className="lifeCalculator_results">
          <h2 className="lifeCalculator_resultsTitle">Your Personal Luck Stones</h2>
          <div className="lifeCalculator_grid">
            {stones.map((s) => {
              const info = GEM_DATA[s];
              if (!info) return null;
              return (
                <article key={s} className="lifeCalculator_card">
                  <img
                    src={info.image}
                    alt={s}
                    className="lifeCalculator_image"
                    loading="lazy"
                  />
                  <div className="lifeCalculator_cat">{info.category}</div>
                  <div className="lifeCalculator_name">{s}</div>
                  <div className="lifeCalculator_benefit">{info.benefit}</div>
                  <a className="lifeCalculator_explore" href={info.productUrl}>
                    Explore This Stone
                  </a>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};


export default LifeCalPage
