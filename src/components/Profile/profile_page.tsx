import { getProfile } from '@/API/Profile';
import { UserProfile } from '@/DataTypes/Profile';
import { useQuery } from '@tanstack/react-query';
import { Gift, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cart from './Cart';
import ChangePassword from './ChangePassword';
import Order from './Order';
import Profile from './Profile';
import SideBar from './SideBar';

type ProfilePageOption = 'profile' | 'order' | 'refer-earn' | 'password';

const validProfilePages: ProfilePageOption[] = [
  'profile',
  // 'cart',
  'order',
  'refer-earn',
  'password',
];

export default function ProfilePage({ option }: { option?: ProfilePageOption }) {
  const navigate = useNavigate();
  const params = useParams();

  const urlPage = params.option as ProfilePageOption | undefined;

  const initialPage: ProfilePageOption =
    urlPage && validProfilePages.includes(urlPage)
      ? urlPage
      : option || 'profile';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<ProfilePageOption>(initialPage);

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    refetch: refetchProfile,
  } = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
  });

  const switchProfilePage = (page: ProfilePageOption) => {
    if (!validProfilePages.includes(page)) return;

    setCurrentPage(page);
    setSidebarOpen(false);
    navigate(`/${page}`);
  };

  useEffect(() => {
    if (urlPage && validProfilePages.includes(urlPage)) {
      setCurrentPage(urlPage);
    }
  }, [urlPage]);

  const renderComingSoon = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-16 text-center">
        <Gift size={80} className="mx-auto mb-6 text-yellow-500" />
        <h2 className="text-4xl font-bold text-yellow-600 mb-4">Coming Soon!</h2>
        <p className="text-xl text-gray-600">
          This feature will be available shortly. Stay tuned!
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-yellow-100 rounded-lg transition"
          >
            <Menu size={28} className="text-yellow-600" />
          </button>

          <h1
            className="text-3xl sm:text-4xl font-extrabold 
            bg-gradient-to-r from-yellow-500 via-orange-400 to-rose-400 
            bg-clip-text text-transparent tracking-wide drop-shadow-sm 
            bg-[length:200%_auto] animate-[shimmer_6s_linear_infinite]"
          >
            Your Life, Your Fortune
          </h1>

          <div className="w-10"></div>
        </div>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <SideBar
        sidebarOpen={sidebarOpen}
        setCurrentPage={switchProfilePage}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'profile' && (
          <Profile
            profile={profileData}
            isLoading={profileLoading}
            isError={profileError}
            refetchProfile={refetchProfile}
          />
        )}

        {/* {currentPage === 'cart' && <Cart />} */}
        {currentPage === 'order' && <Order />}
        {currentPage === 'refer-earn' && renderComingSoon()}
        {currentPage === 'password' && <ChangePassword />
        }
      </main>
    </div>
  );
}