import Page from 'flarum/components/Page';
import LoadingIndicator from 'flarum/components/LoadingIndicator';

export default class UserPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);
        this.loading = Stream(true);
        this.user = null;
        this.error = null;
        this.baseUrl = app.forum.attribute('baseUrl');

        if (app.session.user) {
            this.loadUserData();
        }
        else {
            location.href = this.baseUrl; // Redirect to the home page if not logged in
        }
    }

    oncreate(vnode) {
        super.oncreate(vnode);
        document.title = app.translator.trans('lewuocvi-knoxextchecker.forum.user_page_title');
        this.updateMetaTag('description', app.translator.trans('lewuocvi-knoxextchecker.forum.user_page_description'));
    }

    updateMetaTag(name, content) {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.name = name;
            document.head.appendChild(metaTag);
        }
        metaTag.content = content;
    }

    async loadUserData() {
        try {
            this.user = await app.request({ method: 'POST', url: app.forum.attribute('apiUrl') + '/knox-checker/user' });
            this.loading(false);
        } catch (error) {
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.error_loading_user_data');
            this.loading(false);
            console.error('Error loading user data:', error);
        } finally {
            m.redraw();
        }
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return app.translator.trans('lewuocvi-knoxextchecker.forum.just_now');
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return app.translator.trans('lewuocvi-knoxextchecker.forum.minutes_ago', { count: diffInMinutes });
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return app.translator.trans('lewuocvi-knoxextchecker.forum.hours_ago', { count: diffInHours });
        }

        return date.toLocaleString();
    }

    view() {
        if (this.loading()) {
            return <LoadingIndicator />;
        }

        if (this.error) {
            return <div className="UserPage">{this.error}</div>;
        }

        if (!this.user || !this.user.user) {
            return <div className="UserPage">{app.translator.trans('lewuocvi-knoxextchecker.forum.no_user_data')}</div>;
        }

        const { user, status } = this.user;
        const { wallet } = user;

        return (
            <div className="UserPage">
                <div className="container">
                    <h2>{app.translator.trans('lewuocvi-knoxextchecker.forum.user_page_title')}</h2>
                    <div className="UserInfo">
                        <table className="UserDetails">
                            <thead>
                                <tr>
                                    <th colSpan="2">{app.translator.trans('lewuocvi-knoxextchecker.forum.user_profile')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.name')}</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.email')}</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.user_id')}</td>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.created_at')}</td>
                                    <td>{this.formatTimeAgo(new Date(user.created_at))}</td>
                                </tr>
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.updated_at')}</td>
                                    <td>{this.formatTimeAgo(new Date(user.updated_at))}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="WalletDetails">
                            <thead>
                                <tr>
                                    <th colSpan="2">
                                        <div className='WalletDetailTitle'>
                                            <p>{app.translator.trans('lewuocvi-knoxextchecker.forum.wallet_info')}</p>
                                            <a href={`${this.baseUrl}/knox-checker/deposit`}> <i class="fas fa-dollar-sign"></i> {app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_money')}</a>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.wallet_id')}</td>
                                    <td>{wallet.id}</td>
                                </tr> */}
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.total_deposited')}</td>
                                    <td>{this.formatCurrency(wallet.total_deposited)}</td>
                                </tr>
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.total_used')}</td>
                                    <td>{this.formatCurrency(wallet.total_used)}</td>
                                </tr>
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.balance')}</td>
                                    <td>{this.formatCurrency(wallet.balance)}</td>
                                </tr>
                                {/* <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.wallet_created_at')}</td>
                                    <td>{new Date(wallet.created_at).toLocaleString()}</td>
                                </tr> */}
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.wallet_updated_at')}</td>
                                    <td>{this.formatTimeAgo(new Date(wallet.updated_at))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}