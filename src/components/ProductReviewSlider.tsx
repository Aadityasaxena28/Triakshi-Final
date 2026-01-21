import { Review } from "@/DataTypes/Review";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import React from "react";


interface ProductReviewsSliderProps {
  reviews: Review[];
  category?: "gemstone" | "rudraksha" | "mala" | "bracelet" | "tribhuvani" | "yantra" | string;
}

const THEME: Record<
  string,
  {
    bgGradient: string;
    borderColor: string;
    starActive: string;
    starInactive: string;
    headerText: string;
    dotActive: string;
    dotIdle: string;
    buttonBg: string;
    buttonHover: string;
    verifiedBadge: string;
  }
> = {
  gemstone: {
    bgGradient: "from-yellow-50 to-white",
    borderColor: "border-yellow-100",
    starActive: "text-yellow-500",
    starInactive: "text-gray-300",
    headerText: "text-yellow-600",
    dotActive: "bg-yellow-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
    buttonBg: "bg-white/90",
    buttonHover: "hover:bg-white",
    verifiedBadge: "bg-yellow-100 text-yellow-700",
  },
  rudraksha: {
    bgGradient: "from-orange-50 to-white",
    borderColor: "border-orange-100",
    starActive: "text-orange-500",
    starInactive: "text-gray-300",
    headerText: "text-orange-600",
    dotActive: "bg-orange-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
    buttonBg: "bg-white/90",
    buttonHover: "hover:bg-white",
    verifiedBadge: "bg-orange-100 text-orange-700",
  },
  mala: {
    bgGradient: "from-orange-50 to-white",
    borderColor: "border-orange-100",
    starActive: "text-orange-500",
    starInactive: "text-gray-300",
    headerText: "text-orange-600",
    dotActive: "bg-orange-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
    buttonBg: "bg-white/90",
    buttonHover: "hover:bg-white",
    verifiedBadge: "bg-orange-100 text-orange-700",
  },
  bracelet: {
    bgGradient: "from-orange-50 to-white",
    borderColor: "border-orange-100",
    starActive: "text-orange-500",
    starInactive: "text-gray-300",
    headerText: "text-orange-600",
    dotActive: "bg-orange-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
    buttonBg: "bg-white/90",
    buttonHover: "hover:bg-white",
    verifiedBadge: "bg-orange-100 text-orange-700",
  },
  tribhuvani: {
    bgGradient: "from-purple-50 to-white",
    borderColor: "border-purple-100",
    starActive: "text-purple-500",
    starInactive: "text-gray-300",
    headerText: "text-purple-600",
    dotActive: "bg-purple-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
    buttonBg: "bg-white/90",
    buttonHover: "hover:bg-white",
    verifiedBadge: "bg-purple-100 text-purple-700",
  },
  yantra: {
    bgGradient: "from-amber-50 to-white",
    borderColor: "border-amber-100",
    starActive: "text-amber-500",
    starInactive: "text-gray-300",
    headerText: "text-amber-600",
    dotActive: "bg-amber-500",
    dotIdle: "bg-gray-300 hover:bg-gray-400",
    buttonBg: "bg-white/90",
    buttonHover: "hover:bg-white",
    verifiedBadge: "bg-amber-100 text-amber-700",
  },
};

export const ProductReviewSlider: React.FC<ProductReviewsSliderProps> = ({
  reviews,
  category = "gemstone",
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const theme = THEME[category] ?? THEME.gemstone;

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? `${theme.starActive} fill-current`
            : theme.starInactive
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`bg-gradient-to-br ${theme.bgGradient} rounded-3xl shadow-xl p-4 sm:p-6 border-2 ${theme.borderColor}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          Customer Reviews
        </h3>
        <div className="flex items-center gap-2">
          <Star className={`w-6 h-6 ${theme.starActive} fill-current`} />
          <span className={`text-lg font-bold ${theme.headerText}`}>
            {(
              reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            ).toFixed(1)}
          </span>
          <span className="text-gray-500 text-sm">
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

      {/* Review Carousel */}
      <div className="relative">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md min-h-[200px] sm:min-h-[240px]">
          {/* Navigation Buttons */}
          {reviews.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevReview}
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 ${theme.buttonBg} ${theme.buttonHover} p-2 sm:p-3 rounded-full shadow-lg transition-all z-10`}
              >
                <ChevronLeft className="w-2 h-4 sm:w-5 sm:h-5 text-gray-800" />
              </button>

              <button
                type="button"
                onClick={nextReview}
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 ${theme.buttonBg} ${theme.buttonHover} p-2 sm:p-3 rounded-full shadow-lg transition-all z-10`}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
              </button>
            </>
          )}

          {/* Review Content */}
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                    {currentReview.customer_name}
                  </h4>
                  {currentReview.verified && (
                    <span
                      className={`${theme.verifiedBadge} text-xs px-2 py-1 rounded-full font-medium`}
                    >
                      Verified Purchase
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm">
                  {formatDate(currentReview.date)}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1">{renderStars(currentReview.rating)}</div>

            {/* Comment */}
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base ">
              "{currentReview.comment}"
            </p>
          </div>
        </div>

        {/* Dots Indicator */}
        {reviews.length > 1 && (
          <div className="flex gap-2 justify-center mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? `${theme.dotActive} w-6`
                    : `${theme.dotIdle} w-2`
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};