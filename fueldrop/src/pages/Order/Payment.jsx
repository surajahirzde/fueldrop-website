// fueldrop-website/src/components/AmountForm.jsx
import { useEffect, useState } from "react";
import "./AmountForm.css";

export default function AmountForm({ rentData, mobileNo, typeSet, amountInt, onSuccess, onError }) {
  const [amount] = useState(amountInt || 0);
  const [mobile, setMobile] = useState(mobileNo || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  // ✅ Vegaah Gateway API Call
  const initiatePayment = async () => {
    if (!amount || amount < 10) {
      const errorMsg = "Amount must be at least ₹10";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    if (!mobile || mobile.length !== 10) {
      const errorMsg = "Valid 10-digit mobile number required";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://chagans.com/pg1/checkoutConc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          mobile: mobile,
          rentData: rentData,
          pgType: "fastag",
          apiType: "API",
        }),
      });

      const data = await response.json();
      console.log("Payment API Response:", data);

      if (data.success && data.data) {
        // ✅ CRITICAL FIX: Open payment link in new tab
        const paymentLink = data.data.paymentLink?.linkUrl;
        const transactionId = data.data.transactionId;

        if (paymentLink && transactionId) {
          const fullPaymentUrl = paymentLink + transactionId;
          console.log("Opening payment gateway:", fullPaymentUrl);

          // ✅ Open Vegaah gateway in new tab
          // Mobile detect kar
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

          if (isMobile) {
            // Mobile me same tab me redirect kar
            window.location.href = fullPaymentUrl;
          } else {
            // Desktop me new tab me khol
            window.open(fullPaymentUrl, "_blank");
          }

          setIsRedirecting(true);

          // ✅ Call success callback after opening gateway
          if (onSuccess) {
            onSuccess({
              ...data,
              paymentUrl: fullPaymentUrl
            });
          }
        } else {
          // ✅ Fallback: Agar payment link nahi hai toh form submit karo
          const errorMsg = "Payment link not received from gateway";
          setError(errorMsg);
          if (onError) onError(errorMsg);
        }
      } else {
        const errorMsg = data.message || "Payment initialization failed";
        setError(errorMsg);
        if (onError) onError(errorMsg);
      }
    } catch (err) {
      console.error("Payment Error:", err);

      let errorMsg = err.message || "An error occurred while processing payment";
      setError(errorMsg);
      if (onError) onError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-trigger when props are ready
  useEffect(() => {
    if (amountInt && mobileNo && amountInt >= 10 && amountInt <= 50000) {
      initiatePayment();
    }
  }, [amountInt, mobileNo]);

  return (
    <div className="fuel-payment-container">
      {!isRedirecting ? (
        <div className="fuel-payment-form">
          <div className="fuel-form-group">
            <label className="fuel-form-label">Amount to Pay (₹)</label>
            <input
              type="number"
              value={amount}
              readOnly
              disabled
              className="fuel-input-readonly"
            />
            <small className="fuel-hint">Amount is fixed and cannot be changed</small>
          </div>

          <div className="fuel-form-group">
            <label className="fuel-form-label">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              required
              className="fuel-input"
              disabled={isLoading}
            />
            <small className="fuel-hint">Payment confirmation will be sent here</small>
          </div>

          {error && (
            <div className="fuel-error-message">
              <span>⚠️</span>
              <div style={{ flex: 1 }}>{error}</div>
              <button
                onClick={initiatePayment}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Retry
              </button>
            </div>
          )}

          <button
            className="fuel-pay-button"
            onClick={initiatePayment}
            disabled={isLoading || !amount || mobile.length !== 10}
          >
            {isLoading ? (
              <>
                <span className="fuel-spinner-small"></span>
                Processing...
              </>
            ) : (
              <>💳 Pay ₹{amount.toLocaleString('en-IN')}</>
            )}
          </button>

          <div className="fuel-secure-badge">
            <span>🔒</span> Secure payment via Vegaah Gateway
          </div>
        </div>
      ) : (
        <div className="fuel-redirect-container">
          <div className="fuel-spinner"></div>
          <p className="fuel-redirect-text">Payment gateway opened in new tab!</p>
          <p className="fuel-redirect-note">Please complete payment in the new window.</p>
          <button
            onClick={() => {
              setIsRedirecting(false);
              setError("");
            }}
            style={{
              marginTop: '20px',
              padding: '8px 16px',
              background: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}