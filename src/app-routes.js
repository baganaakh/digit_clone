import { lazy } from 'react'
import Loadable from 'ui-component/Loadable';
// import {Home as HomeView} from "./views/landingPages";

const HomePage = Loadable(lazy(() => import('views/landingPages/Home')))
const CompanyPage = Loadable(lazy(() => import('views/supportingPages/Company')))

const ComRequest = Loadable(lazy(() => import('pages/admin/render/requests/com_request')))
const RequestDetail = Loadable(lazy(() => import('pages/admin/render/requests/com_request_detail')))
const AdminViewPage = Loadable(lazy(() => import('pages/admin/viewPage')))
const AdminListPage = Loadable(lazy(() => import('pages/admin/listPage')))
const AdminCrudPage = Loadable(lazy(() => import('pages/admin/crudPage')))
const AdminHomePage = Loadable(lazy(() => import('pages/admin')))

const ProductPage = Loadable(lazy(() => import('views/supportingPages/Products')))
const SearchSolutionPage = Loadable(lazy(() => import('views/supportingPages/SearchSolution')))
const SearchServicePage = Loadable(lazy(() => import('views/supportingPages/SearchService')))
const SearchCompanyPage = Loadable(lazy(() => import('views/supportingPages/SearchCompany')))
const Product = Loadable(lazy(() => import('views/supportingPages/Product')))
const ProfilePage = Loadable(lazy(() => import('views/supportingPages/Profile')))

const Article = Loadable(lazy(() => import('views/supportingPages/Article')))
const ArticleType = Loadable(lazy(() => import('views/supportingPages/ArticleType')))

const Privacy = Loadable(lazy(() => import('views/supportingPages/Privacy')))
const Review = Loadable(lazy(() => import('views/supportingPages/Review')))

//import appInfo from './app-info'

const routes = [
  { path: '/companies/:id', component: CompanyPage },
  { path: '/products/:entity/:id', component: ProductPage },
  { path: '/digital-solution', component: SearchSolutionPage },
  { path: '/digital-service', component: SearchServicePage },
  { path: '/digital-company', component: SearchCompanyPage },
  { path: '/product/:entity/:id', component: Product },
  { path: '/profile/:id', component: ProfilePage },
  { path: '/articles/:id', component: Article },
  { path: '/articles/articletype/:id', component: ArticleType },
  { path: '/reviewset', component: Privacy },
  { path: '/review', component: Review },
  { path: '/', component: HomePage },
  // Admin Pages
  { path: '/requests', component: ComRequest },
  { path: '/requests/:id', component: RequestDetail },
  { path: '/admin', component: AdminHomePage },
  { path: '/admin/:modelName/view/:Id', component: AdminViewPage },
  { path: '/admin/:modelName/list', component: AdminListPage },
  { path: '/admin/:modelName/edit/:Id', component: AdminCrudPage },
  { path: '/admin/:modelName/add', component: AdminCrudPage },

];

// appInfo.modules
//   .forEach(fileName => {
//       //console.debug(' *********************** file: ' + file)
//       routes.push(
//         {
//           path: '/page/' + fileName + '/list', component: ListPage
//         })
// })

export default routes.map(route => {
  return {
    ...route,
    component: route.component
  };
});
