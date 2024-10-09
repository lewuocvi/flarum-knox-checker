import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';
import LoadingIndicator from 'flarum/components/LoadingIndicator';

export default class DepositPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);
        this.depositAmount = Stream('100000');
        this.loading = Stream(false);
        this.deposit = Stream({});
        this.depositHistory = Stream([]);
        this.currentPage = Stream(1);
        this.lastPage = Stream(1);
        this.generateQRCode();
        this.loadDepositHistory();
    }

    oncreate(vnode) {
        super.oncreate(vnode);
        document.title = app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_page_title');
        this.updateMetaTag('description', app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_page_description'));
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

    view() {

        console.log('Deposit history:', this.depositHistory());

        return (
            <div className="DepositPage">

                {this.loading() && (
                    <div className="LoadingOverlay">
                        <LoadingIndicator size="large" />
                    </div>
                )}

                <div className='container'>

                    <div className="containerForm">
                        <h2>{app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_title')}</h2>
                        <form onsubmit={this.submitHandler.bind(this)} className="DepositForm">
                            <div className='FormGroup'>
                                <div className="PresetButtons">
                                    {[100000, 150000, 200000, 300000, 500000].map((amount) => (
                                        <Button
                                            key={amount}
                                            className="Button Button--secondary PresetButton"
                                            onclick={() => this.depositAmount(amount.toString())}
                                        >
                                            {amount.toLocaleString()}
                                        </Button>
                                    ))}
                                </div>
                                <div className="InputButtonGroup">
                                    <input
                                        className="FormControl AmountInput"
                                        placeholder={app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_amount_input')}
                                        bidi={this.depositAmount}
                                        type="number"
                                        min="1"
                                    />
                                    <Button
                                        type="submit"
                                        className="Button Button--primary"
                                        disabled={!this.depositAmount() || this.depositAmount() <= 99000}
                                    >
                                        {app.translator.trans('lewuocvi-knoxextchecker.forum.generate_qr_button')}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {this.deposit().qrcode_url && (
                            <div className="QRCodeContainer">
                                <h3>{app.translator.trans('lewuocvi-knoxextchecker.forum.qr_code_title')}</h3>
                                <img src={this.deposit().qrcode_url} alt="QR Code for deposit" />
                                <div className='DepositContainer'>
                                    <p className="DepositContent">
                                        {app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_content')}: {this.deposit().content}
                                    </p>
                                    <p className="depositAmount">
                                        {app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_amount')}: {this.formatCurrency(this.deposit().amount)}
                                    </p>
                                </div>
                                <p className="DepositMessage">{this.deposit().message}</p>
                            </div>
                        )}
                    </div>

                    <div className="DepositHistory">
                        <h2>{app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_title')}</h2>
                        <table className="DepositHistoryTable">
                            <thead>
                                <tr>
                                    <th>{app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_date')}</th>
                                    <th>{app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_amount')}</th>
                                    <th>{app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_detail')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.depositHistory().length === 0 ? (
                                    <tr>
                                        <td colSpan="3">{app.translator.trans('lewuocvi-knoxextchecker.forum.no_deposit_history')}</td>
                                    </tr>
                                ) : (
                                    this.depositHistory().map((deposit) => (
                                        <tr key={deposit.id}>
                                            <td>{deposit.date}</td>
                                            <td>{this.formatCurrency(deposit.amount)}</td>
                                            <td>{deposit.detail}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    async submitHandler(e) {
        e.preventDefault();

        this.generateQRCode();
    }

    async generateQRCode() {
        this.loading(true);

        try {
            const response = await app.request({
                method: 'POST',
                url: `${app.forum.attribute('apiUrl')}/knox-checker/deposit`,
                body: { action: 'generate', deposit_amount: this.depositAmount() }
            });

            if (response.status === 'success') {

                const { qrcode_url, content, message, amount } = response.deposit;

                this.deposit({ qrcode_url, content, message, amount });

            } else {
                throw new Error(response.message || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
            app.alerts.show(
                { type: 'error' },
                app.translator.trans('lewuocvi-knoxextchecker.forum.qr_generation_error')
            );
        } finally {
            this.loading(false);
            m.redraw();
        }
    }

    async loadDepositHistory() {
        this.loading(true); // Bắt đầu hiển thị loading
        try {
            const response = await app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/knox-checker/deposit',
                body: { action: 'history', page: this.currentPage, limit: 10 }
            });

            if (response.status === 'success') {
                this.depositHistory(response.data.map(deposit => ({
                    id: deposit.id,
                    date: new Date(deposit.created_at).toLocaleString(),
                    amount: deposit.amount,
                    detail: deposit.description
                })));

                this.currentPage = response.current_page;
                this.lastPage = response.last_page;

            } else {
                console.error('Error in response:', response.message);
                app.alerts.show({ type: 'error' }, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_load_error'));
            }
        } catch (error) {
            console.error('Error loading deposit history:', error);
            app.alerts.show({ type: 'error' }, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_load_error'));
        } finally {
            this.loading(false); // Kết thúc hiển thị loading
            m.redraw();
        }
    }
}