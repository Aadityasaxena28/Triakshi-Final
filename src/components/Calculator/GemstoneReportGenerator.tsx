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

  const generatePDF = () => {
    if (!reportData) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const healthDesc = [
      "Strengthen physical well-being and immunity",
      "Support healing, recovery, and long-term wellness",
      "Improve energy levels and reduce fatigue",
      "Enhance emotional resilience and stress tolerance",
      "Stabilize hormonal and metabolic balance",
      "Promote a healthier mind–body connection"
    ];

    const lifeDesc = [
      "Enhance overall vitality and inner strength",
      "Bring emotional balance and mental clarity",
      "Improve personality, aura, and self-confidence",
      "Support stable decision-making and life direction",
      "Increase natural charisma and personal magnetism",
      "Align identity with inner purpose for smoother life progress"
    ];

    const luckDesc = [
      "Bring divine blessings and spiritual protection",
      "Attract fortunate opportunities and positive outcomes",
      "Increase luck in career, travel, and education",
      "Boost manifestation power and life growth",
      "Enhance wisdom, intuition, and life guidance",
      "Align the wearer with higher purpose and destiny"
    ];

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Triakshi Gems - Gemstone Report</title>
        <style>
          @page { margin: 20mm; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Georgia', serif; 
            color: #2c3e50;
            line-height: 1.6;
            padding: 40px;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #8b4513;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            font-size: 36px;
            color: #8b4513;
            margin-bottom: 10px;
            letter-spacing: 2px;
          }
          .header .tagline {
            font-size: 16px;
            color: #666;
            font-style: italic;
          }
          .user-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #8b4513;
          }
          .user-details h3 {
            color: #8b4513;
            margin-bottom: 15px;
          }
          .detail-row {
            display: flex;
            margin-bottom: 8px;
          }
          .detail-label {
            font-weight: bold;
            width: 150px;
            color: #555;
          }
          .stone-block {
            margin-bottom: 35px;
            page-break-inside: avoid;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 25px;
            background: linear-gradient(to bottom, #ffffff, #fafafa);
          }
          .stone-block h2 {
            color: #8b4513;
            font-size: 24px;
            margin-bottom: 15px;
            border-bottom: 2px solid #d4af37;
            padding-bottom: 10px;
          }
          .stone-info {
            background: white;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 15px;
            border-left: 4px solid #d4af37;
          }
          .stone-name {
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
          }
          .stone-hindi {
            color: #666;
            font-style: italic;
            margin-bottom: 10px;
          }
          .benefits-title {
            font-weight: bold;
            color: #8b4513;
            margin: 15px 0 10px 0;
            font-size: 16px;
          }
          .benefits-list {
            list-style: none;
            padding-left: 0;
          }
          .benefits-list li {
            padding-left: 25px;
            position: relative;
            margin-bottom: 8px;
            color: #555;
          }
          .benefits-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            color: #d4af37;
            font-size: 14px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            padding-top: 20px;
            border-top: 2px solid #8b4513;
            color: #666;
            font-size: 12px;
          }
          @media print {
            body { padding: 20px; }
            .stone-block { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>त्रिakshi Gems ॐ</h1>
          <div class="tagline">Your Personalized Gemstone Report</div>
        </div>

        <div class="user-details">
          <h3>Personal Details</h3>
          <div class="detail-row">
            <span class="detail-label">Date of Birth:</span>
            <span>${new Date(dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Time of Birth:</span>
            <span>${tob}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Place of Birth:</span>
            <span>${pob}</span>
          </div>
        </div>

        ${reportData.healthStone ? `
        <div class="stone-block">
          <h2>Health Stone</h2>
          <div class="stone-info">
            <div class="stone-name">${reportData.healthStone.englishName}</div>
            ${reportData.healthStone.hindiName ? `<div class="stone-hindi">(${reportData.healthStone.hindiName})</div>` : ''}
          </div>
          <div class="benefits-title">Benefits:</div>
          <ul class="benefits-list">
            ${healthDesc.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${reportData.lifeStones.length > 0 ? `
        <div class="stone-block">
          <h2>Life Stones</h2>
          ${reportData.lifeStones.map(stone => `
            <div class="stone-info">
              <div class="stone-name">${stone.englishName}</div>
              ${stone.hindiName ? `<div class="stone-hindi">(${stone.hindiName})</div>` : ''}
            </div>
          `).join('')}
          <div class="benefits-title">Benefits:</div>
          <ul class="benefits-list">
            ${lifeDesc.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${reportData.luckStone ? `
        <div class="stone-block">
          <h2>Luck Stone</h2>
          <div class="stone-info">
            <div class="stone-name">${reportData.luckStone.englishName}</div>
            ${reportData.luckStone.hindiName ? `<div class="stone-hindi">(${reportData.luckStone.hindiName})</div>` : ''}
          </div>
          <div class="benefits-title">Benefits:</div>
          <ul class="benefits-list">
            ${luckDesc.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>© Triakshi Gems - Unlock Your True Potential with Sacred Gemstones</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="lifeCalculator_container">
      <header className="lifeCalculator_header">
        <div className="lifeCalculator_logo">त्रिakshi Gems ॐ</div>
        <div className="lifeCalculator_tagline">
          Generate Your Personalized Gemstone Report
        </div>
      </header>

      <section className="lifeCalculator_inputSection">
        <h2 className="lifeCalculator_sectionTitle">Enter Your Birth Details</h2>

        <div id="lifeCalculator_birthForm">
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
            onClick={handleSubmit}
            className={`lifeCalculator_calculateBtn ${loading ? "lifeCalculator_loading" : ""}`}
            disabled={!valid || loading}
          >
            {loading ? "Generating Report..." : "Generate My Report"}
          </button>
        </div>
      </section>

      {reportData && (
        <section className="reportGenerator_resultsSection lifeCalculator_resultsSection">
          <h2 className="lifeCalculator_resultsTitle">Your Gemstone Report is Ready!</h2>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <button
              onClick={generatePDF}
              className="lifeCalculator_calculateBtn"
              style={{ 
                background: 'linear-gradient(135deg, #8b4513 0%, #d4af37 100%)',
                fontSize: '18px',
                padding: '15px 40px'
              }}
            >
              📄 Download Report (PDF)
            </button>
          </div>

          <div className="lifeCalculator_stonesGrid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {reportData.healthStone && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#8b4513', marginBottom: '15px', fontSize: '24px' }}>Health Stone</h3>
                <article className="lifeCalculator_stoneCard">
                  <img src={reportData.healthStone.image} alt={reportData.healthStone.englishName} className="lifeCalculator_stoneImage" />
                  <div className="lifeCalculator_stoneContent">
                    <h3 className="lifeCalculator_stoneName">{reportData.healthStone.englishName}</h3>
                    {reportData.healthStone.hindiName && (
                      <p className="lifeCalculator_stoneHindiName">({reportData.healthStone.hindiName})</p>
                    )}
                  </div>
                </article>
              </div>
            )}

            {reportData.lifeStones.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#8b4513', marginBottom: '15px', fontSize: '24px' }}>Life Stones</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  {reportData.lifeStones.map((stone, index) => (
                    <article key={index} className="lifeCalculator_stoneCard">
                      <img src={stone.image} alt={stone.englishName} className="lifeCalculator_stoneImage" />
                      <div className="lifeCalculator_stoneContent">
                        <h3 className="lifeCalculator_stoneName">{stone.englishName}</h3>
                        {stone.hindiName && (
                          <p className="lifeCalculator_stoneHindiName">({stone.hindiName})</p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {reportData.luckStone && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#8b4513', marginBottom: '15px', fontSize: '24px' }}>Luck Stone</h3>
                <article className="lifeCalculator_stoneCard">
                  <img src={reportData.luckStone.image} alt={reportData.luckStone.englishName} className="lifeCalculator_stoneImage" />
                  <div className="lifeCalculator_stoneContent">
                    <h3 className="lifeCalculator_stoneName">{reportData.luckStone.englishName}</h3>
                    {reportData.luckStone.hindiName && (
                      <p className="lifeCalculator_stoneHindiName">({reportData.luckStone.hindiName})</p>
                    )}
                  </div>
                </article>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default GemstoneReportGenerator;