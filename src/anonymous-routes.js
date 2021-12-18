import { lazy } from 'react'
import Loadable from 'ui-component/Loadable';

const HomePage = Loadable(lazy(() => import('views/landingPages/Home')))
const LoginPage = Loadable(lazy(() => import('views/authPages/Login')))
const SolutionSearchPage = Loadable(lazy(() => import('views/supportingPages/SearchSolution')))
const ServiceSearchPage = Loadable(lazy(() => import('views/supportingPages/SearchService')))
const CompanySearchPage = Loadable(lazy(() => import('views/supportingPages/SearchCompany')))

//import appInfo from './app-info'

const noRoutes = [
  { path: '/digital-solution', component: SolutionSearchPage },
  { path: '/digital-service', component: ServiceSearchPage },
  { path: '/digital-company', component: CompanySearchPage },
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
];

// appInfo.modules
//   .forEach(fileName => {
//       //console.debug(' *********************** file: ' + file)
//       routes.push(
//         {
//           path: '/page/' + fileName + '/list', component: ListPage
//         })
// })

export default noRoutes.map(route => {
  return {
    ...route,
    component: route.component
  };
});
