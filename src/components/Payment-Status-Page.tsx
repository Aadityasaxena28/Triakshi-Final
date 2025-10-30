import { getBill } from '@/API/OrderAndBill';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Download, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentStatusPage = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);
  const { id } = useParams();

  // Fetch bill data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getOrderBill", id],
    queryFn: () => getBill(id as string),
    enabled: !!id, // Only run query if id exists
  });

  // Use data from API, not hardcoded orderData
  const orderData = data;
  const isSuccess = orderData?.status === "paid";

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 4000);

    const progressInterval = setInterval(() => {
      setAnimationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  // Calculate totals
  const calculateItemTotal = (item: any) => {
    const discountedPrice = item.unitPrice - (item.unitPrice * item.discount / 100);
    return discountedPrice * item.qty;
  };

  // Show loading state
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

  // Show error state
  if (isError || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Bill</h2>
          <p className="text-gray-600">
            Unable to fetch bill details. Please check the bill ID and try again.
          </p>
        </div>
      </div>
    );
  }

  // Calculate totals only after data is loaded
  const subtotal = orderData.items.reduce((sum: number, item: any) => sum + (item.unitPrice * item.qty), 0);
  const totalDiscount = orderData.items.reduce((sum: number, item: any) => sum + (item.unitPrice * item.qty * item.discount / 100), 0);
  const finalTotal = subtotal - totalDiscount;

  // Download bill as PDF
  const downloadBill = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${orderData.billId}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #6366f1; padding-bottom: 20px; }
          .company-name { font-size: 32px; font-weight: bold; color: #6366f1; margin-bottom: 5px; }
          .invoice-title { font-size: 24px; color: #666; margin-top: 10px; }
          .info-section { display: flex; justify-content: space-between; margin: 30px 0; }
          .info-block { flex: 1; }
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
          <p style="margin-top: 10px; color: #666;">Bill ID: ${orderData.billId}</p>
          <p style="color: #666;">Date: ${new Date(orderData.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div class="info-section">
          <div class="info-block">
            <h3>Bill To:</h3>
            <p><strong>${orderData.userDetails.contact.name}</strong></p>
            <p>${orderData.userDetails.address.addressLine1}</p>
            ${orderData.userDetails.address.addressLine2 ? `<p>${orderData.userDetails.address.addressLine2}</p>` : ''}
            <p>${orderData.userDetails.address.city}, ${orderData.userDetails.address.state}</p>
            <p>PIN: ${orderData.userDetails.address.pincode}</p>
            <p style="margin-top: 10px;">Email: ${orderData.userDetails.contact.email}</p>
            <p>Mobile: ${orderData.userDetails.contact.mobileNumber}</p>
          </div>
          <div class="info-block" style="text-align: right;">
            <h3>Payment Status:</h3>
            <span class="status-badge ${isSuccess ? 'status-success' : 'status-failed'}">
              ${isSuccess ? 'PAID' : 'PAYMENT FAILED'}
            </span>
            ${orderData.transaction ? `<p style="margin-top: 15px;"><strong>Transaction ID:</strong><br/>${orderData.transaction}</p>` : ''}
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
            ${orderData.items.map((item: any) => `
              <tr>
                <td>${item.name}</td>
                <td style="text-align: center;">${item.qty}</td>
                <td style="text-align: right;">₹${item.unitPrice.toLocaleString('en-IN')}</td>
                <td style="text-align: right;">${item.discount}%</td>
                <td style="text-align: right;">₹${calculateItemTotal(item).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>₹${subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div class="total-row">
            <span>Total Discount:</span>
            <span style="color: #16a34a;">-₹${totalDiscount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
          <div class="total-row final">
            <span>Grand Total:</span>
            <span>₹${finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
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
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      {/* Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
          <div className="text-center">
            {/* Animated Circle with Icon */}
            <div className="relative inline-block">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isSuccess ? "#dcfce7" : "#fee2e2"}
                  strokeWidth="2"
                />
                {/* Animated Progress Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isSuccess ? "#22c55e" : "#ef4444"}
                  strokeWidth="4"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * animationProgress) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dashoffset 0.1s ease' }}
                />
              </svg>
              
              {/* Icon Animation */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: animationProgress > 50 ? (animationProgress - 50) / 50 : 0,
                  transform: `scale(${animationProgress > 50 ? 0.5 + ((animationProgress - 50) / 100) : 0.5})`
                }}
              >
                {isSuccess ? (
                  <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={2.5} />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500" strokeWidth={2.5} />
                )}
              </div>
            </div>

            {/* Status Message */}
            <div 
              className="mt-6"
              style={{
                opacity: animationProgress > 70 ? 1 : 0,
                transform: `translateY(${animationProgress > 70 ? 0 : 20}px)`,
                transition: 'all 0.3s ease'
              }}
            >
              <h2 className={`text-3xl font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {isSuccess ? 'Payment Successful!' : 'Payment Failed!'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isSuccess ? 'Your order has been confirmed' : 'Please try again or contact support'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bill Section */}
      <div className="max-w-4xl mx-auto">
        {/* Header with Status */}
        <div className={`rounded-2xl shadow-lg p-8 mb-6 ${isSuccess ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200'}`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Triakshi Gems</h1>
              <p className="text-gray-600">Invoice #{orderData.billId}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
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
                {new Date(orderData.created_at).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Customer & Transaction Info */}
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
              <p className="text-gray-600">
                <span className="font-medium">Mobile:</span> {orderData.userDetails.contact.mobileNumber}
              </p>
            </div>
            <div className="text-left md:text-right">
              <h3 className="text-sm font-semibold text-indigo-600 uppercase mb-3">Transaction Details</h3>
              <p className="text-gray-600">
                <span className="font-medium">User ID:</span> {orderData.userId}
              </p>
              {orderData.transaction && (
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Transaction ID:</span><br/>
                  <span className="text-sm">{orderData.transaction}</span>
                </p>
              )}
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Source:</span> {orderData.meta.source}
              </p>
            </div>
          </div>

          {/* Items Table */}
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
                  {orderData.items.map((item: any, index: number) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-800">{item.name}</div>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-600">{item.qty}</td>
                      <td className="py-4 px-4 text-right text-gray-600">
                        ₹{item.unitPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4 text-right text-green-600 font-medium">
                        {item.discount}%
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-800">
                        ₹{calculateItemTotal(item).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full md:w-96 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Total Discount:</span>
                <span className="font-semibold">-₹{totalDiscount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-xl font-bold text-gray-800">
                <span>Grand Total:</span>
                <span className="text-indigo-600">₹{finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200 text-center">
            <button
              onClick={downloadBill}
              className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Invoice
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Thank you for shopping with Triakshi Gems!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;