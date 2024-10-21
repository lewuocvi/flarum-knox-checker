import Page from 'flarum/components/Page';
import Stream from 'flarum/utils/Stream';
import LoadingIndicator from 'flarum/components/LoadingIndicator';

export default class UserPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);
        this.loading = Stream(true);
        this.user = Stream(null);
        this.wallet = Stream(null);
        this.costs = Stream(20000);
        this.error = null;

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
            const response = await app.request({ method: 'GET', url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/user' });
            if (response.status === 'success') {
                this.user(response.user);
                this.wallet(response.wallet);
                this.costs(response.costs_service);
            }
        } catch (error) {
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.error_loading_user_data');
        } finally {
            this.loading(false);
            m.redraw();
        }
    }

    getBaseUrl() {
        return app.forum.attribute('baseUrl');
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

        return (
            <div className="UserPage">

                {this.loading() && (
                    <div className="LoadingOverlay">
                        <LoadingIndicator size="large" />
                    </div>
                )}

                <div className="container">
                    <h2>{app.translator.trans('lewuocvi-knoxextchecker.forum.user_page_title')}</h2>
                    <div className="UserInfo">
                        {
                            this.user() && (
                                <table className="UserDetails">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">{app.translator.trans('lewuocvi-knoxextchecker.forum.user_profile')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { label: 'name', value: this.user().name },
                                            { label: 'email', value: this.user().email },
                                            { label: 'user_id', value: this.user().id },
                                            { label: 'created_at', value: this.formatTimeAgo(new Date(this.user().created_at)) },
                                            { label: 'updated_at', value: this.formatTimeAgo(new Date(this.user().updated_at)) }
                                        ].map(attr => (
                                            <tr key={attr.label}>
                                                <td>{app.translator.trans(`lewuocvi-knoxextchecker.forum.${attr.label}`)}</td>
                                                <td>{attr.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        }

                        {
                            this.wallet() && (
                                <table className="WalletDetails">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">
                                                <div className='WalletDetailTitle'>
                                                    <p>{app.translator.trans('lewuocvi-knoxextchecker.forum.wallet_info')}</p>
                                                    <a href={`${this.getBaseUrl()}/knox-checker/deposit`}> <i className="fas fa-dollar-sign"></i> {app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_money')}</a>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { label: 'costs', value: this.formatCurrency(this.costs()) },
                                            { label: 'total_deposited', value: this.formatCurrency(this.wallet().total_deposited) },
                                            { label: 'total_used', value: this.formatCurrency(this.wallet().total_used) },
                                            { label: 'balance', value: this.formatCurrency(this.wallet().balance) },
                                            { label: 'wallet_updated_at', value: this.formatTimeAgo(new Date(this.wallet().updated_at)) }
                                        ].map(attr => (
                                            <tr key={attr.label}>
                                                <td>{app.translator.trans(`lewuocvi-knoxextchecker.forum.${attr.label}`)}</td>
                                                <td>{attr.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}