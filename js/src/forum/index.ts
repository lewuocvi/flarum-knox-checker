import app from 'flarum/forum/app';
import CustomPage from './components/CustomPage';

app.initializers.add('lewuocvi/flarum-knox-checker', () => {
    // Đăng ký route mới
    app.routes['knox-checker'] = { path: '/knox-checker', component: CustomPage };
    app.routes['deposit-money'] = { path: '/deposit-money', component: CustomPage };
    app.routes['check-balance'] = { path: '/money-balance', component: CustomPage };
    app.routes['checker-history'] = { path: '/checker-history', component: CustomPage };
});