import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';
import LoadingIndicator from 'flarum/components/LoadingIndicator';

export default class CheckImeiPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);
        this.imei = Stream('357301902793356'); //357301902793356
        this.result = Stream(null);
        this.loading = Stream(false);
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

    clearPage(e) {
        e.preventDefault();
        this.imei('');
        this.result(null);
        this.loading(false);
        m.redraw();
    }

    view() {
        return (
            <div className="CheckImeiPage">
                {
                    this.loading() && (
                        <div className="LoadingOverlay">
                            <LoadingIndicator size="large" />
                        </div>
                    )
                }
                <div className='container'>
                    {
                        this.result() === null && (
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

                    <div className="containerResult">
                        {
                            this.result() && (
                                <div className="Result">

                                    <div>
                                        {
                                            this.result().status === 'success' && (
                                                <div className='ResultSuccess'>
                                                    <h2>{app.translator.trans('lewuocvi-knoxextchecker.forum.knox_result_title')}</h2>
                                                    <table className="ResultTable">
                                                        <tbody>
                                                            <tr>
                                                                <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.knox_status')}:</td>
                                                                <td>{this.result().registered ? app.translator.trans('lewuocvi-knoxextchecker.forum.registered_knox') : app.translator.trans('lewuocvi-knoxextchecker.forum.unregistered_knox')}</td>
                                                            </tr>
                                                            {
                                                                this.result().generalInfo && (<tr>
                                                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.company_name')}:</td>
                                                                    <td>{this.result().generalInfo.companyName}</td>
                                                                </tr>)
                                                            }
                                                            {
                                                                this.result().generalInfo && (<tr>
                                                                    <td>{app.translator.trans('lewuocvi-knoxextchecker.forum.device_status')}:</td>
                                                                    <td>{this.result().generalInfo.deviceState}</td>
                                                                </tr>)
                                                            }
                                                            <tr>
                                                                <td colSpan="2">{this.result().message}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className='clearPage'>
                                                        <a href="javascript:void(0)" onclick={this.clearPage.bind(this)}>{app.translator.trans('lewuocvi-knoxextchecker.forum.clear_page')}</a>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

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
            </div>
        );
    }

    async checkImei(e) {
        e.preventDefault();
        this.result(null);
        this.loading(true);

        try {
            const response = await app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/knox-checker',
                body: {
                    imei: this.imei()
                },
            });

            console.log('API response:', response);
            this.result(response);
        } catch (error) {
            console.error('Error:', error);
            this.result({ status: 'error', message: app.translator.trans('lewuocvi-knoxextchecker.forum.error_title') });
        } finally {
            this.loading(false);
            console.log('Loading state:', this.loading());
            m.redraw();
        }
    }
}