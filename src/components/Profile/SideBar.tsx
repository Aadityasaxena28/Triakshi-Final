import { Gift, Lock, LogOut, Package, ShoppingCart, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SideBar = ({setSidebarOpen,sidebarOpen, setCurrentPage}) => {

    const navigate = useNavigate();
  const handleLogout = (): void => {
    localStorage.removeItem("tg_user");
    // setIsProfileOpen(false);
    navigate("/");
  };
  return (
    <div
  className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="p-6 border-b border-yellow-200 flex justify-between items-center">
    <h2 className="text-2xl font-bold text-yellow-600">Menu</h2>
    <button
      onClick={() => setSidebarOpen(false)}
      className="p-2 hover:bg-yellow-100 rounded-lg"
    >
      <X className="w-6 h-6 text-yellow-600" />
    </button>
  </div>

  <nav className="p-4 space-y-2">
    <button
      onClick={() => {
        setCurrentPage("profile");
        setSidebarOpen(false);
      }}
      className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition"
    >
      <User className="w-10 h-10 text-yellow-600 shrink-0" />
      <span className="font-semibold text-gray-800 text-lg">Profile</span>
    </button>

    {/* <button
      onClick={() => {
        setCurrentPage("cart");
        setSidebarOpen(false);
      }}
      className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition"
    >
      <ShoppingCart className="w-10 h-10 text-yellow-600 shrink-0" />
      <span className="font-semibold text-gray-800 text-lg">Cart</span>
    </button> */}

    <button
      onClick={() => {
        setCurrentPage("order");
        setSidebarOpen(false);
      }}
      className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition"
    >
      <Package className="w-10 h-10 text-yellow-600 shrink-0" />
      <span className="font-semibold text-gray-800 text-lg">Order History</span>
    </button>

    <button
      onClick={() => {
        setCurrentPage("refer-earn");
        setSidebarOpen(false);
      }}
      className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition"
    >
      <Gift className="w-10 h-10 text-yellow-600 shrink-0" />
      <span className="font-semibold text-gray-800 text-lg">Refer & Earn</span>
    </button>

    <button
      onClick={() => {
        setCurrentPage("password");
        setSidebarOpen(false);
      }}
      className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition"
    >
      <Lock className="w-10 h-10 text-yellow-600 shrink-0" />
      <span className="font-semibold text-gray-800 text-lg">Change Password</span>
    </button>

    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-4 p-4 hover:bg-red-100 rounded-lg transition mt-8"
    >
      <LogOut className="w-10 h-10 text-red-600 shrink-0" />
      <span className="font-semibold text-red-600 text-lg">Log Out</span>
    </button>
  </nav>
</div>
  )
}

export default SideBar
