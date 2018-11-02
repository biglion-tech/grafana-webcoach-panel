'use strict';

System.register(['app/plugins/sdk', 'lodash', './css/webcoach-panel.css!'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, _, _createClass, WebcoachAdviceListPanelCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_cssWebcoachPanelCss) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('WebcoachAdviceListPanelCtrl', WebcoachAdviceListPanelCtrl = function (_MetricsPanelCtrl) {
        _inherits(WebcoachAdviceListPanelCtrl, _MetricsPanelCtrl);

        function WebcoachAdviceListPanelCtrl($scope, $injector) {
          _classCallCheck(this, WebcoachAdviceListPanelCtrl);

          var _this = _possibleConstructorReturn(this, (WebcoachAdviceListPanelCtrl.__proto__ || Object.getPrototypeOf(WebcoachAdviceListPanelCtrl)).call(this, $scope, $injector));

          _.defaultsDeep(_this.panel, {
            bgColor: null
          });

          _this.scrollable = true;
          /**
           * @property {array} adviceList - full advices list
           */
          _this.adviceList = [];
          /**
           * @property {array} viewAdviceList - filtered advices for view
           */
          _this.viewAdviceList = [];

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('panel-teardown', _this.onPanelTeardown.bind(_this));
          _this.events.on('panel-initialized', _this.render.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
          return _this;
        }

        _createClass(WebcoachAdviceListPanelCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/webcoach-panel/editor.html', 2);
          }
        }, {
          key: 'setViewAdviceList',
          value: function setViewAdviceList() {
            var adviceList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.viewAdviceList = adviceList;
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            if (dataList.length > 0) {
              var jsonString = dataList[0].datapoints[0][0],
                  adviceList = JSON.parse(jsonString),
                  adviceMap = [];

              for (var key in adviceList) {
                adviceMap.push(adviceList[key]);
              }

              this.adviceList = adviceMap;
              this.setViewAdviceList(adviceList);
              this.render();
            }
          }
        }, {
          key: 'onClickFilter',
          value: function onClickFilter() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

            this.viewAdviceList = this.adviceList.filter(function (advice) {
              switch (type) {
                case "fail":
                  return advice.Score < 30;
                  break;
                case "medium":
                  return advice.Score > 30 && advice.Score < 80;
                  break;
                case "success":
                  return advice.Score > 80;
                  break;
                default:
                  return true;
                  break;
              }
            });
          }
        }, {
          key: 'onClickListItemTitle',
          value: function onClickListItemTitle(event) {
            event.target.closest('.webcoach-panel__list_item').classList.toggle('-collapsed');
          }
        }, {
          key: 'link',
          value: function link(scope, elem) {
            var _this2 = this;

            this.events.on('render', function () {
              var $panelContainer = elem.find('.panel-container');

              if (_this2.panel.bgColor) {
                $panelContainer.css('background-color', _this2.panel.bgColor);
              } else {
                $panelContainer.css('background-color', '');
              }
            });
          }
        }]);

        return WebcoachAdviceListPanelCtrl;
      }(MetricsPanelCtrl));

      _export('WebcoachAdviceListPanelCtrl', WebcoachAdviceListPanelCtrl);

      WebcoachAdviceListPanelCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=webcoach-panel.js.map
