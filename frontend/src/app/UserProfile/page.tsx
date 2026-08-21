'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '../../../lib/axios';
import { logoutUser } from '../../../lib/auth';
import {
  User, ShoppingBag, MapPin, CreditCard, LogOut, ChevronRight,
  Package, Truck, CheckCircle2, Clock, Star, Edit3, Plus, Trash2, Camera, Loader2, AlertCircle,
} from 'lucide-react';

// ---------- Types ----------cd
interface Profile {
  firstName: string; lastName: string; email: string; phone: string; avatar: string; rewardPoints?: number;
}
interface Order {
  id: string; date: string; status: 'Delivered' | 'Shipping' | 'Processing' | 'Cancelled';
  total: number; items: number; image: string;
}
interface Address {
  id: number; label: string; fullName: string; street: string; city: string;
  country: string; zip: string; isDefault: boolean;
}
interface PaymentMethod {
  id: number; type: 'Visa' | 'Mastercard' | 'PayPal'; last4: string; expiry: string; isDefault: boolean;
}

// ---------- Helpers ----------
const TABS = [
  { key: 'profile', label: 'My Profile', icon: User },
  { key: 'orders', label: 'My Orders', icon: ShoppingBag },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'payments', label: 'Payment Methods', icon: CreditCard },
] as const;
type TabKey = (typeof TABS)[number]['key'];

const statusStyles: Record<Order['status'], string> = {
  Delivered: 'bg-[#00C12B]/10 text-[#00C12B]',
  Shipping: 'bg-[#06CAF5]/10 text-[#06CAF5]',
  Processing: 'bg-[#F5DD06]/15 text-[#B8960A]',
  Cancelled: 'bg-[#F50606]/10 text-[#F50606]',
};
const StatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'Delivered': return <CheckCircle2 className="w-4 h-4" />;
    case 'Shipping': return <Truck className="w-4 h-4" />;
    case 'Processing': return <Clock className="w-4 h-4" />;
    default: return <Package className="w-4 h-4" />;
  }
};

