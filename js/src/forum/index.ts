import app from 'flarum/forum/app';

import knoxCheckerPage from './components/KnoxCheckerPage';
import userPage from './components/UserPage';
import depositPage from './components/DepositPage';

app.initializers.add('lewuocvi/flarum-knox-checker', () => {
    app.routes['knox-checker-page'] = { path: '/knox-checker', component: knoxCheckerPage };
    app.routes['knox-checker/user-page'] = { path: '/knox-checker/user', component: userPage };
    app.routes['knox-checker/deposit-page'] = { path: '/knox-checker/deposit', component: depositPage };
});