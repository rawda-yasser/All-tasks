import TaskPage from '../pages/TaskPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import SummaryPage from '../pages/SummaryPage.vue'
import NotFoundErrorPage from '../pages/errors/NotFoundErrorPage.vue'
const routes = [
  {
    path: '/',
    component: TaskPage,
    name: 'tasks'
  },
  {
    path: '/register',
    component: RegisterPage,
    name: 'register'
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'login'
  },
  {
    path: '/summary',
    component: SummaryPage,
    name: 'summary'
  },
  {
    path: '/:notFound(.*)',
    component: NotFoundErrorPage,
    name: 'notFound'
  }
]
export default routes
