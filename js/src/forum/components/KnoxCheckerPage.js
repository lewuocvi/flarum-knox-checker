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
        this.result = Stream(null);
    }

    oncreate(vnode) {
        super.oncreate(vnode);
        // Set the page title
        document.title = app.translator.trans('lewuocvi-knoxextchecker.forum.page_title');

        // Update or create meta tags
        this.updateMetaTag('description', app.translator.trans('lewuocvi-knoxextchecker.forum.page_description'));
        this.updateMetaTag('keywords', 'IMEI, Knox, Warranty, Check');
        this.requestAuthController();
    }

    getQuerystring() {
        return window.location.search;
    }

    async requestAuthController() {
        try {
            if (!this.getQuerystring().includes('otp_code')) {
                return;
            }
            const response = await app.request({ method: 'GET', url: app.forum.attribute('apiUrl') + '/extension/OneTimePasswordVerify' + this.getQuerystring() });
            if (response.status === 'success' && response.user) {
                window.location.replace(response.forumUrl);
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

    async checkImei(e) {
        e.preventDefault();

        this.result(null);
        this.loading(true);

        // Check if the user is logged in
        if (!app.session.user) {
            this.handleError(app.translator.trans('lewuocvi-knoxextchecker.forum.login_required'));
            return;
        }

        try {
            const response = await app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/knox-checker',
                body: {
                    imei: this.imei()
                },
            });

            console.log('API response:', response);

            this.result(response);

            if (response && response.id) {
                location.href = `${app.forum.attribute('baseUrl')}/d/${response.id}`;
            } else {
                console.error('No ID returned from API response');
            }
        } catch (error) {
            this.handleError(app.translator.trans('lewuocvi-knoxextchecker.forum.error_occurred'));
        } finally {
            this.loading(false);
            m.redraw();
        }
    }

    handleError(message) {
        this.result({ status: 'error', message });
        this.loading(false);
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

                </div>

            </div>
        );
    }
}