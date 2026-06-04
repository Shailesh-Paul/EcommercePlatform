import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/admin_assets/assets'

const statusConfig = {
  'Order Placed':     { color: '#3b82f6', bg: '#eff6ff', dot: '#3b82f6' },
  'Packing':          { color: '#f59e0b', bg: '#fffbeb', dot: '#f59e0b' },
  'Shipped':          { color: '#8b5cf6', bg: '#f5f3ff', dot: '#8b5cf6' },
  'Out for Delivery': { color: '#ec4899', bg: '#fdf2f8', dot: '#ec4899' },
  'Delivered':        { color: '#10b981', bg: '#ecfdf5', dot: '#10b981' },
}

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || { color: '#6b7280', bg: '#f9fafb', dot: '#6b7280' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: cfg.bg, color: cfg.color,
      padding: '3px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
      border: `1px solid ${cfg.color}30`,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {status}
    </span>
  )
}

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) { toast.error("No token found"); return; }
    try {
      const response = await axios.post(
        backendUrl + '/api/order/list', {},
        { headers: { token } }
      )
      if (response.data.success) setOrders(response.data.orders)
      else toast.error(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {

    // wire up your existing status update handler here

    try{

      const response = await axios.post(backendUrl +'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()

      }
    }catch(error){
      console.log(error);
      
      

    }
  }



  useEffect(() => { fetchAllOrders() }, [token])

  return (
    <div style={{
      padding: 'clamp(16px, 3vw, 28px) clamp(12px, 3vw, 24px)',
      background: '#f8fafc', minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      boxSizing: 'border-box',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ── Header ── */}
      <div style={{
        marginBottom: 20,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, color: '#0f172a', letterSpacing: -0.5 }}>
            Orders
          </h2>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: '#94a3b8' }}>
            {orders.length} total orders
          </p>
        </div>
        <button
          onClick={fetchAllOrders}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8,
            background: '#fff', border: '1px solid #e2e8f0',
            color: '#475569', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flexShrink: 0,
          }}>
          ↻ Refresh
        </button>
      </div>

      {/* ── Desktop column headers ── */}
      <div className="orders-header" style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr 1fr 130px 160px',
        gap: 16, padding: '0 20px 10px',
        fontSize: 11, fontWeight: 600, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: 0.6,
      }}>
        <span />
        <span>Items &amp; Customer</span>
        <span>Delivery Address</span>
        <span>Order Info</span>
        <span>Status</span>
      </div>

      {/* ── Order list ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {orders.map((order, index) => (
          <div
            key={index}
            className="order-card"
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #e8edf2',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              padding: 'clamp(14px, 2vw, 18px) clamp(14px, 2vw, 20px)',
              animation: `fadeUp 0.3s ease both`,
              animationDelay: `${index * 40}ms`,
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'}
          >

            {/* ── DESKTOP layout (≥900px) ── */}
            <div className="order-desktop" style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 1fr 130px 160px',
              gap: 16, alignItems: 'start',
            }}>
              {/* Icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: '#f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <img src={assets.parcel_icon} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
              </div>

              {/* Items + Customer */}
              <div>
                <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: 13, color: '#0f172a' }}>
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {order.items.map((item, i) => (
                    <p key={i} style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
                      {item.name}
                      <span style={{ margin: '0 4px', color: '#cbd5e1' }}>×</span>
                      <span style={{ fontWeight: 600, color: '#374151' }}>{item.quantity}</span>
                      <span style={{ marginLeft: 5, fontSize: 10, color: '#7c8fa8', background: '#f1f5f9', padding: '1px 6px', borderRadius: 4 }}>
                        {item.size}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>{order.address?.street}</p>
                <p style={{ margin: 0 }}>{order.address?.city}, {order.address?.state}</p>
                <p style={{ margin: 0 }}>{order.address?.country} — {order.address?.zipcode}</p>
                <p style={{ margin: '4px 0 0', color: '#0ea5e9', fontWeight: 500 }}>{order.address?.phone}</p>
              </div>

              {/* Order Info */}
              <OrderInfo order={order} />

              {/* Status */}
              <StatusControl order={order} statusHandler={statusHandler} />
            </div>

            {/* ── MOBILE layout (<900px) ── */}
            <div className="order-mobile">
              {/* Top row: icon + name + badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, background: '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <img src={assets.parcel_icon} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {order.address?.firstName} {order.address?.lastName}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#94a3b8' }}>
                    {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Items */}
              <div style={{
                background: '#f8fafc', borderRadius: 8, padding: '8px 12px',
                marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 3,
              }}>
                {order.items.map((item, i) => (
                  <p key={i} style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
                    {item.name}
                    <span style={{ margin: '0 4px', color: '#cbd5e1' }}>×</span>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{item.quantity}</span>
                    <span style={{ marginLeft: 5, fontSize: 10, color: '#7c8fa8', background: '#e2e8f0', padding: '1px 6px', borderRadius: 4 }}>
                      {item.size}
                    </span>
                  </p>
                ))}
              </div>

              {/* Address + Info row */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 140px', fontSize: 12, color: '#64748b', lineHeight: 1.65 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Address</p>
                  <p style={{ margin: 0 }}>{order.address?.street}</p>
                  <p style={{ margin: 0 }}>{order.address?.city}, {order.address?.state}</p>
                  <p style={{ margin: 0 }}>{order.address?.country} — {order.address?.zipcode}</p>
                  <p style={{ margin: '3px 0 0', color: '#0ea5e9', fontWeight: 500 }}>{order.address?.phone}</p>
                </div>
                <div style={{ flex: '1 1 100px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Order Info</p>
                  <OrderInfo order={order} compact />
                </div>
              </div>

              {/* Status dropdown */}
              <StatusControl order={order} statusHandler={statusHandler} fullWidth />
            </div>

          </div>
        ))}

        {orders.length === 0 && (
          <div style={{
            textAlign: 'center', padding: 'clamp(40px, 8vw, 60px) 20px',
            background: '#fff', borderRadius: 14, border: '1px dashed #e2e8f0',
          }}>
            <p style={{ fontSize: 32, margin: '0 0 8px' }}>📦</p>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>No orders found</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Desktop: show grid, hide mobile card */
        .order-desktop { display: grid !important; }
        .order-mobile  { display: none  !important; }
        .orders-header { display: grid  !important; }

        @media (max-width: 900px) {
          .orders-header { display: none !important; }
          .order-desktop { display: none !important; }
          .order-mobile  { display: block !important; }
        }
      `}</style>
    </div>
  )
}

/* ── Shared sub-components ── */

const OrderInfo = ({ order, compact }) => (
  <div style={{ fontSize: 12, lineHeight: compact ? 1.9 : 1.8 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
      <span style={{ color: '#94a3b8' }}>Items</span>
      <span style={{ fontWeight: 600, color: '#374151' }}>{order.items.length}</span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
      <span style={{ color: '#94a3b8' }}>Amount</span>
      <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{order.amount}</span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 2 }}>
      <span style={{ color: '#94a3b8' }}>Payment</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: order.payment ? '#10b981' : '#f59e0b' }}>
        {order.payment ? '✓ Done' : '⏳ Pending'}
      </span>
    </div>
    {!compact && (
      <p style={{ margin: '4px 0 0', fontSize: 11, color: '#cbd5e1' }}>
        {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    )}
  </div>
)

const StatusControl = ({ order, statusHandler, fullWidth }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', width: fullWidth ? '100%' : 'auto' }}>
    <select
      onChange={(e) => statusHandler(e, order._id)}
      defaultValue={order.status}
      style={{
        width: fullWidth ? '100%' : '100%',
        padding: '8px 28px 8px 10px',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
        color: '#374151',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'inherit',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        boxSizing: 'border-box',
      }}
      onFocus={e => e.target.style.borderColor = '#6366f1'}
      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
    >
      <option value="Order Placed">Order Placed</option>
      <option value="Packing">Packing</option>
      <option value="Shipped">Shipped</option>
      <option value="Out for Delivery">Out for delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>
)

export default Orders