/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('lewuocvi/knoxextchecker', function () {
  console.log('[lewuocvi/knoxextchecker] Hello, forum and admin!');
});

/***/ }),

/***/ "./src/forum/components/DepositPage.js":
/*!*********************************************!*\
  !*** ./src/forum/components/DepositPage.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DepositPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6__);







var DepositPage = /*#__PURE__*/function (_Page) {
  function DepositPage() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(DepositPage, _Page);
  var _proto = DepositPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    this.depositAmount = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()('100000');
    this.loading = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(true);
    this.deposit = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()({});
    this.depositHistory = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()([]);
    this.currentPage = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(1);
    this.lastPage = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(1);
    this.baseUrl = app.forum.attribute('baseUrl');
    if (app.session.user) {
      this.generateQRCode();
      this.loadDepositHistory(this.currentPage());
    } else {
      location.href = this.baseUrl; // Redirect to the home page if not logged in
    }
  };
  _proto.oncreate = function oncreate(vnode) {
    _Page.prototype.oncreate.call(this, vnode);
    document.title = app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_page_title');
    this.updateMetaTag('description', app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_page_description'));
  };
  _proto.updateMetaTag = function updateMetaTag(name, content) {
    var metaTag = document.querySelector("meta[name=\"" + name + "\"]");
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = name;
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  };
  _proto.formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  _proto.submitHandler = /*#__PURE__*/function () {
    var _submitHandler = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            this.generateQRCode();
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function submitHandler(_x) {
      return _submitHandler.apply(this, arguments);
    }
    return submitHandler;
  }();
  _proto.generateQRCode = /*#__PURE__*/function () {
    var _generateQRCode = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
      var currentUser, response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            currentUser = app.session.user;
            if (currentUser) {
              _context2.next = 6;
              break;
            }
            this.loading(false);
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.not_logged_in');
            m.redraw();
            return _context2.abrupt("return");
          case 6:
            _context2.prev = 6;
            _context2.next = 9;
            return app.request({
              method: 'POST',
              url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/deposit',
              body: {
                deposit_amount: this.depositAmount()
              }
            });
          case 9:
            response = _context2.sent;
            if (!(response.status === 'success')) {
              _context2.next = 14;
              break;
            }
            this.deposit(response.deposit);
            _context2.next = 15;
            break;
          case 14:
            throw new Error(response.message || 'Unknown error occurred');
          case 15:
            _context2.next = 21;
            break;
          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](6);
            console.error('Error generating QR code:', _context2.t0);
            app.alerts.show({
              type: 'error'
            }, app.translator.trans('lewuocvi-knoxextchecker.forum.qr_generation_error'));
          case 21:
            _context2.prev = 21;
            this.loading(false);
            m.redraw();
            return _context2.finish(21);
          case 25:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[6, 17, 21, 25]]);
    }));
    function generateQRCode() {
      return _generateQRCode.apply(this, arguments);
    }
    return generateQRCode;
  }();
  _proto.loadDepositHistory = /*#__PURE__*/function () {
    var _loadDepositHistory = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3(page) {
      var _this = this;
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            if (page > 0 && page <= this.lastPage()) {
              this.currentPage(page);
              this.loading(true);
            }
            _context3.next = 4;
            return app.request({
              method: 'GET',
              url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/deposit',
              body: {
                action: 'history',
                page: this.currentPage(),
                limit: 10
              }
            });
          case 4:
            response = _context3.sent;
            if (response.status === 'success') {
              this.depositHistory(response.data.map(function (deposit) {
                return {
                  id: deposit.id,
                  date: _this.formatTimeAgo(new Date(deposit.created_at)),
                  amount: deposit.amount,
                  detail: deposit.content
                };
              }));
              this.currentPage(response.current_page);
              this.lastPage(response.last_page);
              setTimeout(function () {
                if (location.href.endsWith('/knox-checker/deposit')) _this.loadDepositHistory(page);
              }, 10000); // Update lịch sử đấu thêm thông tin sau mỗi 10s
            } else {
              console.error('Error in response:', response.message);
              app.alerts.show({
                type: 'error'
              }, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_load_error'));
            }
            _context3.next = 12;
            break;
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.error('Error loading deposit history:', _context3.t0);
            app.alerts.show({
              type: 'error'
            }, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_load_error'));
          case 12:
            _context3.prev = 12;
            this.loading(false); // Kết thúc hiển thị loading
            m.redraw();
            return _context3.finish(12);
          case 16:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[0, 8, 12, 16]]);
    }));
    function loadDepositHistory(_x2) {
      return _loadDepositHistory.apply(this, arguments);
    }
    return loadDepositHistory;
  }();
  _proto.formatTimeAgo = function formatTimeAgo(date) {
    var now = new Date();
    var diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.just_now');
    }
    var diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.minutes_ago', {
        count: diffInMinutes
      });
    }
    var diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.hours_ago', {
        count: diffInHours
      });
    }
    return date.toLocaleString();
  };
  _proto.view = function view() {
    var _this2 = this;
    console.log('Deposit history:', this.depositHistory());
    return m("div", {
      className: "DepositPage"
    }, this.loading() && m("div", {
      className: "LoadingOverlay"
    }, m((flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6___default()), {
      size: "large"
    })), m("div", {
      className: "container"
    }, m("div", {
      className: "containerForm"
    }, m("h2", null, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_title')), m("form", {
      onsubmit: this.submitHandler.bind(this),
      className: "DepositForm"
    }, m("div", {
      className: "FormGroup"
    }, m("div", {
      className: "PresetButtons"
    }, [100000, 150000, 200000, 300000, 500000].map(function (amount) {
      return m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
        key: amount,
        className: "Button Button--secondary PresetButton",
        onclick: function onclick() {
          return _this2.depositAmount(amount.toString());
        }
      }, amount.toLocaleString());
    })), m("div", {
      className: "InputButtonGroup"
    }, m("input", {
      className: "FormControl AmountInput",
      placeholder: app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_amount_input'),
      bidi: this.depositAmount,
      type: "number",
      min: "1"
    }), m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      type: "submit",
      className: "Button Button--primary",
      disabled: !this.depositAmount() || this.depositAmount() <= 99000
    }, app.translator.trans('lewuocvi-knoxextchecker.forum.generate_qr_button'))))), this.deposit().qrcode_url && m("div", {
      className: "QRCodeContainer"
    }, m("div", {
      className: "DepositContainer"
    }, m("p", {
      className: "DepositContent"
    }, app.translator.trans('lewuocvi-knoxextchecker.forum.calculate_fee_amount'), ": ", this.formatCurrency(this.deposit().calculate_fee))), m("img", {
      src: this.deposit().qrcode_url,
      alt: "QR Code for deposit"
    }), m("h4", null, app.translator.trans('lewuocvi-knoxextchecker.forum.qr_code_title')), m("div", {
      className: "DepositContainer"
    }, m("p", {
      className: "DepositContent"
    }, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_content'), ": ", this.deposit().content), m("p", {
      className: "depositAmount"
    }, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_amount'), ": ", this.formatCurrency(this.deposit().amount))), m("p", {
      className: "DepositMessage"
    }, this.deposit().message))), m("div", {
      className: "DepositHistory"
    }, m("h2", null, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_title')), m("table", {
      className: "DepositHistoryTable"
    }, m("thead", null, m("tr", null, m("th", null, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_date')), m("th", null, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_amount')), m("th", null, app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_history_detail')))), m("tbody", null, this.depositHistory().length === 0 ? m("tr", null, m("td", {
      colSpan: "3"
    }, app.translator.trans('lewuocvi-knoxextchecker.forum.no_deposit_history'))) : this.depositHistory().map(function (deposit) {
      return m("tr", {
        key: deposit.id
      }, m("td", null, deposit.date), m("td", null, _this2.formatCurrency(deposit.amount)), m("td", null, deposit.detail));
    }))), m("div", {
      className: "Pagination"
    }, Array.from({
      length: this.lastPage()
    }, function (_, i) {
      return i + 1;
    }).map(function (page) {
      return m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
        key: page,
        className: "Button " + (_this2.currentPage() === page ? 'Button--primary' : 'Button--secondary'),
        onclick: function onclick() {
          return _this2.loadDepositHistory(page);
        }
      }, page);
    })))));
  };
  return DepositPage;
}((flarum_components_Page__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/KnoxCheckerPage.js":
/*!*************************************************!*\
  !*** ./src/forum/components/KnoxCheckerPage.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckImeiPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _MatrixEffect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MatrixEffect */ "./src/forum/components/MatrixEffect.js");








var CheckImeiPage = /*#__PURE__*/function (_Page) {
  function CheckImeiPage() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(CheckImeiPage, _Page);
  var _proto = CheckImeiPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    this.imei = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(''); //357301902793356
    this.loading = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(false);
    this.user = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(null);
    this.wallet = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(null);
    this.result = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(null);
    this.costs = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(20000);
    this.servicePlans = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(null);
  };
  _proto.oncreate = function oncreate(vnode) {
    _Page.prototype.oncreate.call(this, vnode);
    // Set the page title
    document.title = app.translator.trans('lewuocvi-knoxextchecker.forum.page_title');

    // Update or create meta tags
    this.updateMetaTag('description', app.translator.trans('lewuocvi-knoxextchecker.forum.page_description'));
    this.updateMetaTag('keywords', 'IMEI, Knox, Warranty, Check');
    this.oneTimePasswordVerify();
    this.loadServicePlans();
    this.loadUserData();
  };
  _proto.oneTimePasswordVerify = /*#__PURE__*/function () {
    var _oneTimePasswordVerify = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var params, response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            params = window.location.search;
            if (!params.includes('otp_code')) {
              _context.next = 7;
              break;
            }
            _context.next = 5;
            return app.request({
              method: 'GET',
              url: app.forum.attribute('apiUrl') + '/extension/OneTimePasswordVerify' + params
            });
          case 5:
            response = _context.sent;
            if (response.status === 'success' && response.user) {
              window.location.replace(response.forumUrl);
            }
          case 7:
            _context.next = 12;
            break;
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.error('Error validating auth key:', _context.t0);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 9]]);
    }));
    function oneTimePasswordVerify() {
      return _oneTimePasswordVerify.apply(this, arguments);
    }
    return oneTimePasswordVerify;
  }();
  _proto.updateMetaTag = function updateMetaTag(name, content) {
    var metaTag = document.querySelector("meta[name=\"" + name + "\"]");
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = name;
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  };
  _proto.formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  _proto.formatTimeAgo = function formatTimeAgo(date) {
    var now = new Date();
    var diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.just_now');
    }
    var diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.minutes_ago', {
        count: diffInMinutes
      });
    }
    var diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.hours_ago', {
        count: diffInHours
      });
    }
    return date.toLocaleString();
  };
  _proto.handleError = function handleError(message) {
    this.result({
      status: 'error',
      message: message
    });
    this.loading(false);
  };
  _proto.checkImei = /*#__PURE__*/function () {
    var _checkImei = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(e) {
      var response, _response$data, title, content, discussions;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            this.result(null);
            this.loading(true);

            // Check if the user is logged in
            if (app.session.user) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("return", this.handleError(app.translator.trans('lewuocvi-knoxextchecker.forum.login_required')));
          case 5:
            _context2.prev = 5;
            _context2.next = 8;
            return app.request({
              method: 'POST',
              url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/KnoxV3Controller',
              body: {
                imei: this.imei()
              }
            });
          case 8:
            response = _context2.sent;
            console.log('API response:', response);
            this.result(response);
            if (response.status === 'success' && response.data) {
              _response$data = response.data, title = _response$data.title, content = _response$data.content, discussions = _response$data.discussions;
              if (title && content && discussions) {
                location.href = app.forum.attribute('baseUrl') + "/d/" + discussions.id;
              } else {
                console.error('No ID returned from API response');
              }
            }
            _context2.next = 17;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](5);
            this.handleError(app.translator.trans('lewuocvi-knoxextchecker.forum.error_occurred'));
          case 17:
            _context2.prev = 17;
            this.loading(false);
            m.redraw();
            return _context2.finish(17);
          case 21:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[5, 14, 17, 21]]);
    }));
    function checkImei(_x) {
      return _checkImei.apply(this, arguments);
    }
    return checkImei;
  }();
  _proto.loadUserData = /*#__PURE__*/function () {
    var _loadUserData = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3() {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            if (app.session.user) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return");
          case 3:
            this.loading(true);
            _context3.next = 6;
            return app.request({
              method: 'GET',
              url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/user'
            });
          case 6:
            response = _context3.sent;
            if (response.status === 'success') {
              this.user(response.user);
              this.wallet(response.wallet);
              this.costs(response.costs_service);
            }
            _context3.next = 13;
            break;
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.error_loading_user_data');
          case 13:
            _context3.prev = 13;
            this.loading(false);
            m.redraw();
            return _context3.finish(13);
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[0, 10, 13, 17]]);
    }));
    function loadUserData() {
      return _loadUserData.apply(this, arguments);
    }
    return loadUserData;
  }();
  _proto.loadServicePlans = /*#__PURE__*/function () {
    var _loadServicePlans = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee4() {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            this.loading(true);
            _context4.next = 4;
            return app.request({
              method: 'GET',
              url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/PlanController'
            });
          case 4:
            response = _context4.sent;
            console.log('loadServicePlans: ', response);
            if (response.status === 'success') {
              this.servicePlans(response.data);
            }
            _context4.next = 12;
            break;
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.error_loading_service_plans');
          case 12:
            _context4.prev = 12;
            this.loading(false);
            m.redraw();
            return _context4.finish(12);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[0, 9, 12, 16]]);
    }));
    function loadServicePlans() {
      return _loadServicePlans.apply(this, arguments);
    }
    return loadServicePlans;
  }();
  _proto.view = function view() {
    var _this = this;
    return m("div", {
      className: "CheckImeiPage"
    }, this.loading() && m("div", {
      className: "LoadingOverlay"
    }, m("div", {
      className: "MatrixEffectContainer"
    }, m(_MatrixEffect__WEBPACK_IMPORTED_MODULE_7__["default"], null)), m("div", {
      className: "LoadingContent"
    }, m((flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6___default()), {
      size: "large"
    }), m("div", {
      className: "LoadingText"
    }, app.translator.trans('lewuocvi-knoxextchecker.forum.exploiting')))), m("div", {
      className: "container"
    }, this.loading() === false && m("div", {
      className: "containerForm"
    }, m("h2", null, app.translator.trans('lewuocvi-knoxextchecker.forum.title')), m("form", {
      onsubmit: this.checkImei.bind(this),
      className: "ImeiForm"
    }, m("div", {
      className: "FormMainGroup"
    }, m("div", {
      className: "FormGroup"
    }, m("input", {
      className: "FormControl ImeiInput",
      placeholder: app.translator.trans('lewuocvi-knoxextchecker.forum.imei_input'),
      bidi: this.imei,
      type: "text",
      maxlength: "15"
    }), m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      type: "submit",
      className: "Button Button--primary",
      disabled: this.imei().length !== 15
    }, " ", app.translator.trans('lewuocvi-knoxextchecker.forum.check_button'), " "))))), this.result() && m("div", {
      className: "Result"
    }, this.result().status === 'error' && m("div", {
      className: "ResultError"
    }, m("h2", null, app.translator.trans('lewuocvi-knoxextchecker.forum.error_title')), m("p", null, this.result().message))), this.wallet() && m("div", {
      className: "UserInfo"
    }, m("table", {
      className: "WalletDetails"
    }, m("thead", null, m("tr", null, m("th", {
      colSpan: "2"
    }, m("div", {
      className: "WalletDetailTitle"
    }, m("p", null, this.user().email), m("a", {
      href: app.forum.attribute('baseUrl') + "/knox-checker/deposit"
    }, " ", m("i", {
      "class": "fas fa-dollar-sign"
    }), " ", app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_money')))))), m("tbody", null, [{
      label: 'costs',
      value: this.costs()
    }, {
      label: 'total_deposited',
      value: this.wallet().total_deposited
    }, {
      label: 'total_used',
      value: this.wallet().total_used
    }, {
      label: 'balance',
      value: this.wallet().balance
    }, {
      label: 'wallet_updated_at',
      value: this.formatTimeAgo(new Date(this.wallet().updated_at))
    }].map(function (item) {
      return m("tr", {
        key: item.label
      }, m("td", null, app.translator.trans("lewuocvi-knoxextchecker.forum." + item.label)), m("td", null, item.label === 'wallet_updated_at' ? item.value : _this.formatCurrency(item.value)));
    })))), this.servicePlans() && m("div", {
      className: "ServicePlans"
    }, this.servicePlans().map(function (plan) {
      return m("div", {
        key: plan.id,
        className: "PlanCard"
      }, m("div", {
        className: "PlanTitle"
      }, plan.name), m("div", {
        className: "PlanContent"
      }, m("div", {
        className: "PlanDescription"
      }, m("p", null, plan.description))), m("div", {
        className: "PlanPrice"
      }, app.translator.trans('lewuocvi-knoxextchecker.forum.plan_price'), ": ", _this.formatCurrency(plan.price)));
    }))));
  };
  return CheckImeiPage;
}((flarum_components_Page__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/MatrixEffect.js":
/*!**********************************************!*\
  !*** ./src/forum/components/MatrixEffect.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MatrixEffect)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);


var MatrixEffect = /*#__PURE__*/function (_Component) {
  function MatrixEffect() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MatrixEffect, _Component);
  var _proto = MatrixEffect.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    this.canvas = null;
    this.ctx = null;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.fontSize = 10;
    this.columns = 0;
    this.drops = [];
  };
  _proto.oncreate = function oncreate(vnode) {
    _Component.prototype.oncreate.call(this, vnode);
    this.canvas = this.element;
    this.ctx = this.canvas.getContext('2d');
    this.initializeMatrix();
    this.animate();

    // Add resize event listener
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  };
  _proto.onremove = function onremove() {
    _Component.prototype.onremove.call(this);
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  };
  _proto.resizeCanvas = function resizeCanvas() {
    this.initializeMatrix();
  };
  _proto.initializeMatrix = function initializeMatrix() {
    this.canvas.width = this.element.offsetWidth;
    this.canvas.height = this.element.offsetHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = new Array(this.columns).fill(1);
  };
  _proto.animate = function animate() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#4D698E';
    this.ctx.font = this.fontSize + 'px monospace';
    for (var i = 0; i < this.drops.length; i++) {
      var text = this.chars[Math.floor(Math.random() * this.chars.length)];
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    requestAnimationFrame(this.animate.bind(this));
  };
  _proto.view = function view() {
    return m("canvas", null);
  };
  return MatrixEffect;
}((flarum_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/UserPage.js":
/*!******************************************!*\
  !*** ./src/forum/components/UserPage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5__);






var UserPage = /*#__PURE__*/function (_Page) {
  function UserPage() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(UserPage, _Page);
  var _proto = UserPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    this.loading = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default()(true);
    this.user = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default()(null);
    this.wallet = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default()(null);
    this.costs = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default()(20000);
    this.error = null;
    if (app.session.user) {
      this.loadUserData();
    } else {
      location.href = this.baseUrl; // Redirect to the home page if not logged in
    }
  };
  _proto.oncreate = function oncreate(vnode) {
    _Page.prototype.oncreate.call(this, vnode);
    document.title = app.translator.trans('lewuocvi-knoxextchecker.forum.user_page_title');
    this.updateMetaTag('description', app.translator.trans('lewuocvi-knoxextchecker.forum.user_page_description'));
  };
  _proto.updateMetaTag = function updateMetaTag(name, content) {
    var metaTag = document.querySelector("meta[name=\"" + name + "\"]");
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = name;
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  };
  _proto.loadUserData = /*#__PURE__*/function () {
    var _loadUserData = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return app.request({
              method: 'GET',
              url: app.forum.attribute('apiUrl') + '/extension/proxy?url=https://samsungssl.com/extension/user'
            });
          case 3:
            response = _context.sent;
            if (response.status === 'success') {
              this.user(response.user);
              this.wallet(response.wallet);
              this.costs(response.costs_service);
            }
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            this.error = app.translator.trans('lewuocvi-knoxextchecker.forum.error_loading_user_data');
          case 10:
            _context.prev = 10;
            this.loading(false);
            m.redraw();
            return _context.finish(10);
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 7, 10, 14]]);
    }));
    function loadUserData() {
      return _loadUserData.apply(this, arguments);
    }
    return loadUserData;
  }();
  _proto.getBaseUrl = function getBaseUrl() {
    return app.forum.attribute('baseUrl');
  };
  _proto.formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  _proto.formatTimeAgo = function formatTimeAgo(date) {
    var now = new Date();
    var diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.just_now');
    }
    var diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.minutes_ago', {
        count: diffInMinutes
      });
    }
    var diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return app.translator.trans('lewuocvi-knoxextchecker.forum.hours_ago', {
        count: diffInHours
      });
    }
    return date.toLocaleString();
  };
  _proto.view = function view() {
    return m("div", {
      className: "UserPage"
    }, this.loading() && m("div", {
      className: "LoadingOverlay"
    }, m((flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5___default()), {
      size: "large"
    })), m("div", {
      className: "container"
    }, m("h2", null, app.translator.trans('lewuocvi-knoxextchecker.forum.user_page_title')), m("div", {
      className: "UserInfo"
    }, this.user() && m("table", {
      className: "UserDetails"
    }, m("thead", null, m("tr", null, m("th", {
      colSpan: "2"
    }, app.translator.trans('lewuocvi-knoxextchecker.forum.user_profile')))), m("tbody", null, [{
      label: 'name',
      value: this.user().name
    }, {
      label: 'email',
      value: this.user().email
    }, {
      label: 'user_id',
      value: this.user().id
    }, {
      label: 'created_at',
      value: this.formatTimeAgo(new Date(this.user().created_at))
    }, {
      label: 'updated_at',
      value: this.formatTimeAgo(new Date(this.user().updated_at))
    }].map(function (attr) {
      return m("tr", {
        key: attr.label
      }, m("td", null, app.translator.trans("lewuocvi-knoxextchecker.forum." + attr.label)), m("td", null, attr.value));
    }))), this.wallet() && m("table", {
      className: "WalletDetails"
    }, m("thead", null, m("tr", null, m("th", {
      colSpan: "2"
    }, m("div", {
      className: "WalletDetailTitle"
    }, m("p", null, app.translator.trans('lewuocvi-knoxextchecker.forum.wallet_info')), m("a", {
      href: this.getBaseUrl() + "/knox-checker/deposit"
    }, " ", m("i", {
      className: "fas fa-dollar-sign"
    }), " ", app.translator.trans('lewuocvi-knoxextchecker.forum.deposit_money')))))), m("tbody", null, [{
      label: 'costs',
      value: this.formatCurrency(this.costs())
    }, {
      label: 'total_deposited',
      value: this.formatCurrency(this.wallet().total_deposited)
    }, {
      label: 'total_used',
      value: this.formatCurrency(this.wallet().total_used)
    }, {
      label: 'balance',
      value: this.formatCurrency(this.wallet().balance)
    }, {
      label: 'wallet_updated_at',
      value: this.formatTimeAgo(new Date(this.wallet().updated_at))
    }].map(function (attr) {
      return m("tr", {
        key: attr.label
      }, m("td", null, app.translator.trans("lewuocvi-knoxextchecker.forum." + attr.label)), m("td", null, attr.value));
    }))))));
  };
  return UserPage;
}((flarum_components_Page__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/index.ts":
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_KnoxCheckerPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/KnoxCheckerPage */ "./src/forum/components/KnoxCheckerPage.js");
/* harmony import */ var _components_UserPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/UserPage */ "./src/forum/components/UserPage.js");
/* harmony import */ var _components_DepositPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/DepositPage */ "./src/forum/components/DepositPage.js");




flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('lewuocvi/flarum-knox-checker', function () {
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['knox-checker-page'] = {
    path: '/knox-checker',
    component: _components_KnoxCheckerPage__WEBPACK_IMPORTED_MODULE_1__["default"]
  };
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['knox-checker/user-page'] = {
    path: '/knox-checker/user',
    component: _components_UserPage__WEBPACK_IMPORTED_MODULE_2__["default"]
  };
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['knox-checker/deposit-page'] = {
    path: '/knox-checker/deposit',
    component: _components_DepositPage__WEBPACK_IMPORTED_MODULE_3__["default"]
  };
});

/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['utils/Stream'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map