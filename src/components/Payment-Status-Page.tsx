
import { getBill } from "@/API/OrderAndBill";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CheckCircle, Download, XCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

// ---------- Types ----------
type BillItem = {
  productId: string;
  name: string;
  qty: number;
  image?: string;
  unitPrice: number;
  discount: number; // %
  type?: string;
};

type UserDetails = {
  contact: {
    name: string;
    email: string;
    receiveUpdates?: boolean;
    mobileNumber?: string;
  };
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
};

type TransactionShape =
  | string
  | {
      mihpayid?: string;
      status?: string;
      hash?: string;
      txnid?: string;
      payu_response?: unknown;
      updated_at?: string;
      id?: string;
      [k: string]: unknown;
    }
  | null
  | undefined;

type Bill = {
  _id: string;
  billId?: string;
  userId: string;
  amount: number;
  items: BillItem[];
  status: "paid" | "not_paid" | "success" | "failure" | "pending" | string;
  transaction: TransactionShape;
  meta: { source?: string; [k: string]: unknown };
  created_at: string;
  userDetails: UserDetails;
};

// ---------- Helpers ----------
const formatINR = (n: number, opts: Intl.NumberFormatOptions = {}) =>
  n.toLocaleString("en-IN", opts);

function getTxnDisplay(txn: TransactionShape): string {
  if (!txn) return "";
  if (typeof txn === "string") return txn;
  const t = txn as Record<string, any>;
  return (
    t.mihpayid ||
    t.txnid ||
    t.id ||
    (typeof t.payu_response === "string" ? t.payu_response : "") ||
    ""
  );
}

function calculateItemTotal(item: BillItem): number {
  const discountedPrice = item.unitPrice - (item.unitPrice * item.discount) / 100;
  return Math.max(0, discountedPrice * item.qty);
}

