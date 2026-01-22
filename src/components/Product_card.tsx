import type { Product } from "@/DataTypes/product";
import { Eye, Star } from "lucide-react";
import React from "react";

type Props = {
  product: Product;
  handleViewDetails: (id: string) => void;
  category?: "gemstones" | "rudraksha" | string;
};

const THEME: Record<
  string,
  {
    // image band
    bandFrom: string;
    bandTo: string;
    overlayFrom: string;
    overlayTo: string;
    // id pill
    idPill: string;
    // category pill
    catPillBg: string;
    catPillText?: string; // optional override
    // price badge
    offBadge: string;
    // CTA button
    btnFrom: string;
    btnTo: string;
    btnHoverFrom: string;
    btnHoverTo: string;
  }
> = {
  gemstones: {
    bandFrom: "from-yellow-50",
    bandTo: "to-yellow-100",
    overlayFrom: "from-yellow-400/20",
    overlayTo: "to-yellow-600/20",
    idPill: "bg-yellow-100 text-yellow-800",
    catPillBg: "bg-gray-100 text-gray-700",
    offBadge: "bg-red-500 text-white",
    btnFrom: "from-yellow-400",
    btnTo: "to-yellow-500",
    btnHoverFrom: "hover:from-yellow-500",
    btnHoverTo: "hover:to-yellow-600",
  },

  rudraksha: {
    bandFrom: "from-amber-50",
    bandTo: "to-amber-100",
    overlayFrom: "from-amber-500/20",
    overlayTo: "to-orange-700/20",
    idPill: "bg-amber-100 text-amber-800",
    catPillBg: "bg-amber-50 text-amber-800",
    offBadge: "bg-red-600 text-white",
    btnFrom: "from-amber-600",
    btnTo: "to-orange-600",
    btnHoverFrom: "hover:from-amber-700",
    btnHoverTo: "hover:to-orange-700",
  },

  mala: {
    bandFrom: "from-amber-50",
    bandTo: "to-amber-100",
    overlayFrom: "from-amber-500/20",
    overlayTo: "to-orange-700/20",
    idPill: "bg-amber-100 text-amber-800",
    catPillBg: "bg-amber-50 text-amber-800",
    offBadge: "bg-red-600 text-white",
    btnFrom: "from-amber-600",
    btnTo: "to-orange-600",
    btnHoverFrom: "hover:from-amber-700",
    btnHoverTo: "hover:to-orange-700",
  },

  bracelet: {
    bandFrom: "from-amber-50",
    bandTo: "to-amber-100",
    overlayFrom: "from-amber-500/20",
    overlayTo: "to-orange-700/20",
    idPill: "bg-amber-100 text-amber-800",
    catPillBg: "bg-amber-50 text-amber-800",
    offBadge: "bg-red-600 text-white",
    btnFrom: "from-amber-600",
    btnTo: "to-orange-600",
    btnHoverFrom: "hover:from-amber-700",
    btnHoverTo: "hover:to-orange-700",
  },
  tribhuvani: {
    // image band (soft bg to match the page header vibe)
    bandFrom: "from-purple-50",
    bandTo: "to-indigo-100",
    overlayFrom: "from-purple-500/20",
    overlayTo: "to-indigo-700/20",

    // id pill (light chip, dark text)
    idPill: "bg-purple-100 text-purple-800",

    // category pill (kept light; no override text needed)
    catPillBg: "bg-purple-50 text-purple-800",

    // price/offer badge (on-brand pop instead of generic red)
    offBadge: "bg-purple-600 text-white",

    // CTA button (matches page header gradient + hover)
    btnFrom: "from-purple-600",
    btnTo: "to-indigo-600",
    btnHoverFrom: "hover:from-purple-700",
    btnHoverTo: "hover:to-indigo-700",
  },
};

import { Diamond } from 'lucide-react';

const Product_card: React.FC<Props> = ({
  product,
  handleViewDetails,
  category = "gemstones",
}) => {
  const theme = THEME[category] ?? THEME.gemstones;

  // FIX: your previous discount calc was always 0%.
  // Assuming `product.discount` is a percentage.
  const discountPct = Math.max(0, Math.min(100, product.discount ?? 0));
  const discountedPrice = Math.round(
    product.price * (1 - 0.01 * discountPct)
  );
  // console.log("Discounted Price:", product);
// console.log(category);
  const baseUrl = import.meta.env.VITE_api_url || "http://localhost:5000";
  let imageSrc = ""
  if (product.images && product.images[0]){
      product.image = product.images[0];
     imageSrc = `${product.image}`;
    //  console.log("Image inside",product.images[0])
  }
  else if(product.image){
    imageSrc = `${product.image}`;
  }

  // Get rating from product, default to 5 if not available
  const rating = product.rating ?? 5;
  // const maxRating = 5;

  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
      style={{ width: '280px', minHeight: '500px' }}
    >
      {/* Image Section - Perfect Square 280x280 */}
      <div
        className={[
          "relative overflow-hidden cursor-pointer bg-gradient-to-br flex items-center justify-center",
          theme.bandFrom,
          theme.bandTo,
        ].join(" ")}
        style={{ width: '280px', height: '280px', flexShrink: 0 }}
        onClick={() => handleViewDetails(product.id)}
      >
        <div
          className={[
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            theme.overlayFrom,
            theme.overlayTo,
          ].join(" ")}
        />

        {product.image ? (
          <img 
            src={imageSrc} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
          />
        ) : (
          <Star className="w-24 h-24 text-black/10" />
        )}

        {discountPct > 0 && (
          <div
            className={[
              "absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold z-10",
              theme.offBadge,
            ].join(" ")}
          >
            {discountPct}% OFF
          </div>
        )}
      </div>

      {/* Content Section - Flexible Height */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name - Max 2 Lines */}
        <h3 
          className="text-base font-bold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors mb-2 line-clamp-2"
          style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          onClick={() => handleViewDetails(product.id)}
        >
          {product.name}
        </h3>

        {/* Rating Display */}
        <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-yellow-50 px-2.5 py-1 rounded-full border border-amber-200 self-start mb-3">
          <Diamond className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-amber-700">
            {Number(rating.toFixed(1))}
          </span>
        </div>

        {/* Quantity and Weight */}
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700">Quantity:</span>
            <span className="text-xs text-gray-600">{product.quantity}</span>
          </div>
          {product.weight && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700">Weight:</span>
              <span className="text-xs text-gray-600">{product.weight}ct</span>
            </div>
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Price Section */}
        <div className="flex flex-col gap-1 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ₹{discountedPrice.toLocaleString()}
          </span>
          {discountPct > 0 && product.price > discountedPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* CTA Button - Always at Bottom */}
        <button
          className={[
            "w-full text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r",
            theme.btnFrom,
            theme.btnTo,
            theme.btnHoverFrom,
            theme.btnHoverTo,
          ].join(" ")}
          onClick={() => handleViewDetails(product.id)}
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">View Details</span>
        </button>
      </div>
    </div>
  );
};

export default Product_card;