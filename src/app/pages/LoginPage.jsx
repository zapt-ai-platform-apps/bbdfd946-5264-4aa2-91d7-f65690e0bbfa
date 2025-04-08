import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../modules/auth/providers/AuthProvider';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get the path they were trying to access
  const from = location.state?.from?.pathname || '/dashboard';
  
  // If already logged in, redirect to dashboard/previous location
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-6">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=64&height=64" 
                alt="Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                {t('auth.signInWith')} ZAPT
              </h1>
            </div>
            
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#3B82F6',
                      brandAccent: '#2563EB',
                    },
                  },
                },
                style: {
                  button: {
                    borderRadius: '0.375rem',
                    height: '42px',
                  },
                  input: {
                    borderRadius: '0.375rem',
                    height: '42px',
                  },
                  container: {
                    direction: 'rtl',
                  },
                  label: {
                    marginBottom: '8px',
                    textAlign: 'right',
                  },
                  message: {
                    textAlign: 'right',
                  },
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'البريد الإلكتروني',
                    password_label: 'كلمة المرور',
                    button_label: 'تسجيل الدخول',
                    link_text: 'لديك حساب بالفعل؟ تسجيل الدخول',
                    email_input_placeholder: 'بريدك الإلكتروني',
                    password_input_placeholder: 'كلمة المرور الخاصة بك',
                  },
                  sign_up: {
                    email_label: 'البريد الإلكتروني',
                    password_label: 'كلمة المرور',
                    button_label: 'إنشاء حساب',
                    link_text: 'ليس لديك حساب؟ إنشاء حساب',
                    email_input_placeholder: 'بريدك الإلكتروني',
                    password_input_placeholder: 'كلمة المرور الخاصة بك',
                  },
                  magic_link: {
                    button_label: 'إرسال رابط السحري',
                    link_text: 'إرسال رابط سحري للبريد الإلكتروني',
                    email_input_label: 'البريد الإلكتروني',
                    email_input_placeholder: 'بريدك الإلكتروني',
                  },
                  forgotten_password: {
                    button_label: 'إرسال تعليمات إعادة تعيين كلمة المرور',
                    link_text: 'نسيت كلمة المرور؟',
                    email_input_label: 'البريد الإلكتروني',
                    email_input_placeholder: 'بريدك الإلكتروني',
                  },
                },
              }}
              theme="default"
              providers={['google', 'facebook', 'apple']}
              redirectTo={window.location.origin}
              magicLink={true}
              view="magic_link"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;