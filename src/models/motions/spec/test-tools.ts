import { Actor } from '../../actors/actor.model';
import { MotionFixture, TestStage } from './motion.fixture';

export type StageContextFn = (stage: number, label?: string) => string;
export const DefaultContextFn: StageContextFn = (stage: number, label?: string) => `stage ${stage}` + (label ? ` (${label})` : '');
export interface StageValue {
  value: number;
  withContext?: StageContextFn;
}

export interface ChangeStage {
  scrollTo?: TestStage;
  coords?: {
    x: StageValue;
    y: StageValue;
  };
  size?: {
    width: StageValue;
    height: StageValue;
  };
}

export class TestTools {

  static testGoingStages(block: Actor, blockElement: HTMLElement, stages: ChangeStage[]): Promise<void> {
    let promise: Promise<void> = Promise.resolve();

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      promise = promise.then(() => {
        return new Promise(resolve => {
          block.afterRender = () => {
            if (stage.coords) {
              expect(blockElement.getBoundingClientRect().x)
                .withContext(stage.coords.x.withContext ? stage.coords.x.withContext(i, 'x') : DefaultContextFn(i, 'x'))
                .toEqual(stage.coords.x.value);
              expect(blockElement.getBoundingClientRect().y)
                .withContext(stage.coords.y.withContext ? stage.coords.y.withContext(i, 'y') : DefaultContextFn(i, 'y'))
                .toEqual(stage.coords.y.value);
            }
            if (stage.size) {
              expect(blockElement.clientWidth)
                .withContext(stage.size.width.withContext ? stage.size.width.withContext(i, 'width') : DefaultContextFn(i, 'width'))
                .toEqual(stage.size.width.value);
              expect(blockElement.clientHeight)
                .withContext(stage.size.height.withContext ? stage.size.height.withContext(i, 'height') : DefaultContextFn(i, 'width'))
                .toEqual(stage.size.height.value);
            }
            resolve();
          };
          if (stage.scrollTo) {
            window.scrollTo(stage.scrollTo.x, stage.scrollTo.y);
          } else {
            const scrollTo = MotionFixture.stages()[i];
            window.scrollTo(scrollTo.x, scrollTo.y);
          }
        });
      });
    }

    return promise;
  }

}
