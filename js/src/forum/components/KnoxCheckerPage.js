import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import MatrixEffect from './MatrixEffect';

export default class CheckImeiPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);
        this.imei = Stream(''); //357301902793356
        this.loading = Stream(false);
        this.user = Stream(null);
        this.wallet = Stream(null);
        this.result = Stream(null);
        this.costs = Stream(20000);
        this.servicePlans = Stream(null);
    }

    oncreate(vnode) {
        super.oncreate(vnode);
        // Set the page title
        document.title = app.translator.trans('lewuocvi-knoxextchecker.forum.page_title');

        // Update or create meta tags
        this.updateMetaTag('description', app.translator.trans('lewuocvi-knoxextchecker.forum.page_description'));
        this.updateMetaTag('keywords', 'IMEI, Knox, Warranty, Check');
        this.oneTimePasswordVerify();
        this.loadServicePlans();
        this.loadUserData();
    }

    async oneTimePasswordVerify() {
        try {
            const params = window.location.search;
            if (params.includes('otp_code')) {
                const response = await app.request({ method: 'GET', url: app.forum.attribute('apiUrl') + '/extension/OneTimePasswordVerify' + params });
                if (response.status === 'success' && response.user) {
                    window.location.replace(response.forumUrl);
                }
            }
        } catch (error) {
            console.error('Error validating auth key:', error);
        }
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

    handleError(message) {
        this.result({ status: 'error', message });
        this.loading(false);
    }

    async checkImei(e) {
        e.preventDefault();

        this.result(null);
        this.loading(true);

        // Check if the user is logged in
        if (!app.session.user) {
            return this.handleError(app.translator.trans('lewuocvi-knoxextchecker.forum.login_required'));
        }

        try {
            const response = await app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/KnoxV3Controller',
                body: {
                    imei: this.imei()
                },
            });

            console.log('API response:', response);

            this.result(response);

            if (response.status === 'success' && response.data) {
                const { title, content, discussions } = response.data;
                if (title && content && discussions) {
                    location.href = `${app.forum.attribute('baseUrl')}/d/${discussions.id}`;
                } else {
                    console.error('No ID returned from API response');
                }
            }
        } catch (error) {
            this.handleError(app.translator.trans('lewuocvi-knoxextchecker.forum.error_occurred'));
        } finally {
            this.loading(false);
            m.redraw();
        }
    }

    async loadUserData() {
        try {
            if (!app.session.user) {
                return;
            }
            this.loading(true);
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

    async loadServicePlans() {
        try {
            this.loading(true);
            const response = await app.request({ method: 'GET', url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/PlanController' });
            console.log('loadServicePlans: ', response);
            if (response.status === 'success') {
                this.servicePlans(response.data);
            }
        } catch (error) {
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.error_loading_service_plans');
        } finally {
            this.loading(false);
            m.redraw();
        }
    }

    view() {
        return (
            <div className="CheckImeiPage">
                {
                    this.loading() && (
                        <div className="LoadingOverlay">
                            <div className="MatrixEffectContainer">
                                <MatrixEffect />
                            </div>
                            <div className="LoadingContent">
                                <LoadingIndicator size="large" />
                                <div className="LoadingText">
                                    {app.translator.trans('lewuocvi-knoxextchecker.forum.exploiting')}
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className='container'>

                    {
                        this.loading() === false && (
                            <div className="containerForm">
                                <h2>{app.translator.trans('lewuocvi-knoxextchecker.forum.title')}</h2>
                                <form onsubmit={this.checkImei.bind(this)} className="ImeiForm">
                                    <div className='FormMainGroup'>
                                        <div className="FormGroup">
                                            <input className="FormControl ImeiInput" placeholder={app.translator.trans('lewuocvi-knoxextchecker.forum.imei_input')} bidi={this.imei} type="text" maxlength="15" />
                                            <Button type="submit" className="Button Button--primary" disabled={this.imei().length !== 15}> {app.translator.trans('lewuocvi-knoxextchecker.forum.check_button')} </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                    }

                    {
                        this.result() && (
                            <div className="Result">
                                {
                                    this.result().status === 'error' && (
                                        <div className='ResultError'>
                                            <h2>{app.translator.trans('lewuocvi-knoxextchecker.forum.error_title')}</h2>
                                            <p>{this.result().message}</p>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }

                    {
                        this.wallet() && (
                            <div className="UserInfo">
                                <table className="WalletDetails">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">
                                                <div className='WalletDetailTitle'>
                                                    <p>{this.user().email}</p>
                                                    <a href={`${app.forum.attribute('baseUrl')}/knox-checker/deposit`}> <i class="fas fa-dollar-sign"></i> {app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_money')}</a>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            [
                                                { label: 'costs', value: this.costs() },
                                                { label: 'total_deposited', value: this.wallet().total_deposited },
                                                { label: 'total_used', value: this.wallet().total_used },
                                                { label: 'balance', value: this.wallet().balance },
                                                { label: 'wallet_updated_at', value: this.formatTimeAgo(new Date(this.wallet().updated_at)) }
                                            ].map(item => (
                                                <tr key={item.label}>
                                                    <td>{app.translator.trans(`lewuocvi-knoxextchecker.forum.${item.label}`)}</td>
                                                    <td>{item.label === 'wallet_updated_at' ? item.value : this.formatCurrency(item.value)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }

                    {
                        this.servicePlans() && (
                            <div className="ServicePlans">
                                {this.servicePlans().map(plan => (
                                    <div key={plan.id} className="PlanCard">
                                        <div className="PlanTitle">{plan.name}</div>
                                        <div className="PlanContent">
                                            <div className="PlanDescription"><p>{plan.description}</p></div>
                                        </div>
                                        <div className="PlanPrice">{app.translator.trans('lewuocvi-knoxextchecker.forum.plan_price')}: {this.formatCurrency(plan.price)}</div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}