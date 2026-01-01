import { changePassParams, changePasswordAPI } from "@/API/Profile";
import { toastError, toastInfo } from "@/utlity/AlertSystem";
import { useState } from "react";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordSaved, setPasswordSaved] = useState(false);
  

  const handlePasswordSave = async () => {
    try {
      if (passwordData.new && passwordData.new === passwordData.confirm) {
        const data:changePassParams={
          oldPass: passwordData.current,
          newPass: passwordData.new
        }
        const changePassApi = await changePasswordAPI(data);
        
          setPasswordSaved(true);
          setPasswordData({ current: '', new: '', confirm: '' });
          setTimeout(() => setPasswordSaved(false), 2000);

      }

      else{
        toastInfo("New Password And Confirm Password Don't Match.")
      }
    } catch (error) {
      toastError("Failed To Change Password.\nPlease Try Again");
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6">Change Password</h2>
        
        {passwordSaved && (
          <div className="mb-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-700 font-semibold text-center">
            Password Saved Successfully!
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
            <input 
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
              className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              placeholder="Enter current password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <input 
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
              className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <input 
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
              className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              placeholder="Confirm new password"
            />
          </div>
          
          <button 
            onClick={handlePasswordSave}
            className="w-full bg-yellow-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition"
          >
            Save New Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
