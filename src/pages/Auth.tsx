
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    setUser({ id: '1', email: 'test@example.com' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          <h1 className="heading-1 text-center mb-8">{t('welcome')}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('email')}
              </label>
              <input
                type="email"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('password')}
              </label>
              <input
                type="password"
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="button-primary w-full">
              {isLogin ? t('login') : t('register')}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin ? t('register') : t('login')}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