// ---------- Component ----------
const PaymentStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);

  const { data: orderData, isLoading, isError }: UseQueryResult<Bill, unknown> = useQuery({
    queryKey: ["getOrderBill", id],
    queryFn: async () => await getBill(id as string), // getBill returns Bill
    enabled: !!id,
  });

  // Treat both "paid" (DB) and "success" (gateway) as success for UI
  const isSuccess = orderData?.status === "paid" || orderData?.status === "success";

  const items = useMemo<BillItem[]>(
    () => (Array.isArray(orderData?.items) ? orderData!.items : []),
    [orderData]
  );

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.unitPrice * it.qty, 0),
    [items]
  );
  const totalDiscount = useMemo(
    () => items.reduce((s, it) => s + (it.unitPrice * it.qty * it.discount) / 100, 0),
    [items]
  );
  const finalTotal = Math.max(0, subtotal - totalDiscount);

  const txnDisplay = useMemo(() => getTxnDisplay(orderData?.transaction), [orderData?.transaction]);

  // Animation
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 4000);
    const progressInterval = setInterval(() => {
      setAnimationProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 30);
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  // Print
  const downloadBill = () => {
    if (!orderData) return;
    const w = window.open("", "", "height=800,width=800");
    if (!w) return;

    const printableBillId = orderData.billId ?? orderData._id;
    const billDate = new Date(orderData.created_at).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const itemsRows = items
      .map(
        (item) => `
          <tr>
            <td>${item.name}</td>
            <td style="text-align: center;">${item.qty}</td>
            <td style="text-align: right;">₹${formatINR(item.unitPrice)}</td>
            <td style="text-align: right;">${item.discount}%</td>
            <td style="text-align: right;">₹${formatINR(calculateItemTotal(item), { maximumFractionDigits: 0 })}</td>
          </tr>`
      )
      .join("");

    const txnHtml = txnDisplay
      ? `<p style="margin-top: 15px;"><strong>Transaction ID:</strong><br/>${txnDisplay}</p>`
      : "";

    const addr2 = orderData.userDetails.address.addressLine2?.trim();
    const mobile = orderData.userDetails.contact.mobileNumber ?? "";

    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${printableBillId}</title>
        <meta charset="utf-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #6366f1; padding-bottom: 20px; }
          .company-name { font-size: 32px; font-weight: bold; color: #6366f1; margin-bottom: 5px; }
          .invoice-title { font-size: 24px; color: #666; margin-top: 10px; }
          .info-section { display: flex; justify-content: space-between; margin: 30px 0; gap: 20px; }
          .info-block { flex: 1; min-width: 260px; }
          .info-block h3 { font-size: 14px; color: #6366f1; margin-bottom: 10px; text-transform: uppercase; }
          .info-block p { margin: 5px 0; font-size: 13px; line-height: 1.6; }
          .items-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          .items-table th { background: #6366f1; color: white; padding: 12px; text-align: left; font-size: 13px; }
          .items-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
          .items-table tr:last-child td { border-bottom: 2px solid #6366f1; }
          .totals { margin-left: auto; width: 300px; margin-top: 20px; }
          .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
          .total-row.final { font-size: 18px; font-weight: bold; color: #6366f1; border-top: 2px solid #6366f1; margin-top: 10px; padding-top: 15px; }
          .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 20px; }
          .status-success { background: #dcfce7; color: #166534; }
          .status-failed { background: #fee2e2; color: #991b1b; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">Triakshi Gems</div>
          <div class="invoice-title">INVOICE</div>
          <p style="margin-top: 10px; color: #666;">Bill ID: ${printableBillId}</p>
          <p style="color: #666;">Date: ${billDate}</p>
        </div>

        <div class="info-section">
          <div class="info-block">
            <h3>Bill To:</h3>
            <p><strong>${orderData.userDetails.contact.name}</strong></p>
            <p>${orderData.userDetails.address.addressLine1}</p>
            ${addr2 ? `<p>${addr2}</p>` : ""}
            <p>${orderData.userDetails.address.city}, ${orderData.userDetails.address.state}</p>
            <p>PIN: ${orderData.userDetails.address.pincode}</p>
            <p style="margin-top: 10px;">Email: ${orderData.userDetails.contact.email}</p>
            ${mobile ? `<p>Mobile: ${mobile}</p>` : ""}
          </div>
          <div class="info-block" style="text-align: right;">
            <h3>Payment Status:</h3>
            <span class="status-badge ${isSuccess ? "status-success" : "status-failed"}">
              ${isSuccess ? "PAID" : "PAYMENT FAILED"}
            </span>
            ${txnHtml}
            <p style="margin-top: 10px;"><strong>Source:</strong> ${orderData.meta?.source ?? "-"}</p>
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Discount</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>₹${formatINR(subtotal)}</span>
          </div>
          <div class="total-row">
            <span>Total Discount:</span>
            <span style="color: #16a34a;">-₹${formatINR(totalDiscount, { maximumFractionDigits: 0 })}</span>
          </div>
          <div class="total-row final">
            <span>Grand Total:</span>
            <span>₹${formatINR(finalTotal, { maximumFractionDigits: 0 })}</span>
          </div>
        </div>

        <div class="footer">
          <p><strong>Triakshi Gems</strong></p>
          <p style="margin-top: 5px;">Thank you for your purchase!</p>
          <p style="margin-top: 5px;">For any queries, please contact us at support@triakshigems.com</p>
        </div>
      </body>
      </html>
    `);

    w.document.close();
    setTimeout(() => w.print(), 250);
  };

  // ---------- States ----------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading bill details...</p>
        </div>
      </div>
    );
  }

  if (isError || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Bill</h2>
          <p className="text-gray-600">Unable to fetch bill details. Please check the bill ID and try again.</p>
        </div>
      </div>
    );
  }

  const printableBillId = orderData.billId ?? orderData._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      {/* Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
          <div className="text-center">
            <div className="relative inline-block">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke={isSuccess ? "#dcfce7" : "#fee2e2"} strokeWidth="2" />
                <circle
                  cx="50" cy="50" r="45" fill="none"
                  stroke={isSuccess ? "#22c55e" : "#ef4444"} strokeWidth="4"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * animationProgress) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 0.1s ease" }}
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: animationProgress > 50 ? (animationProgress - 50) / 50 : 0,
                  transform: `scale(${animationProgress > 50 ? 0.5 + (animationProgress - 50) / 100 : 0.5})`,
                }}
              >
                {isSuccess ? (
                  <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={2.5} />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500" strokeWidth={2.5} />
                )}
              </div>
            </div>

            <div
              className="mt-6"
              style={{
                opacity: animationProgress > 70 ? 1 : 0,
                transform: `translateY(${animationProgress > 70 ? 0 : 20}px)`,
                transition: "all 0.3s ease",
              }}
            >
              <h2 className={`text-3xl font-bold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                {isSuccess ? "Payment Successful!" : "Payment Failed!"}
              </h2>
              <p className="text-gray-600 mt-2">
                {isSuccess ? "Your order has been confirmed" : "Please try again or contact support"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bill Section */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`rounded-2xl shadow-lg p-8 mb-6 ${
            isSuccess
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
              : "bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200"
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Triakshi Gems</h1>
              <p className="text-gray-600">Invoice #{printableBillId}</p>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${
                  isSuccess ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    PAID
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 mr-2" />
                    UNPAID
                  </>
                )}
              </span>
              <p className="text-sm text-gray-600 mt-2">
                {new Date(orderData.created_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b-2 border-gray-200">
            <div>
              <h3 className="text-sm font-semibold text-indigo-600 uppercase mb-3">Bill To</h3>
              <p className="font-bold text-gray-800 text-lg">{orderData.userDetails.contact.name}</p>
              <p className="text-gray-600 mt-2">{orderData.userDetails.address.addressLine1}</p>
              {orderData.userDetails.address.addressLine2 && (
                <p className="text-gray-600">{orderData.userDetails.address.addressLine2}</p>
              )}
              <p className="text-gray-600">
                {orderData.userDetails.address.city}, {orderData.userDetails.address.state}
              </p>
              <p className="text-gray-600">PIN: {orderData.userDetails.address.pincode}</p>
              <p className="text-gray-600 mt-3">
                <span className="font-medium">Email:</span> {orderData.userDetails.contact.email}
              </p>
              {orderData.userDetails.contact.mobileNumber && (
                <p className="text-gray-600">
                  <span className="font-medium">Mobile:</span> {orderData.userDetails.contact.mobileNumber}
                </p>
              )}
            </div>
            <div className="text-left md:text-right">
              <h3 className="text-sm font-semibold text-indigo-600 uppercase mb-3">Transaction Details</h3>
              <p className="text-gray-600">
                <span className="font-medium">Bill ID:</span> {printableBillId}
              </p>
              {txnDisplay && (
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Transaction ID:</span>
                  <br />
                  <span className="text-sm break-all">{txnDisplay}</span>
                </p>
              )}
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Source:</span> {orderData.meta?.source ?? "-"}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-indigo-600 uppercase mb-4">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-indigo-50 border-b-2 border-indigo-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Qty</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Unit Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Discount</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={`${item.productId}-${index}`} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-800">{item.name}</div>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-600">{item.qty}</td>
                      <td className="py-4 px-4 text-right text-gray-600">₹{formatINR(item.unitPrice)}</td>
                      <td className="py-4 px-4 text-right text-green-600 font-medium">{item.discount}%</td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-800">
                        ₹{formatINR(calculateItemTotal(item), { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No items.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full md:w-96 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Total Discount:</span>
                <span className="font-semibold">
                  -₹{formatINR(totalDiscount, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-xl font-bold text-gray-800">
                <span>Grand Total:</span>
                <span className="text-indigo-600">₹{formatINR(finalTotal, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* Download */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200 text-center">
            <button
              onClick={downloadBill}
              className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Invoice
            </button>
            <p className="text-sm text-gray-500 mt-4">Thank you for shopping with Triakshi Gems!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;

