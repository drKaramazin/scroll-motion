import { Util } from '../../../util';

export interface TestStage {
  x: number;
  y: number;
}

export abstract class MotionFixture {

  static block = {
    width: 17,
    height: 12,
  };

  static htmlTemplate(): string {
    return `
      <div id="test-body">
        <div class="display"></div>
        <div id="scene">
          <div id="block" style="width: ${MotionFixture.block.width}px; height: ${MotionFixture.block.height}px;"></div>
        </div>
        <div class="display"></div>
        <div class="display"></div>
      </div>
    `;
  }

  static stages: () => TestStage[] = function() {
    return [{
      x: 0,
      y: 0,
    }, {
      x: 0,
      y: Util.innerHeight(),
    }, {
      x: 0,
      y: Util.innerHeight() + Util.clientHeight(),
    }, {
      x: 0,
      y: Util.innerHeight() * 2 + Util.clientHeight(),
    }];
  };

}
