"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = "\n  type PersonType {\n    name: String\n    id: String\n    sex: String\n    matches [PersonType] \n  }\n";
exports.resolver = {
    PersonType: {
        matches: function (root, args, ctx) {
            return ctx.persons;
        }
    }
};
//# sourceMappingURL=person-type.js.map