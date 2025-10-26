
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
  Scorpio: 'Mars',          // classical/traditional
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Saturn',       // classical/traditional
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

// Compute the sign at the Nth house given ascendant sign (N is 1..12)
function houseSignFromAsc(ascSign, houseNumber) {
  const base = SIGNS.indexOf(ascSign);
  if (base === -1) throw new Error(`Unknown ascendant sign: ${ascSign}`);
  const idx = (base + (houseNumber - 1)) % 12;
  return SIGNS[idx];
}

function stoneForLord(lord) {
  return LORD_TO_STONE[lord] || '—';
}

// Helper function to parse date string (e.g., "2002-09-10" or "10/09/2002")
function parseDate(dob: string) {
  // Implement based on your date format
  const date = new Date(dob);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
}

// Helper function to parse time string (e.g., "07:28" or "7:28 AM")
function parseTime(tob: string) {
  // Implement based on your time format
  const [hour, min] = tob.split(':').map(Number);
  return { hour, min };
}

// Helper function to get coordinates from place name
async function getCoordinates(place: string) {
  // You'll need to implement geocoding
  // Could use Google Geocoding API or similar
  return {
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5
  };
}
export async function Calculator(params: CalculatorParams): Promise<string[]> {
  try {
    console.log(params);
    
    // TODO: Parse the actual input parameters
    // This is still hardcoded - you need to implement parsing
    const {day,month,year} = parseDate(params.dob);
    const {hour,min} = parseTime(params.tob);

    const data1 = {
      day,    // Parse from params.dob (e.g., "2002-09-10")
      month,   // Parse from params.dob
      year, // Parse from params.dob
      hour,    // Parse from params.tob (e.g., "07:28")
      min,    // Parse from params.tob
      lat: 19.132,  // Parse from params.place - you'll need geocoding
      lon: 72.342,  // Parse from params.place - you'll need geocoding
      tzone: 5.5,   // Calculate based on location
    };

    const auth = 'Basic ' +  btoa(`${userId}:${apiKey}`);
    
    // ADD AWAIT HERE - this was the main issue
    const response = await axios.post(`https://json.astrologyapi.com/v1/${api}`, data1, {
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
    });

    const data = response.data; // Get the data from the response

    if (!Array.isArray(data)) {
      throw new Error('Unexpected API response: expected an array of planet objects');
    }
    
    console.log(data);
    
    // ... rest of your logic remains the same ...
    const asc = data.find(p => (p.name || '').toLowerCase() === 'ascendant');
    if (!asc || !asc.sign) {
      throw new Error('Ascendant sign not found in response');
    }
    const ascSign = asc.sign;

    const moon = data.find(p => (p.name || '').toLowerCase() === 'moon');
    if (!moon || !moon.nakshatraLord) {
      throw new Error('Moon or its nakshatra lord not found in response');
    }
    const moonNakshatraLord = moon.nakshatraLord;

    const sign1 = houseSignFromAsc(ascSign, 1);
    const sign5 = houseSignFromAsc(ascSign, 5);
    const sign9 = houseSignFromAsc(ascSign, 9);

    const lord1 = SIGN_LORD[sign1];
    const lord5 = SIGN_LORD[sign5];
    const lord9 = SIGN_LORD[sign9];

    const result = {
      firstHouse: {
        sign: sign1,
        lord: lord1,
        stone: stoneForLord(lord1),
      },
      fifthHouse: {
        sign: sign5,
        lord: lord5,
        stone: stoneForLord(lord5),
      },
      ninthHouse: {
        sign: sign9,
        lord: lord9,
        stone: stoneForLord(lord9),
      },
      moonNakshatraLord: {
        lord: moonNakshatraLord,
        stone: stoneForLord(moonNakshatraLord),
      },
    };

    console.log(result);
    const typ = params.type;

    if (typ.toLowerCase() === "luck") {
      return [result.ninthHouse.stone];
    } 
    else if (typ.toLowerCase() === "health") {
      return [result.fifthHouse.stone];
    }
    else {
      return [result.moonNakshatraLord.stone, result.fifthHouse.stone];
    }
    
  } catch (error) {
    console.error('Calculator error:', error);
    throw new Error(`Unable To Calculate Your ${params.type} Stone: ${error.message}`);
  }
}