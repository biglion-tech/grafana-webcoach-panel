import { MetricsPanelCtrl } from 'app/plugins/sdk';
import _ from 'lodash';
import './css/webcoach-panel.css!';

export class WebcoachAdviceListPanelCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);

    _.defaultsDeep(this.panel, {
      bgColor: null
    });

    this.scrollable = true;
    /**
     * @property {array} adviceList - full advices list
     */
    this.adviceList = [];
    /**
     * @property {array} viewAdviceList - filtered advices for view
     */
    this.viewAdviceList = [];

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-teardown', this.onPanelTeardown.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/webcoach-panel/editor.html', 2);
  }

  setViewAdviceList(adviceList = []) {
    this.viewAdviceList = adviceList
  }
  /**
   * Parse json string to object and convert to array
   * @param {object} dataList object after json.parse advice list
   */
  onDataReceived(dataList) {
    if (dataList.length > 0) {
      let jsonString = dataList[0].datapoints[0][0],
        adviceList = JSON.parse(jsonString),
        adviceMap = [];
      
      for(let key in adviceList) {
        adviceMap.push(adviceList[key])
      }

      this.adviceList = adviceMap;
      this.setViewAdviceList(adviceList)
      this.render();
    }
  }

  onClickFilter(type = 'all') {
    this.viewAdviceList = this.adviceList.filter(function (advice){
      switch(type) {
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
          return true
          break;
      }
    }); 
  }

  onClickListItemTitle(event) {
    event.target.closest('.webcoach-panel__list_item').classList.toggle('-collapsed');
  }

  link(scope, elem) {
    this.events.on('render', () => {
      const $panelContainer = elem.find('.panel-container');

      if (this.panel.bgColor) {
        $panelContainer.css('background-color', this.panel.bgColor);
      } else {
        $panelContainer.css('background-color', '');
      }
    });
  }
}

WebcoachAdviceListPanelCtrl.templateUrl = 'module.html';
