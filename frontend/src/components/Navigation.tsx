'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, User, Globe, Moon, Sun, LogOut, ChevronDown } from 'lucide-react';
import { useAppContext } from './GlobalProvider';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { lang, theme, toggleLang, toggleTheme, t } = useAppContext();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm transition-colors">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Left Section: Logo & Action Buttons */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary-dark dark:text-slate-100 hover:text-primary-blue transition-colors">
              <Compass className="text-primary-blue" />
              <span className="hidden sm:inline-block">Academy Compass</span>
            </Link>
            
            <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-6">
              <button onClick={toggleLang} className="flex items-center gap-1 justify-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary-blue hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors" title={t('langText')}>
                <Globe size={18} />
                <span className="text-xs font-bold uppercase">{lang}</span>
              </button>
              <button onClick={toggleTheme} className="flex items-center justify-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary-blue hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors" title={t('themeText')}>
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden lg:flex flex-1 justify-start px-4 gap-3 text-sm font-medium">
            <Link href="/about" className="whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors">{t('about')}</Link>
            <Link href="/science" className="whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors">{t('science')}</Link>
            <Link href="/academic-path" className="whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors">{t('path')}</Link>
            <Link href="/resources" className="whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors">{t('resources')}</Link>
            <Link href="/help" className="whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors">{t('help')}</Link>
            <Link href="/contact" className="whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors">{t('contact')}</Link>
          </nav>

          {/* Right Section: Auth */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex mr-2 relative">
              {isAuthenticated && user ? (
                // Logged-in: show user chip with dropdown
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {user.username[0].toUpperCase()}
                    </div>
                    <span>{user.username}</span>
                    <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-500 dark:text-slate-400">შესული ვარ როგორც</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user.username}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={15} />
                        გამოსვლა
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Not logged in: show login icon button
                <button
                  onClick={() => setAuthModalOpen(true)}
                  aria-label={t('login')}
                  className="flex items-center justify-center p-2 text-slate-600 dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-blue hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  title={t('login')}
                >
                  <User size={20} />
                </button>
              )}
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setAuthModalOpen(true)}
                aria-label={t('login')}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-primary-blue transition-colors rounded-md"
              >
                {isAuthenticated ? (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {user?.username[0].toUpperCase()}
                  </div>
                ) : (
                  <User size={20}/>
                )}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary-blue hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md py-4 px-4 flex flex-col gap-4 z-40 transition-colors">
            <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 sm:hidden">
               <button onClick={toggleLang} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-blue" title={t('langText')}>
                 <Globe size={18} /> <span className="uppercase">{lang}</span>
               </button>
               <button onClick={toggleTheme} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-blue" title={t('themeText')}>
                 {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />} <span>{t('themeText')}</span>
               </button>
            </div>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-primary-blue font-medium py-2 border-b border-slate-100 dark:border-slate-800">{t('about')}</Link>
            <Link href="/science" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-primary-blue font-medium py-2 border-b border-slate-100 dark:border-slate-800">{t('science')}</Link>
            <Link href="/academic-path" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-primary-blue font-medium py-2 border-b border-slate-100 dark:border-slate-800">{t('path')}</Link>
            <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-primary-blue font-medium py-2 border-b border-slate-100 dark:border-slate-800">{t('resources')}</Link>
            <Link href="/help" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-primary-blue font-medium py-2 border-b border-slate-100 dark:border-slate-800">{t('help')}</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-primary-blue font-medium py-2">{t('contact')}</Link>
            {isAuthenticated && (
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium py-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                <LogOut size={16} /> გამოსვლა
              </button>
            )}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}


