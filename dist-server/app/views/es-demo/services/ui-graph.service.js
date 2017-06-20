"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vis_node_1 = require("../../../components/models/vis-node");
var vis_edge_1 = require("../../../components/models/vis-edge");
var ui_updater_service_1 = require("./ui-updater.service");
var UiGraphService = (function () {
    function UiGraphService() {
    }
    UiGraphService.initialize = function () {
        var _this = this;
        $('#mynetwork').click(function (e) {
            var visNodeSelectedId = _this._visNetworkCtrl.getSelectedNodes()[0];
            if (visNodeSelectedId) {
                _this._lastNodeSelectedId = visNodeSelectedId;
                var result = $.grep(_this._events, function (e) { return e.id === visNodeSelectedId; });
                ui_updater_service_1.UiUpdaterService.changeCatalog(result[0].id);
            }
            else if (_this._lastNodeSelectedId) {
                _this._visNetworkCtrl.setSelection({ nodes: [_this._lastNodeSelectedId] });
                _this._visNetworkCtrl.focus({ nodes: [_this._lastNodeSelectedId] });
            }
        });
    };
    UiGraphService.updateGraph = function (events, selectedEventId, selectedEventId2) {
        this._events = events;
        var aryNodes = [];
        var aryEdges = [];
        this.convertToVisData(events, aryNodes, aryEdges);
        this.drawVisNetwork(aryNodes, aryEdges);
        this._visNetworkCtrl.setSelection({ nodes: [selectedEventId] });
        this._lastNodeSelectedId = selectedEventId;
    };
    UiGraphService.convertToVisData = function (events, visNodes, visEdges) {
        // console.log('events = ', events);
        events.forEach(function (event, i) {
            var id = parseInt(event.id, 10);
            var name = '';
            if (event.name === "AddBranchEvent") {
                name = '[' + event.branchName + ']';
            }
            else {
                name = event.name.replace('Event', '-' + id);
            }
            var parentId = parseInt(event.parentId, 10);
            var visNode = new vis_node_1.VisNode(parseInt(event.id, 10), name);
            visNodes.push(visNode);
            var visEdge;
            if (event.parentId) {
                visEdge = new vis_edge_1.VisEdge(parentId, id);
            }
            else {
                visEdge = new vis_edge_1.VisEdge(id, id + 1);
            }
            visEdges.push(visEdge);
        });
    };
    UiGraphService.drawVisNetwork = function (visNodes, visEdges) {
        // create an array with nodes
        this._visNodes = new vis.DataSet(visNodes);
        // create an array with edges
        this._visEdges = new vis.DataSet(visEdges);
        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
            nodes: this._visNodes,
            edges: this._visEdges
        };
        var options = {
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
    };
    UiGraphService.eventsAsTree = function (events, selectedEventId, selectedEventId2) {
        var nodesById = this.getNodesById(events, selectedEventId2);
        this.markEvents(nodesById, selectedEventId);
        var root = null;
        events.forEach(function (event) {
            var node = nodesById[event.id];
            if (event.parentId) {
                nodesById[event.parentId].children.push(node);
            }
            else {
                root = node;
            }
        });
        return root;
    };
    UiGraphService.getNodesById = function (events, selectedEventId2) {
        var nodesById = {};
        var i = 0;
        events.forEach(function (event) {
            var name = event.name.replace('Event', '');
            if (event.name == 'AddBranchEvent') {
                name = event.branchName;
            }
            var node = {
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
    };
    UiGraphService.markEvents = function (nodesById, selectedEventId) {
        var node = nodesById[selectedEventId];
        node.HTMLclass = 'selected';
        do {
            if (node.parentId) {
                node = nodesById[node.parentId];
                if (node.HTMLclass != 'branch') {
                    node.HTMLclass = 'selectedParent';
                }
            }
            else {
                node = null;
            }
        } while (node);
    };
    return UiGraphService;
}());
exports.UiGraphService = UiGraphService;
//# sourceMappingURL=ui-graph.service.js.map