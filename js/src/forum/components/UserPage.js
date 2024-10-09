import Page from 'flarum/components/Page';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';

export default class UserPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);
        this.loading = true;
        this.user = null;
        this.error = null;
        this.loadUserData().catch(error => {
            console.error('Error in loadUserData:', error);
        });
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
        const currentUser = app.session.user;
        if (!currentUser) {
            this.loading = false;
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.not_logged_in');
            m.redraw();
            return;
        }

        try {
            const response = await app.request({ method: 'POST', url: app.forum.attribute('apiUrl') + '/knox-checker/user' });
            this.user = response;
            this.loading = false;
        } catch (error) {
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.error_loading_user_data');
            this.loading = false;
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

    view() {
        if (this.loading) {
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
                    <h1>{app.translator.trans('lewuocvi-knoxextchecker.forum.user_page_title')}</h1>
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
                                    <td>{new Date(user.created_at).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.updated_at')}</td>
                                    <td>{new Date(user.updated_at).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="WalletDetails">
                            <thead>
                                <tr>
                                    <th colSpan="2">{app.translator.trans('lewuocvi-knoxextchecker.forum.wallet_info')}</th>
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
                                    <td>{new Date(wallet.updated_at).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}