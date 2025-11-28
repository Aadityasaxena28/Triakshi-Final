import axios from "axios";

// ========= API info =========
const api = 'planets';
const userId = import.meta.env.VITE_planets_userId;
const apiKey = import.meta.env.VITE_planets_key;
const language = import.meta.env.VITE_planets_lang;

export type CalculatorParams = {
  type: "luck" | "health" | "life";
  dob: string;
  tob: string;
  place: string;
};

// ========= Helpers & Mappings =========

// Zodiac order used to move from Ascendant sign to other house signs
const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Sign → traditional lord (Vedic)
const SIGN_LORD = {
  Aries: 'Mars',
  Taurus: 'Venus',
  Gemini: 'Mercury',
  Cancer: 'Moon',
  Leo: 'Sun',
  Virgo: 'Mercury',
  Libra: 'Venus',
  Scorpio: 'Mars',
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Saturn',
  Pisces: 'Jupiter',
};

// Planet (lord) → primary gemstone
const LORD_TO_STONE = {
  Sun: 'Ruby',
  Moon: 'Pearl',
  Mars: 'Red Coral',
  Mercury: 'Emerald',
  Jupiter: 'Yellow Sapphire',
  Venus: 'Diamond',
  Saturn: 'Blue Sapphire',
  Rahu: 'Hessonite (Gomed)',
  Ketu: "Cat’s Eye (Lehsunia)",
};

// Compute the sign at the Nth house given ascendant sign
function houseSignFromAsc(ascSign, houseNumber) {
  const base = SIGNS.indexOf(ascSign);
  if (base === -1) throw new Error(`Unknown ascendant sign: ${ascSign}`);
  const idx = (base + (houseNumber - 1)) % 12;
  return SIGNS[idx];
}

function stoneForLord(lord) {
  return LORD_TO_STONE[lord] || '—';
}

// Parse date
function parseDate(dob: string) {
  const date = new Date(dob);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
}

// Parse time
function parseTime(tob: string) {
  const [hour, min] = tob.split(':').map(Number);
  return { hour, min };
}

// ========= ⭐ DYNAMIC COORDINATES FUNCTION (Geocoding) ⭐ =========
async function getCoordinates(place: string) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      place
    )}&format=json&limit=1`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Triakshi Astrology App" // required by Nominatim
      }
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("Location not found");
    }

    const result = response.data[0];

    return {
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      tzone: 5.5 // we will calculate timezone next
    };
  } catch (error) {
    console.error("Geocoding failed:", error);
    throw new Error("Unable to get coordinates for this place");
  }
}


export async function Calculator(params: CalculatorParams): Promise<string[]> {
  try {
    console.log(params);

    const { day, month, year } = parseDate(params.dob);
    const { hour, min } = parseTime(params.tob);

    // ⭐ GET REAL LAT, LON, TZONE
    const { lat, lon, tzone } = await getCoordinates(params.place);

    const data1 = {
      day,
      month,
      year,
      hour,
      min,
      lat,
      lon,
      tzone,
    };

    const auth = 'Basic ' + btoa(`${userId}:${apiKey}`);

    const response = await axios.post(
      `https://json.astrologyapi.com/v1/${api}`,
      data1,
      {
        headers: {
          Authorization: auth,
          'Content-Type': 'application/json',
          'Accept-Language': language,
        },
      }
    );

    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error('Unexpected API response: expected an array of planet objects');
    }

    const asc = data.find(p => (p.name || '').toLowerCase() === 'ascendant');
    if (!asc || !asc.sign) throw new Error('Ascendant sign not found in response');

    const ascSign = asc.sign;

    const moon = data.find(p => (p.name || '').toLowerCase() === 'moon');
    if (!moon || !moon.nakshatraLord) throw new Error('Moon or its nakshatra lord not found');

    const moonNakshatraLord = moon.nakshatraLord;

    const sign1 = houseSignFromAsc(ascSign, 1);
    const sign5 = houseSignFromAsc(ascSign, 5);
    const sign9 = houseSignFromAsc(ascSign, 9);

    const lord1 = SIGN_LORD[sign1];
    const lord5 = SIGN_LORD[sign5];
    const lord9 = SIGN_LORD[sign9];

    const result = {
      firstHouse: { sign: sign1, lord: lord1, stone: stoneForLord(lord1) },
      fifthHouse: { sign: sign5, lord: lord5, stone: stoneForLord(lord5) },
      ninthHouse: { sign: sign9, lord: lord9, stone: stoneForLord(lord9) },
      moonNakshatraLord: { lord: moonNakshatraLord, stone: stoneForLord(moonNakshatraLord) },
    };

    const typ = params.type.toLowerCase();

    if (typ === "luck") {
      return [result.ninthHouse.stone];
    } else if (typ === "health") {
      return [result.fifthHouse.stone];
    } else {
      return [result.moonNakshatraLord.stone, result.fifthHouse.stone];
    }

  } catch (error) {
    console.error('Calculator error:', error);
    throw new Error(`Unable To Calculate Your ${params.type} Stone: ${error.message}`);
  }
}
