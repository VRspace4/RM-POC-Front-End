import {RootModel} from "./root-model";
import {Transponder} from "./transponder";
import {Allocation} from "./allocation";

describe('RM Models', () => {
  let rootModel: RootModel;

  beforeEach(() => {
    rootModel = new RootModel('Production');
  });

  describe('Transponder', () => {
    it('should have a valid object', function() {
      rootModel.addTransponder(new Transponder('Transponder 1'));
      expect(rootModel.transponders[0].name).toBe('Transponder 1');
    });
  });


});


