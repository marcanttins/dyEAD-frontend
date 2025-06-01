// src/router/index.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Importações com lazy loading
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')
const ForgotPassword = () => import('@/views/ForgotPassword.vue')
const ResetPassword = () => import('@/views/ResetPassword.vue')

// Registro: a rota de registro genérica antiga será substituída
const RegisterStudent = () => import('@/views/RegisterStudent.vue')
const RegisterTeacher = () => import('@/views/RegisterTeacher.vue')
const RegisterAdmin = () => import('@/views/RegisterAdmin.vue')

// Dashboards
const StudentDashboard = () => import('@/views/StudentDashboard.vue')
const InstructorDashboard = () => import('@/views/InstructorDashboard.vue')
const AdminDashboard = () => import('@/views/AdminDashboard.vue')

// Outras views
const CourseList = () => import('@/views/CourseList.vue')
const CourseDetails = () => import('@/views/CourseDetails.vue')
const CoursePlayer = () => import('@/views/CoursePlayer.vue')
const CourseManagement = () => import('@/views/CourseManagement.vue')
const EditCourse = () => import('@/views/EditCourse.vue')
const FeedbackAnalysis = () => import('@/views/FeedbackAnalysis.vue')
const Forum = () => import('@/views/Forum.vue')
const Notification = () => import('@/views/Notification.vue')
const Profile = () => import('@/views/Profile.vue')
const ProgressTracker = () => import('@/views/ProgressTracker.vue')
const Quiz = () => import('@/views/Quiz.vue')
const Recommendation = () => import('@/views/Recommendation.vue')
const Reports = () => import('@/views/Reports.vue')
const Settings = () => import('@/views/Settings.vue')
const TutorBot = () => import('@/views/TutorBot.vue')
const UserManagement = () => import('@/views/UserManagement.vue')
const SearchResults = () => import('@/views/SearchResults.vue')
const SendNotification = () => import('@/views/SendNotification.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
  // Rotas públicas
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Login' }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { title: 'Recuperar Senha' }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { title: 'Redefinir Senha' }
  },

  // Registro diferenciado
  {
    path: '/register/student',
    name: 'RegisterStudent',
    component: RegisterStudent,
    meta: { title: 'Registro de Aluno' }
  },
  // Rotas para registro de professor e administrador são protegidas, acessíveis somente por admin (via dashboard)

  // Dashboards – acesso conforme role (essas rotas exigem autenticação)
  {
    path: '/dashboard',
    name: 'StudentDashboard',
    component: StudentDashboard,
    meta: { title: 'Dashboard do Aluno', requiresAuth: true, role: 'aluno' }
  },
  {
    path: '/instructor/dashboard',
    name: 'InstructorDashboard',
    component: InstructorDashboard,
    meta: { title: 'Dashboard do Instrutor', requiresAuth: true, role: 'instrutor' }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { title: 'Dashboard do Administrador', requiresAuth: true, role: 'admin' },
    children: [
      // Rotas internas do dashboard admin
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/AdminUsers.vue'),
        meta: { requiresAuth: true, role: 'admin', title: 'Gerenciamento de Usuários' }
      },
      {
        path: 'courses',
        name: 'AdminCourses',
        component: () => import('@/views/AdminCourses.vue'),
        meta: { requiresAuth: true, role: 'admin', title: 'Gerenciamento de Cursos' }
      },
      {
        path: 'reports',
        name: 'AdminReports',
        component: Reports,
        meta: { requiresAuth: true, role: 'admin', title: 'Relatórios' }
      },
      {
        path: 'configurations',
        name: 'AdminConfigurations',
        component: Settings,
        meta: { requiresAuth: true, role: 'admin', title: 'Configurações' }
      },
      {
        path: 'notifications',
        name: 'AdminNotifications',
        component: Notification,
        meta: { requiresAuth: true, role: 'admin', title: 'Notificações' }
      },
      {
        path: 'register/teacher',
        name: 'RegisterTeacher',
        component: RegisterTeacher,
        meta: { requiresAuth: true, role: 'admin', title: 'Registro de Professor' }
      },
      {
        path: 'register/admin',
        name: 'RegisterAdmin',
        component: RegisterAdmin,
        meta: { requiresAuth: true, role: 'admin', title: 'Registro de Administrador' }
      },
    ],
  },

  // Outras views
  { path: '/courses', name: 'CourseList', component: CourseList, meta: { title: 'Cursos' } },
  { path: '/course/:id', name: 'CourseDetails', component: CourseDetails, props: true, meta: { title: 'Detalhes do Curso', requiresAuth: true } },
  { path: '/course-player/:id', name: 'CoursePlayer', component: CoursePlayer, props: true, meta: { title: 'Player do Curso', requiresAuth: true } },
  { path: '/course-management', name: 'CourseManagement', component: CourseManagement, meta: { title: 'Gerenciamento de Curso', requiresAuth: true, role: 'instrutor' } },
  { path: '/edit-course/:id', name: 'EditCourse', component: EditCourse, props: true, meta: { title: 'Editar Curso', requiresAuth: true, role: 'instrutor' } },
  { path: '/feedback-analysis', name: 'FeedbackAnalysis', component: FeedbackAnalysis, meta: { title: 'Análise de Feedback', requiresAuth: true } },
  { path: '/forum', name: 'Forum', component: Forum, meta: { title: 'Fórum' } },
  { path: '/notification', name: 'Notification', component: Notification, meta: { title: 'Notificações', requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { title: 'Perfil', requiresAuth: true } },
  { path: '/progress', name: 'ProgressTracker', component: ProgressTracker, meta: { title: 'Progresso', requiresAuth: true } },
  { path: '/quiz', name: 'Quiz', component: Quiz, meta: { title: 'Quiz', requiresAuth: true } },
  { path: '/recommendation', name: 'Recommendation', component: Recommendation, meta: { title: 'Recomendações', requiresAuth: true } },
  { path: '/reports', name: 'Reports', component: Reports, meta: { title: 'Relatórios', requiresAuth: true, role: 'admin' } },
  { path: '/settings', name: 'Settings', component: Settings, meta: { title: 'Configurações', requiresAuth: true } },
  { path: '/tutor-bot', name: 'TutorBot', component: TutorBot, meta: { title: 'Tutor Bot', requiresAuth: true } },
  { path: '/user-management', name: 'UserManagement', component: UserManagement, meta: { title: 'Gerenciamento de Usuários', requiresAuth: true, role: 'admin' } },
  { path: '/search-results', name: 'SearchResults', component: SearchResults, meta: { title: 'Resultados da Busca' } },
  { path: '/send-notification', name: 'SendNotification', component: SendNotification, meta: { title: 'Enviar Notificação', requiresAuth: true, role: 'admin' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { title: 'Página Não Encontrada' } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Global Navigation Guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    // Se o usuário não estiver logado, redireciona para Login
    if (!authStore.token || !authStore.isLoggedIn) {
      return next({ name: 'Login' });
    }
    // Se a rota exige um role específico, verifica se o usuário possui o papel requerido
    const requiredRole = to.meta.role as string | undefined;
    if (requiredRole && authStore.user?.role !== requiredRole) {
      // Redireciona conforme o papel do usuário
      if (authStore.user?.role === 'admin') {
        return next({ name: 'AdminDashboard' });
      } else if (authStore.user?.role === 'instrutor') {
        return next({ name: 'InstructorDashboard' });
      } else {
        return next({ name: 'StudentDashboard' });
      }
    }
  }

  // Atualiza o título da página
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;
