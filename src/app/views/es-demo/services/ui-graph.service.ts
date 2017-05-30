import { VisNode } from '../../../components/models/vis-node';
import { VisEdge } from '../../../components/models/vis-edge';
import { UiUpdaterService } from './ui-updater.service';

declare var $: any;
declare var Treant: any;
declare var vis: any;

export class UiGraphService {
  static _events: any[];
  static _visNetworkCtrl: any;
  static _visNodes: any;
  static _visEdges: any;
  static _lastNodeSelectedId: number;

  static initialize(): void {
    $('#mynetwork').click((e) => {
      const visNodeSelectedId: number = this._visNetworkCtrl.getSelectedNodes()[0];
      if (visNodeSelectedId) {
        this._lastNodeSelectedId = visNodeSelectedId;
        const result = $.grep(this._events, function(e){ return e.id === visNodeSelectedId; });
        UiUpdaterService.updateTables(result[0].id);
      } else if (this._lastNodeSelectedId) {
        this._visNetworkCtrl.setSelection({nodes: [this._lastNodeSelectedId]});
      }
    });
  }

  static update(events, selectedEventId, selectedEventId2) {
    this._events = events;

    //const rootNode = this.eventsAsTree(events, selectedEventId, selectedEventId2);
    // const simple_chart_config = {
    //   chart: {
    //     container: '#graph',
    //     rootOrientation: 'WEST',
    //     nodeAlign: 'BOTTOM',
    //     connectors: {
    //       style: {
    //         'stroke-width': 1,
    //         'stroke': '#3C3C3A'
    //       }
    //     },
    //     scrollbar: 'native'
    //   },
    //
    //   nodeStructure: rootNode
    // };
    //
    // new Treant(simple_chart_config);

    // $('#graph .node').click((e) => {
    //   let index = $(e.target).attr('event-index');
    //   if (!index) {
    //     index = $(e.target).find('p').attr('event-index');
    //   }
    //   const event = this._events[index];
    //
    //   callbackClick(event, e.ctrlKey);
    //   console.log(event);
    //
    //   if (e.ctrlKey) {
    //     this.applyUpdatesToTables(events, selectedEventId, event.id, callbackClick);
    //   }
    // });

    const aryNodes: VisNode[] = [];
    const aryEdges: VisEdge[] = [];
    this.convertToVisData(events, aryNodes, aryEdges);
    this.drawVisNetwork(aryNodes, aryEdges);

    this._visNetworkCtrl.setSelection({nodes: [selectedEventId]});
    this._lastNodeSelectedId = selectedEventId;
  }

  static convertToVisData(events: any[], visNodes: VisNode[], visEdges: VisEdge[]): void {
    events.forEach((event: any, i: number) => {
      const id: number = parseInt(event.id, 10);
      const name = event.name.replace('Event', '-' + id);
      const parentId: number = parseInt(event.parentId, 10);
      const visNode = new VisNode(parseInt(event.id, 10), name);
      visNodes.push(visNode);
      let visEdge: VisEdge;
      if (event.parentId) {
        visEdge = new VisEdge(parentId, id);
      } else {
        visEdge = new VisEdge(id, id + 1);
      }
      visEdges.push(visEdge);
    });
  }

  static drawVisNetwork(visNodes: VisNode[], visEdges: VisEdge[]) {
    // create an array with nodes
    this._visNodes = new vis.DataSet(visNodes);
    // create an array with edges
    this._visEdges = new vis.DataSet(visEdges);

    // create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes: this._visNodes,
      edges: this._visEdges
    };
    const options = {
      edges: {
        smooth: {
          enabled: false
        }
      },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD',
          sortMethod: 'directed',
          levelSeparation: 50,
          nodeSpacing: 150
        }
      },
      nodes: {
        shape: 'box',
        physics: false,
        font: {
          color: 'white'
        },
        color: {
          background: '#1B7BB9',
          border: '#1B7BB9',
          highlight: {
            background: '#F8AC5A',
            border: '#F8AC5A'
          }
        }
      }
    };
    this._visNetworkCtrl = new vis.Network(container, data, options);
  }

  static eventsAsTree(events, selectedEventId, selectedEventId2) {
    const nodesById = this.getNodesById(events, selectedEventId2);

    this.markEvents(nodesById, selectedEventId);

    let root = null;
    events.forEach((event) => {
      const node = nodesById[event.id];

      if (event.parentId) {
        nodesById[event.parentId].children.push(node);
      } else {
        root = node;
      }
    });

    return root;
  }

  static getNodesById(events, selectedEventId2) {
    const nodesById = {};

    let i = 0;
    events.forEach((event) => {
      let name = event.name.replace('Event', '');

      if (event.name == 'AddBranchEvent') {
        name = event.branchName;
      }

      const node = {
        parentId: event.parentId,
        children: [],
        HTMLclass: '',
        innerHTML: $('<p/>', {
          text: name
        }).attr('event-index', i).addClass('withEvent').prop('outerHTML')
      };

      if (event.name === 'AddBranchEvent') {
        node.HTMLclass = 'branch';
      }

      if (selectedEventId2 && event.id == selectedEventId2) {
        node.HTMLclass = 'selectedSecond';
      }

      nodesById[event.id] = node;
      i++;
    });
    return nodesById;
  }

  static markEvents(nodesById, selectedEventId) {
    let node = nodesById[selectedEventId];
    node.HTMLclass = 'selected';

    do {
      if (node.parentId) {
        node = nodesById[node.parentId];

        if (node.HTMLclass != 'branch') {
          node.HTMLclass = 'selectedParent';
        }
      } else {
        node = null;
      }

    } while (node);
  }

}
