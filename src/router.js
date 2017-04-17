import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MyContent from './components/MyContent';
import ArticleContent from './components/ArticleContent';

import JsPage from './components/pages/JsPage';
import NodePage from './components/pages/NodePage';
import PhpPage from './components/pages/PhpPage';
import EssayPage from './components/pages/EssayPage';

import AdminContainer from './components/admin/AdminContainer';
import AdminArticle from './components/admin/AdminArticle';
import AdminLabel from './components/admin/AdminLabel';
import AdminUsers from './components/admin/AdminUsers';
import AdminEditArticle from './components/admin/AdminEditArticle';
import AdminBanner from './components/admin/AdminBanner';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
         <IndexRoute component={MyContent} />
         <Route path='/main' component={MyContent} />
         <Route path='/main/js' component={JsPage} />
         <Route path='/main/node' component={NodePage} />
         <Route path='/main/php' component={PhpPage} />
         <Route path='/main/essay' component={EssayPage} />
         <Route path='/article/:id' component={ArticleContent} />
      </Route>
      <Route path='/admin' component={AdminContainer} >
         <Route path='/admin/article' component={AdminArticle} />
         <Route path='/admin/label' component={AdminLabel} />
         <Route path='/admin/users' component={AdminUsers} />
         <Route path='/admin/editart' component={AdminEditArticle} />
         <Route path='/admin/editart/:id' component={AdminEditArticle} />
         <Route path='/admin/banner' component={AdminBanner} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
