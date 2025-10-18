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
console.log(category);
  const baseUrl = import.meta.env.VITE_api_url || "http://localhost:5000";
  let imageSrc = ""
  if (product.images && product.images[0]){
      product.image = product.images[0];
     imageSrc = `${baseUrl}${product.image}`;
     console.log("Image inside",product.images[0])
  }
  else if(product.image){
    imageSrc = `${baseUrl}${product.image}`;
  }

  // Get rating from product, default to 5 if not available
  const rating = product.rating ?? 5;
  // const maxRating = 5;

  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden group">
      <div
        className={[
          "h-48 bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
          theme.bandFrom,
          theme.bandTo,
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            theme.overlayFrom,
            theme.overlayTo,
          ].join(" ")}
        />

        {product.image ? (
          <img src={imageSrc} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <Star className="w-24 h-24 text-black/10" />
        )}

        {discountPct > 0 && (
          <div
            className={[
              "absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold",
              theme.offBadge,
            ].join(" ")}
          >
            {discountPct}% OFF
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          
          {/* Rating Display with Diamond Icon */}
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1.5 rounded-full border border-amber-200">
            <Diamond className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-amber-700">
              {Number(rating.toFixed(1))}
            </span>
            {/* <span className="text-xs text-amber-600">
              /{maxRating}
            </span> */}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-gray-700">Quantity:</span>
          <span className="text-sm text-gray-600">{product.quantity}</span>
        </div>

        {/* {category === "gemstone" && (
          <div className="flex items-center gap-2 mb-3">
            <span
              className={[
                "text-xs px-3 py-1 rounded-full",
                theme.catPillBg,
                theme.catPillText || "",
              ].join(" ")}
            >
              {categoryLabel}
            </span>
          </div>
        )} */}

        <div className="flex items-end gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{discountedPrice.toLocaleString()}
          </span>
          {discountPct > 0 && product.price > discountedPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        <button
          className={[
            "w-full text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group bg-gradient-to-r",
            theme.btnFrom,
            theme.btnTo,
            theme.btnHoverFrom,
            theme.btnHoverTo,
          ].join(" ")}
          onClick={() => handleViewDetails(product.id)}
        >
          <Eye className="w-5 h-5" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default Product_card;