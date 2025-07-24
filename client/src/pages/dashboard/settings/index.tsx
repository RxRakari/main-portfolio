import React, { useState } from 'react';
import { FiSettings, FiUser, FiLock, FiMoon, FiBell, FiShield, FiSave } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, TextArea, Select, Checkbox } from '../../../components/ui/dashboard/form-elements';
import ImageUpload from '../../../components/ui/dashboard/image-upload';
import { uploadImage } from '../../../services/upload-service';

const SettingsPage: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    bio: 'Full-stack developer with a passion for creating beautiful and functional web applications.',
    avatar: 'https://via.placeholder.com/150',
    location: 'New York, USA',
    website: 'https://example.com',
    twitter: '@adminuser',
    github: 'adminuser',
  });

  // Account settings state
  const [accountData, setAccountData] = useState({
    username: 'admin',
    email: 'admin@example.com',
    language: 'en',
    timezone: 'America/New_York',
  });

  // Appearance settings state
  const [appearanceData, setAppearanceData] = useState({
    theme: 'dark',
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false,
  });

  // Notification settings state
  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    updateNotifications: true,
    securityNotifications: true,
  });

  // Security settings state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    sessionTimeout: '30',
  });

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle profile data change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle account data change
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle appearance data change
  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked }: any= e.target;
    setAppearanceData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle notification data change
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle security data change
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked }: any = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle avatar upload
  const handleAvatarUpload = async (file: File): Promise<string> => {
    try {
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  // Handle avatar change
  const handleAvatarChange = (url: string) => {
    setProfileData(prev => ({
      ...prev,
      avatar: url
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      // In a real app, you would call an API to save the settings
      console.log('Saving settings...');
      console.log('Profile data:', profileData);
      console.log('Account data:', accountData);
      console.log('Appearance data:', appearanceData);
      console.log('Notification data:', notificationData);
      console.log('Security data:', securityData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  // Tabs configuration
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'account', label: 'Account', icon: <FiLock /> },
    { id: 'appearance', label: 'Appearance', icon: <FiMoon /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { id: 'security', label: 'Security', icon: <FiShield /> },
  ];

  return (
    <div className="py-6">
      <SectionHeader
        title="Settings"
        description="Manage your account settings and preferences"
        icon={<FiSettings size={24} />}
      />

      {/* Settings tabs */}
      <div className="mb-6 bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-4 overflow-x-auto">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-white mb-2">Profile Picture</label>
                <div className="flex items-start">
                  <div className="mr-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-black/30 border border-white/10">
                      <img 
                        src={profileData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Avatar';
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <ImageUpload
                      id="avatar"
                      label=""
                      value={profileData.avatar}
                      onChange={handleAvatarChange}
                      onUpload={handleAvatarUpload}
                      helperText="Upload a profile picture (up to 2MB)"
                      maxSizeMB={2}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  id="name"
                  name="name"
                  label="Full Name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="Enter your full name"
                />
                
                <TextInput
                  id="email"
                  name="email"
                  label="Email Address"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="Enter your email address"
                  type="email"
                />
              </div>
              
              <TextArea
                id="bio"
                name="bio"
                label="Bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                placeholder="Tell us about yourself"
                rows={4}
                className="mt-6"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <TextInput
                  id="location"
                  name="location"
                  label="Location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                  placeholder="City, Country"
                />
                
                <TextInput
                  id="website"
                  name="website"
                  label="Website"
                  value={profileData.website}
                  onChange={handleProfileChange}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <TextInput
                  id="twitter"
                  name="twitter"
                  label="Twitter"
                  value={profileData.twitter}
                  onChange={handleProfileChange}
                  placeholder="@username"
                />
                
                <TextInput
                  id="github"
                  name="github"
                  label="GitHub"
                  value={profileData.github}
                  onChange={handleProfileChange}
                  placeholder="username"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Account Settings */}
        {activeTab === 'account' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  id="username"
                  name="username"
                  label="Username"
                  value={accountData.username}
                  onChange={handleAccountChange}
                  placeholder="Enter your username"
                />
                
                <TextInput
                  id="accountEmail"
                  name="email"
                  label="Email Address"
                  value={accountData.email}
                  onChange={handleAccountChange}
                  placeholder="Enter your email address"
                  type="email"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Select
                  id="language"
                  name="language"
                  label="Language"
                  value={accountData.language}
                  onChange={handleAccountChange}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'fr', label: 'French' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'de', label: 'German' },
                    { value: 'ja', label: 'Japanese' },
                  ]}
                />
                
                <Select
                  id="timezone"
                  name="timezone"
                  label="Timezone"
                  value={accountData.timezone}
                  onChange={handleAccountChange}
                  options={[
                    { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
                    { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
                    { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
                    { value: 'Europe/London', label: 'London' },
                    { value: 'Europe/Paris', label: 'Paris' },
                    { value: 'Asia/Tokyo', label: 'Tokyo' },
                  ]}
                />
              </div>
              
              <div className="mt-8 p-4 border border-red-500/30 rounded-lg bg-red-900/10">
                <h3 className="text-lg font-medium text-red-400 mb-2">Danger Zone</h3>
                <p className="text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button 
                  type="button"
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-colors"
                  onClick={() => window.confirm('Are you sure you want to delete your account? This action cannot be undone.')}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Appearance Settings</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">Theme</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer ${
                      appearanceData.theme === 'dark' 
                        ? 'border-white/30 bg-white/10' 
                        : 'border-white/10 bg-black/30 hover:bg-white/5'
                    }`}
                    onClick={() => setAppearanceData(prev => ({ ...prev, theme: 'dark' }))}
                  >
                    <div className="h-20 rounded-md bg-black border border-white/20 mb-2"></div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="theme" 
                        value="dark" 
                        checked={appearanceData.theme === 'dark'} 
                        onChange={handleAppearanceChange}
                        className="mr-2 h-4 w-4 bg-black/30 border-white/20 text-white focus:ring-2 focus:ring-white/20 rounded"
                      />
                      <span className="text-white">Dark Mode</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer ${
                      appearanceData.theme === 'light' 
                        ? 'border-white/30 bg-white/10' 
                        : 'border-white/10 bg-black/30 hover:bg-white/5'
                    }`}
                    onClick={() => setAppearanceData(prev => ({ ...prev, theme: 'light' }))}
                  >
                    <div className="h-20 rounded-md bg-gray-200 border border-gray-300 mb-2"></div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="theme" 
                        value="light" 
                        checked={appearanceData.theme === 'light'} 
                        onChange={handleAppearanceChange}
                        className="mr-2 h-4 w-4 bg-black/30 border-white/20 text-white focus:ring-2 focus:ring-white/20 rounded"
                      />
                      <span className="text-white">Light Mode</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer ${
                      appearanceData.theme === 'system' 
                        ? 'border-white/30 bg-white/10' 
                        : 'border-white/10 bg-black/30 hover:bg-white/5'
                    }`}
                    onClick={() => setAppearanceData(prev => ({ ...prev, theme: 'system' }))}
                  >
                    <div className="h-20 rounded-md bg-gradient-to-r from-gray-900 to-gray-200 mb-2"></div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="theme" 
                        value="system" 
                        checked={appearanceData.theme === 'system'} 
                        onChange={handleAppearanceChange}
                        className="mr-2 h-4 w-4 bg-black/30 border-white/20 text-white focus:ring-2 focus:ring-white/20 rounded"
                      />
                      <span className="text-white">System Default</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <Select
                  id="fontSize"
                  name="fontSize"
                  label="Font Size"
                  value={appearanceData.fontSize}
                  onChange={handleAppearanceChange}
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                />
              </div>
              
              <div className="space-y-4">
                <Checkbox
                  id="reducedMotion"
                  name="reducedMotion"
                  label="Reduced Motion"
                  checked={appearanceData.reducedMotion}
                  onChange={handleAppearanceChange}
                  helperText="Reduce animations and motion effects"
                />
                
                <Checkbox
                  id="highContrast"
                  name="highContrast"
                  label="High Contrast"
                  checked={appearanceData.highContrast}
                  onChange={handleAppearanceChange}
                  helperText="Increase contrast for better visibility"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <Checkbox
                  id="emailNotifications"
                  name="emailNotifications"
                  label="Email Notifications"
                  checked={notificationData.emailNotifications}
                  onChange={handleNotificationChange}
                  helperText="Receive notifications via email"
                />
                
                <Checkbox
                  id="pushNotifications"
                  name="pushNotifications"
                  label="Push Notifications"
                  checked={notificationData.pushNotifications}
                  onChange={handleNotificationChange}
                  helperText="Receive push notifications in your browser"
                />
                
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">Notification Types</h3>
                  
                  <div className="space-y-4">
                    <Checkbox
                      id="messageNotifications"
                      name="messageNotifications"
                      label="Messages"
                      checked={notificationData.messageNotifications}
                      onChange={handleNotificationChange}
                      helperText="Notifications for new messages and comments"
                    />
                    
                    <Checkbox
                      id="updateNotifications"
                      name="updateNotifications"
                      label="Updates"
                      checked={notificationData.updateNotifications}
                      onChange={handleNotificationChange}
                      helperText="Notifications for system updates and new features"
                    />
                    
                    <Checkbox
                      id="securityNotifications"
                      name="securityNotifications"
                      label="Security Alerts"
                      checked={notificationData.securityNotifications}
                      onChange={handleNotificationChange}
                      helperText="Important security-related notifications"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                
                <div className="space-y-4">
                  <TextInput
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    placeholder="Enter your current password"
                    type="password"
                  />
                  
                  <TextInput
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    value={securityData.newPassword}
                    onChange={handleSecurityChange}
                    placeholder="Enter your new password"
                    type="password"
                  />
                  
                  <TextInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm New Password"
                    value={securityData.confirmPassword}
                    onChange={handleSecurityChange}
                    placeholder="Confirm your new password"
                    type="password"
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                
                <Checkbox
                  id="twoFactorAuth"
                  name="twoFactorAuth"
                  label="Enable Two-Factor Authentication"
                  checked={securityData.twoFactorAuth}
                  onChange={handleSecurityChange}
                  helperText="Add an extra layer of security to your account"
                />
                
                {securityData.twoFactorAuth && (
                  <div className="mt-4 p-4 bg-black/30 border border-white/10 rounded-lg">
                    <p className="text-gray-300 mb-4">Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to sign in.</p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-colors"
                    >
                      Setup Two-Factor Authentication
                    </button>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Session Management</h3>
                
                <Select
                  id="sessionTimeout"
                  name="sessionTimeout"
                  label="Session Timeout"
                  value={securityData.sessionTimeout}
                  onChange={handleSecurityChange}
                  options={[
                    { value: '15', label: '15 minutes' },
                    { value: '30', label: '30 minutes' },
                    { value: '60', label: '1 hour' },
                    { value: '120', label: '2 hours' },
                    { value: '240', label: '4 hours' },
                  ]}
                  helperText="Automatically log out after a period of inactivity"
                />
                
                <div className="mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-colors"
                  >
                    Sign Out All Other Sessions
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg flex items-center transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
