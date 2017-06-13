import {Neo4jGlobals} from '../app/app.globals';
import {v1 as neo4j} from 'neo4j-driver';
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {EsEvent} from "../app/es-demo/events/es-event.abstract";
import {Transponder} from "../app/es-demo/models/transponder";
import {TransponderModifiedEvent} from "../app/es-demo/events/transponder-modified-event";
import {CustomerAddedEvent} from "../app/es-demo/events/customer-added-event";
import {CustomerModifiedEvent} from "../app/es-demo/events/customer-modified-event";
import {AllocationAddedEvent} from "../app/es-demo/events/allocation-added-event";
import {AllocationModifiedEvent} from "../app/es-demo/events/allocation-modified-event";
import {RootModel} from "../app/es-demo/models/root-model";
import {RootModelAddedEvent} from "../app/es-demo/events/root-model-added-event";
import {RootModelModifiedEvent} from "../app/es-demo/events/root-model-modified-event";
import {OriginatorAddedEvent} from "../app/es-demo/events/originator-added-event";
import {OriginatorModifiedEvent} from "../app/es-demo/events/originator-modified-event";
import {TransponderRemovedEvent} from "../app/es-demo/events/transponder-removed-event";
import {CustomerRemovedEvent} from "../app/es-demo/events/customer-removed-event";
import {OriginatorRemovedEvent} from "../app/es-demo/events/originator-removed-event";
import {AllocationRemovedEvent} from "../app/es-demo/events/allocation-removed-event";
import {KeyValue} from "../app/es-demo/models/key-value";


export class EventRepository {






}
