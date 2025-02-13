
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to HealthTrack',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      // Onboarding
      next: 'Next',
      skip: 'Skip',
      getStarted: 'Get Started',
      onboarding: {
        step1: {
          title: 'Track Your Health',
          description: 'Monitor your daily health metrics and see your progress over time'
        },
        step2: {
          title: 'Get Personalized Insights',
          description: 'Receive customized recommendations based on your health data'
        },
        step3: {
          title: 'Stay Motivated',
          description: 'Set goals and celebrate your achievements along the way'
        }
      },
      // Plans
      choosePlan: 'Choose Your Plan',
      freePlan: 'Free',
      premiumPlan: 'Premium',
      continue: 'Continue',
      'freePlan.feature1': 'Basic health tracking',
      'freePlan.feature2': 'Weekly reports',
      'freePlan.feature3': 'Community access',
      'premiumPlan.feature1': 'Advanced health analytics',
      'premiumPlan.feature2': 'Daily personalized insights',
      'premiumPlan.feature3': 'Priority support',
      // Profile Setup
      personalizeYourExperience: 'Personalize Your Experience',
      personalizeDescription: 'Help us understand your goals better',
      whatAreYourGoals: 'What are your goals?',
      howOftenWantRecommendations: 'How often would you like recommendations?',
      selectGoal: 'Select a goal',
      selectFrequency: 'Select frequency',
      finishSetup: 'Finish Setup',
      goals: {
        weightLoss: 'Weight Loss',
        mentalHealth: 'Mental Health',
        symptomTracking: 'Symptom Tracking',
        fitness: 'Fitness'
      },
      frequency: {
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly'
      }
    },
  },
  pt: {
    translation: {
      welcome: 'Bem-vindo ao HealthTrack',
      login: 'Entrar',
      register: 'Registrar',
      email: 'Email',
      password: 'Senha',
      name: 'Nome',
      // Onboarding
      next: 'Próximo',
      skip: 'Pular',
      getStarted: 'Começar',
      onboarding: {
        step1: {
          title: 'Monitore Sua Saúde',
          description: 'Acompanhe suas métricas de saúde diárias e veja seu progresso ao longo do tempo'
        },
        step2: {
          title: 'Receba Insights Personalizados',
          description: 'Receba recomendações personalizadas com base em seus dados de saúde'
        },
        step3: {
          title: 'Mantenha-se Motivado',
          description: 'Defina metas e celebre suas conquistas ao longo do caminho'
        }
      },
      // Plans
      choosePlan: 'Escolha Seu Plano',
      freePlan: 'Gratuito',
      premiumPlan: 'Premium',
      continue: 'Continuar',
      'freePlan.feature1': 'Monitoramento básico de saúde',
      'freePlan.feature2': 'Relatórios semanais',
      'freePlan.feature3': 'Acesso à comunidade',
      'premiumPlan.feature1': 'Análise avançada de saúde',
      'premiumPlan.feature2': 'Insights personalizados diários',
      'premiumPlan.feature3': 'Suporte prioritário',
      // Profile Setup
      personalizeYourExperience: 'Personalize Sua Experiência',
      personalizeDescription: 'Ajude-nos a entender melhor seus objetivos',
      whatAreYourGoals: 'Quais são seus objetivos?',
      howOftenWantRecommendations: 'Com que frequência deseja recomendações?',
      selectGoal: 'Selecione um objetivo',
      selectFrequency: 'Selecione a frequência',
      finishSetup: 'Concluir Configuração',
      goals: {
        weightLoss: 'Perda de Peso',
        mentalHealth: 'Saúde Mental',
        symptomTracking: 'Monitoramento de Sintomas',
        fitness: 'Condicionamento Físico'
      },
      frequency: {
        daily: 'Diária',
        weekly: 'Semanal',
        monthly: 'Mensal'
      }
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
