import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import MatrixEffect from './MatrixEffect';

export default class CheckImeiPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);
        this.imei = Stream('357301902793356'); //357301902793356
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

    initLoadingText() {
        const loadingText = this.element.querySelector('.LoadingText');
        if (!loadingText) return;

        const text = app.translator.trans('lewuocvi-knoxextchecker.forum.exploiting');
        let index = 0;
        const typingSpeed = 100; // Milliseconds per character
        const pauseBetweenLoops = 1000; // Pause before restarting

        function typeNextCharacter() {
            if (index < text.length) {
                loadingText.textContent += text[index];
                index++;
                setTimeout(typeNextCharacter, typingSpeed);
            } else {
                // When finished typing, pause then start over
                setTimeout(() => {
                    loadingText.textContent = '';
                    index = 0;
                    typeNextCharacter();
                }, pauseBetweenLoops);
            }
        }

        // Start the typing effect
        typeNextCharacter();
    }


    async checkImei(e) {
        e.preventDefault();

        // Check if the user is logged in
        if (!app.session.user) {
            this.result({
                status: 'error',
                message: app.translator.trans('lewuocvi-knoxextchecker.forum.login_required')
            });
            m.redraw();
            return;
        }

        this.result(null);
        this.loading(true);

        setTimeout(() => {
            this.initLoadingText();
        }, 3);

        try {
            const response = await app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/knox-checker',
                body: {
                    imei: this.imei()
                },
            });

            this.result(response.data);

            console.log('API response:', response);

            if (response && response.data) {
                location.href = `${app.forum.attribute('baseUrl')}/d/${response.data.id}`;
            } else {
                console.error('Invalid response ID');
            }
        } catch (error) {
            console.error('Error:', error);
            this.result({ status: 'error', message: app.translator.trans('lewuocvi-knoxextchecker.forum.error_title') });
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
                        this.loading() === false && this.result() === null && (
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
                            <div className="containerResult">

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
                            </div>
                        )
                    }

                </div>

            </div>
        );
    }
}