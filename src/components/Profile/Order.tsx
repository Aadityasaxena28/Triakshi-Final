import { getOrderByUser } from "@/API/OrderAndBill";
import { IAddress, IBill, ITransaction } from "@/DataTypes/Order";
import { useEffect, useMemo, useState } from "react";
import "./Order.css";



// Frontend display types
type OrderStatus = "delivered" | "dispatched" | "pending"|"yet to be dispatched";

interface DisplayOrder {
  id: string;
  type: "cart" | "single";
  status: OrderStatus;
  orderDate: string;
  deliveryDate: string;
  price: number;
  items: Array<{
    name: string;
    description: string;
    image: string;
    qty: number;
  }>;
  address?: IAddress;
  giftWrap?: boolean;
  giftMessage?: string;
}

// Transform backend bill to frontend display order
function transformBillToOrder(bill: IBill): DisplayOrder {
  // Map payment status to delivery status
  const getStatus = (billStatus: string, transaction: ITransaction | null): OrderStatus => {
    if (billStatus === 'delivered') return 'delivered';
    if (billStatus === 'dispatched') return 'dispatched';
    if (billStatus === 'not_paid' ) return 'pending';
    if(billStatus== "yet to be dispatched"||billStatus=="paid") return "yet to be dispatched";
    return 'pending';
  };

  // Calculate delivery date
  const getDeliveryDate = (createdAt: Date | string): string => {
    const orderDate = new Date(createdAt);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 7); // 7 days delivery
    
    return deliveryDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Format order date
  const orderDate = new Date(bill.created_at).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return {
    id: bill._id || bill.transaction?.orderId || 'Unknown',
    type: bill.items.length > 1 ? "cart" : "single",
    status: getStatus(bill.status, bill.transaction),
    orderDate,
    deliveryDate: getDeliveryDate(bill.created_at),
    price: bill.amount,
    items: bill.items.map(item => ({
      name: item.name,
      description: `Qty: ${item.qty} | Price: ₹${item.unitPrice} ${item.discount > 0 ? `| Discount: ${item.discount}%` : ''}`,
      image: item.image,
      qty: item.qty
    })),
    address: bill.userDetails.address,
    giftWrap: bill.meta.giftWrap,
    giftMessage: bill.meta.giftMessage
  };
}

const statusClassMap: Record<OrderStatus, string> = {
  delivered: "status-delivered",
  dispatched: "status-dispatched",
  pending: "status-pending",
  "yet to be dispatched": "status-pending"

};

const statusTextMap: Record<OrderStatus, string> = {
  delivered: "Delivered",
  dispatched: "Dispatched",
  pending: "Pending",
  "yet to be dispatched": "Yet to be dispatched"
};

const Order = () => {
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get phone number from user context/auth (replace with your auth logic)
        const userPhone = "4578097812"; // Replace with actual user phone
        
        const bills = await getOrderByUser(userPhone);
        const transformedOrders = bills.map(transformBillToOrder);
        
        // Sort by date (newest first)
        transformedOrders.sort((a, b) => 
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        
        setOrders(transformedOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleCart = (orderId: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  };

  const renderedOrders = useMemo(() => {
    return orders.map(order => {
      const isCart = order.type === "cart";
      const itemCount = order.items.length;
      const isExpanded = expanded.has(order.id);
      const statusClass = statusClassMap[order.status];
      const statusText = statusTextMap[order.status];

      return (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <div className="order-id">Order #{order.id}</div>
            <div className={`status-badge ${statusClass}`}>{statusText}</div>
          </div>

          <div className="order-details">
            <div className="detail-item">
              <div className="detail-label">Order Date</div>
              <div className="detail-value">{order.orderDate}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                {order.status === "pending" ? "Expected Delivery" : "Delivery Date"}
              </div>
              <div className="detail-value">{order.deliveryDate}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">{isCart ? "Total Price" : "Price"}</div>
              <div className="detail-value price">₹{order.price.toFixed(2)}</div>
            </div>
            {isCart && (
              <div className="detail-item">
                <div className="detail-label">Items</div>
                <div className="detail-value">{itemCount} items</div>
              </div>
            )}
          </div>

          {isCart && <div className="cart-badge">Cart Order</div>}
          {order.giftWrap && <div className="cart-badge" style={{marginTop: '4px', background: '#e91e63'}}>🎁 Gift Wrapped</div>}

          <div className="item-display">
            <div className="item-info">
              <div className="item-name">{order.items[0]?.name}</div>
              <div className="item-description">{order.items[0]?.description}</div>
            </div>

            {isCart && itemCount > 1 && (
              <button
                className="expand-btn"
                onClick={() => toggleCart(order.id)}
                aria-expanded={isExpanded}
                aria-controls={`cart-items-${order.id}`}
              >
                <span>{isExpanded ? "Hide Items" : "View All Items"}</span>
                <span className={`expand-icon ${isExpanded ? "rotated" : ""}`}>▼</span>
              </button>
            )}
          </div>

          {isCart && itemCount > 1 && (
            <div
              id={`cart-items-${order.id}`}
              className={`cart-items-container ${isExpanded ? "expanded" : ""}`}
            >
              <div className="additional-items">
                {order.items.slice(1).map((item, idx) => (
                  <div className="cart-item" key={`${order.id}-extra-${idx}`}>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-description">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {order.giftMessage && isExpanded && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: '#fff3e0',
              borderRadius: '8px',
              borderLeft: '4px solid #ff9800'
            }}>
              <div style={{fontWeight: 600, marginBottom: '4px'}}>Gift Message:</div>
              <div style={{fontStyle: 'italic', color: '#666'}}>{order.giftMessage}</div>
            </div>
          )}
        </div>
      );
    });
  }, [orders, expanded]);

  if (loading) {
    return (
      <div className="order-container">
        <h1>📦 Order History</h1>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Loading your orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-container">
        <h1>📦 Order History</h1>
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#d32f2f',
          background: '#ffebee',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>Failed to load orders</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-container">
        <h1>📦 Order History</h1>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No orders found. Start shopping to see your orders here!
        </div>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1>📦 Order History</h1>
      <div id="ordersContainer">{renderedOrders}</div>
    </div>
  );
};

export default Order;