// ---------- Main Component ----------
export default function UserProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>('profile');

  const [profile, setProfile] = useState<Profile>({
    firstName: '', lastName: '', email: '', phone: '', avatar: '/images/clothes/Frame4.png',
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [payments, setPayments] = useState<PaymentMethod[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  // ---- Fetch everything on mount ----
  const loadAll = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [me, ord, addr, pay] = await Promise.all([
        api.get('/auth/me'),
        api.get('/user/orders'),
        api.get('/user/addresses'),
        api.get('/user/payments'),
      ]);
      setProfile(me.data);
      setOrders(ord.data);
      setAddresses(addr.data);
      setPayments(pay.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load your account. Please log in again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) { router.replace('/login'); return; }
    loadAll();
  }, [loadAll, router]);

  // ---- Actions ----
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/user/profile', profile);
      setProfile((p) => ({ ...p, ...data }));
      showToast('Profile updated successfully ✅');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Update failed');
    } finally { setSaving(false); }
  };

  const deleteAddress = async (id: number) => {
    try {
      await api.delete(`/user/addresses/${id}`);
      setAddresses(addresses.filter((a) => a.id !== id));
      showToast('Address removed');
    } catch { showToast('Could not remove address'); }
  };

  const deletePayment = async (id: number) => {
    try {
      await api.delete(`/user/payments/${id}`);
      setPayments(payments.filter((p) => p.id !== id));
      showToast('Card removed');
    } catch { showToast('Could not remove card'); }
  };

  const handleLogout = async () => { await logoutUser(); router.replace('/'); };

  // ---- Render guards ----
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-10 h-10 text-[#F50606]" />
        <p className="text-black/70">{error}</p>
        <button onClick={() => router.push('/login')} className="px-6 py-3 rounded-[62px] bg-black text-white text-sm font-medium">Go to Login</button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-[100px] py-8 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-[12px] bg-black text-white text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-2">
          {toast}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-3 text-sm text-black/60 mb-6">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-black font-medium">My Account</span>
      </div>

      <h1 className="text-[32px] font-bold text-black mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-[295px] flex-shrink-0 border border-black/10 rounded-[20px] p-5 bg-white h-fit">
          <div className="flex items-center gap-4 pb-5 border-b border-black/10 mb-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#F0F0F0] flex-shrink-0">
              <Image src={profile.avatar} alt="avatar" fill className="object-cover" sizes="56px" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-black truncate">{profile.firstName} {profile.lastName}</p>
              <p className="text-sm text-black/60 truncate">{profile.email}</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-[12px] text-[15px] transition-all ${isActive ? 'bg-black text-white font-medium' : 'text-black/70 hover:bg-[#F0F0F0]'}`}>
                  <span className="flex items-center gap-3"><Icon className="w-[18px] h-[18px]" />{tab.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              );
            })}
          </nav>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 mt-4 rounded-[12px] text-[15px] text-[#F50606] hover:bg-[#F50606]/5 transition-colors">
            <LogOut className="w-[18px] h-[18px]" /> Log Out
          </button>
        </aside>

        {/* CONTENT */}
        <section className="flex-1 border border-black/10 rounded-[20px] p-6 md:p-8 bg-white min-h-[600px]">

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[24px] font-bold text-black">My Profile</h2>
                <button className="flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black"><Edit3 className="w-4 h-4" /> Edit</button>
              </div>
              <div className="flex items-center gap-6 mb-8 p-5 rounded-[20px] bg-[#F8F8F8]">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#F0F0F0] flex-shrink-0">
                  <Image src={profile.avatar} alt="avatar" fill className="object-cover" sizes="96px" />
                </div>
                <div>
                  <p className="font-bold text-black mb-1">Profile Photo</p>
                  <p className="text-sm text-black/60 mb-3">JPG or PNG. Max size 2MB.</p>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-[62px] bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors">
                    <Camera className="w-4 h-4" /> Upload New Photo
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="First Name" value={profile.firstName} onChange={(v) => setProfile({ ...profile, firstName: v })} />
                <Field label="Last Name" value={profile.lastName} onChange={(v) => setProfile({ ...profile, lastName: v })} />
                <Field label="Email Address" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} type="email" />
                <Field label="Phone Number" value={profile.phone || ''} onChange={(v) => setProfile({ ...profile, phone: v })} />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button onClick={loadAll} className="px-7 py-3.5 rounded-[62px] border border-black/10 text-sm font-medium text-black hover:bg-[#F0F0F0] transition-colors">Cancel</button>
                <button onClick={handleSaveProfile} disabled={saving}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-[62px] bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors disabled:opacity-60">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-[24px] font-bold text-black mb-2">My Orders</h2>
              <p className="text-sm text-black/60 mb-8">Track, return, or buy again from your past orders.</p>
              {orders.length === 0 ? <EmptyState text="You haven't placed any orders yet." /> : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-[20px] border border-black/10 hover:border-black/20 transition-colors">
                      <div className="relative w-20 h-20 rounded-[12px] overflow-hidden bg-[#F0F0F0] flex-shrink-0">
                        <Image src={order.image} alt={order.id} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-black">{order.id}</p>
                          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-[62px] text-xs font-medium ${statusStyles[order.status]}`}>
                            <StatusIcon status={order.status} />{order.status}
                          </span>
                        </div>
                        <p className="text-sm text-black/60">Placed on {order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-6">
                        <p className="font-bold text-xl text-black">${order.total}</p>
                        <button className="flex items-center gap-1 text-sm font-medium text-black hover:underline">View Details <ChevronRight className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADDRESSES */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-[24px] font-bold text-black">Saved Addresses</h2><p className="text-sm text-black/60 mt-1">Manage your delivery addresses.</p></div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-[62px] bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"><Plus className="w-4 h-4" /> Add New</button>
              </div>
              {addresses.length === 0 ? <EmptyState text="No saved addresses yet." /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="relative p-5 rounded-[20px] border border-black/10 hover:border-black/20 transition-colors">
                      {addr.isDefault && <span className="absolute top-4 right-4 px-2.5 py-1 rounded-[62px] bg-black text-white text-[11px] font-medium">Default</span>}
                      <div className="flex items-center gap-2 mb-3"><MapPin className="w-4 h-4 text-black/60" /><p className="font-bold text-black">{addr.label}</p></div>
                      <p className="text-sm text-black/80 leading-relaxed">{addr.fullName}<br />{addr.street}<br />{addr.city}, {addr.zip}<br />{addr.country}</p>
                      <div className="flex gap-4 mt-4 pt-4 border-t border-black/10">
                        <button className="text-sm font-medium text-black hover:underline">Edit</button>
                        <button onClick={() => deleteAddress(addr.id)} className="flex items-center gap-1 text-sm font-medium text-[#F50606] hover:underline"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PAYMENTS */}
          {activeTab === 'payments' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-[24px] font-bold text-black">Payment Methods</h2><p className="text-sm text-black/60 mt-1">Manage your saved cards securely.</p></div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-[62px] bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"><Plus className="w-4 h-4" /> Add Card</button>
              </div>
              {payments.length === 0 ? <EmptyState text="No saved payment methods." /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {payments.map((pm) => (
                    <div key={pm.id} className="relative p-5 rounded-[20px] bg-gradient-to-br from-black to-black/80 text-white overflow-hidden">
                      {pm.isDefault && <span className="absolute top-4 right-4 px-2.5 py-1 rounded-[62px] bg-white/20 backdrop-blur text-[11px] font-medium">Default</span>}
                      <CreditCard className="w-8 h-8 mb-6 opacity-80" />
                      <p className="font-mono text-lg tracking-wider mb-1">•••• •••• •••• {pm.last4}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div><p className="text-xs text-white/60">Expires</p><p className="text-sm font-medium">{pm.expiry}</p></div>
                        <p className="text-sm font-bold">{pm.type}</p>
                      </div>
                      <button onClick={() => deletePayment(pm.id)} className="flex items-center gap-1 mt-4 text-xs font-medium text-white/70 hover:text-white"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 p-5 rounded-[20px] bg-[#F8F8F8] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFC633]/20 flex items-center justify-center flex-shrink-0"><Star className="w-6 h-6 text-[#FFC633] fill-current" /></div>
                <div className="flex-1">
                  <p className="font-bold text-black">JAWADSHOP Rewards</p>
                  <p className="text-sm text-black/60">You have <span className="font-bold text-black">{profile.rewardPoints ?? 0} points</span> — redeem for ${((profile.rewardPoints ?? 0) / 100).toFixed(0)} off your next order.</p>
                </div>
                <button className="text-sm font-medium text-black hover:underline whitespace-nowrap">View Rewards</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// ---------- Reusable bits ----------
function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string; }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-black/70">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-[12px] bg-[#F0F0F0] text-[15px] text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black transition-all" />
    </label>
  );
}
function EmptyState({ text }: { text: string }) {
  return <div className="py-16 text-center text-black/50 text-sm">{text}</div>;
}