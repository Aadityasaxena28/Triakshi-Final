import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

const LuckyStoneCalculator = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: ""
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 🔼 SCROLL TO TOP WHEN ROUTE LOADS
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateLuckyStone = () => {
    setLoading(true);

    setTimeout(() => {
      const luckyStones = [
        {
          name: "Citrine",
          reason: "Attracts abundance and prosperity",
          price: 850,
          benefits: ["Wealth", "Success", "Confidence"]
        },
        {
          name: "Green Aventurine",
          reason: "Brings luck and opportunity",
          price: 650,
          benefits: ["Luck", "Growth", "Healing"]
        },
        {
          name: "Pyrite",
          reason: "Shields from negative energy",
          price: 750,
          benefits: ["Protection", "Willpower", "Action"]
        },
        {
          name: "Tiger Eye",
          reason: "Enhances personal power",
          price: 900,
          benefits: ["Courage", "Focus", "Grounding"]
        },
        {
          name: "Carnelian",
          reason: "Boosts motivation and creativity",
          price: 600,
          benefits: ["Creativity", "Motivation", "Vitality"]
        }
      ];

      const randomStone =
        luckyStones[Math.floor(Math.random() * luckyStones.length)];

      setResult({
        luckyStone: randomStone,
        luckScore: Math.floor(Math.random() * 15) + 85,
        zodiacCompatibility: "Highly Compatible",
        recommendation: `${randomStone.name} is your personal lucky stone that will enhance your natural abilities and attract positive energy.`
      });

      setLoading(false);
    }, 2000);
  };

  const isFormValid =
    formData.name &&
    formData.dateOfBirth &&
    formData.timeOfBirth &&
    formData.placeOfBirth;

  return (
    <section className="py-20 bg-gradient-to-br from-gold/5 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
            <Star className="h-5 w-5 text-gold" />
            <span className="text-gold font-semibold">
              Lucky Stone Calculator
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Discover Your Lucky Stone
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the stone that will bring luck, prosperity, and positive energy
            into your life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-gold" />
                <span>Enter Your Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeOfBirth">Time of Birth</Label>
                <Input
                  id="timeOfBirth"
                  name="timeOfBirth"
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={handleInputChange}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeOfBirth">Place of Birth</Label>
                <Input
                  id="placeOfBirth"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  placeholder="City, State, Country"
                  className="rounded-xl"
                />
              </div>

              <Button
                onClick={calculateLuckyStone}
                disabled={!isFormValid || loading}
                className="w-full btn-hero"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Find My Lucky Stone</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-gold" />
                <span>Your Lucky Stone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gold mb-2">
                      {result.luckyStone.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {result.luckyStone.reason}
                    </p>
                    <div className="text-3xl font-bold text-gold">
                      ₹{result.luckyStone.price}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl text-center">
                        <div className="text-2xl font-bold text-primary">
                          {result.luckScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Luck Score
                        </div>
                      </div>
                      <div className="p-4 bg-gold/10 rounded-xl text-center">
                        <div className="text-sm font-bold text-gold">
                          {result.zodiacCompatibility}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Compatibility
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gold/5 rounded-xl">
                      <h4 className="font-semibold mb-3">Key Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.luckyStone.benefits.map(
                          (benefit: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full"
                            >
                              {benefit}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-xl">
                      <h4 className="font-semibold mb-2">Recommendation</h4>
                      <p className="text-muted-foreground">
                        {result.recommendation}
                      </p>
                    </div>
                  </div>

                  <Button className="w-full btn-hero">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Shop {result.luckyStone.name}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fill in your details to discover your lucky stone
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LuckyStoneCalculator;
