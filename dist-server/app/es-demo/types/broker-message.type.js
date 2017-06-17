"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BrokerMessage = (function () {
    function BrokerMessage(topic, value, offset, partition, highWaterOffset, key) {
        this.topic = topic;
        this.value = value;
        this.offset = offset;
        this.partition = partition;
        this.highWaterOffset = highWaterOffset;
        this.key = key;
    }
    return BrokerMessage;
}());
exports.BrokerMessage = BrokerMessage;
//# sourceMappingURL=broker-message.type.js.map