import React, { useState } from 'react';

interface AccountSettingsViewProps {
  userName?: string;
  userEmail?: string;
  uiDensity?: 'compact' | 'medium' | 'standard';
  onDensityChange?: (density: 'compact' | 'medium' | 'standard') => void;
}

export const AccountSettingsView: React.FC<AccountSettingsViewProps> = ({
  userName = 'Tahir Khan',
  userEmail = 'salmanziachattha107@gmail.com',
  uiDensity = 'medium',
  onDensityChange
}) => {
  const [nameInput, setNameInput] = useState(userName);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Display name updated successfully.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="space-y-8 font-sans text-slate-900 max-w-2xl pb-16">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
          PROPOSALA · ACCOUNT
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight mt-0.5">
          Account settings
        </h1>
        <p className="text-xs text-slate-600 font-sans mt-1">
          Update your display name and password. Your email address is used for sign-in and can't be changed here.
        </p>
      </div>

      {statusMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-sm font-mono">
          ✓ {statusMessage}
        </div>
      )}

      {/* Profile Name Form */}
      <form onSubmit={handleSaveName} className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 shadow-2xs font-mono">
        <div>
          <h2 className="text-base font-serif font-bold text-slate-900">Profile</h2>
          <p className="text-xs font-sans text-slate-500">Shown to teammates across the workspace.</p>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">EMAIL</label>
          <input
            type="text"
            disabled
            value={userEmail}
            className="w-full bg-slate-100 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-500 cursor-not-allowed"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">NAME</label>
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-sm text-xs cursor-pointer transition-colors"
        >
          Save name
        </button>
      </form>

      {/* UI Density Preference Card */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 shadow-2xs font-mono">
        <div>
          <h2 className="text-base font-serif font-bold text-slate-900">UI Density Settings</h2>
          <p className="text-xs font-sans text-slate-500">Choose spacing, font sizes, and layout density for your workspace view.</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(['compact', 'medium', 'standard'] as const).map((density) => (
            <button
              key={density}
              type="button"
              onClick={() => onDensityChange?.(density)}
              className={`p-4 rounded-sm border text-left cursor-pointer transition-all space-y-1 ${
                uiDensity === density
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs capitalize">{density}</span>
                {uiDensity === density && <span className="text-emerald-400 text-xs">✓</span>}
              </div>
              <p className={`text-[10px] font-sans ${uiDensity === density ? 'text-slate-300' : 'text-slate-500'}`}>
                {density === 'compact' && 'Tighter padding and high data density.'}
                {density === 'medium' && 'Balanced spacing and optimal comfort.'}
                {density === 'standard' && 'Spacious standard layout with relaxed padding.'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Password Form */}
      <form onSubmit={handleUpdatePassword} className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 shadow-2xs font-mono">
        <div>
          <h2 className="text-base font-serif font-bold text-slate-900">Password</h2>
          <p className="text-xs font-sans text-slate-500">Enter your current password to confirm, then set a new one.</p>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">CURRENT PASSWORD</label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">NEW PASSWORD</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">CONFIRM NEW PASSWORD</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-sm text-xs cursor-pointer transition-colors"
        >
          Update password
        </button>
      </form>

    </div>
  );
};
