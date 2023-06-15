import { TimeFrame } from '../time-frame';

interface FrameGroups {
  [key: string]: TimeFrame[];
}

export class RenderingActorStrategy {

  private frameGroups: FrameGroups = {};

  startFrame?: TimeFrame;
  endFrame?: TimeFrame;

  private groupFramesByMotion(frames: TimeFrame[]): FrameGroups {
    return frames.reduce(
      (acc: FrameGroups, frame) => {
        const motionName = frame.motion.motionName();
        acc[motionName] = acc[motionName] ? [frame, ...acc[motionName]] : [frame];

        return acc;
      },
      {},
    );
  }

  prerender(frames: TimeFrame[]): void {
    this.frameGroups = this.groupFramesByMotion(frames);

    for (const key of Object.keys(this.frameGroups)) {
      const group = this.frameGroups[key];
      if (group.length) {
        this.startFrame = group[0];
        this.endFrame = group[0];

        for (const frame of group) {
          if (frame.getStartPos() <= this.startFrame.getStartPos()) {
            this.startFrame = frame;
          }
          if (frame.getEndPos() >= this.endFrame.getEndPos()) {
            this.endFrame = frame;
          }
        }
      }
    }
  }

  private findHits(group: TimeFrame[], scrollPos: number): TimeFrame[] {
    return group.filter(frame => scrollPos >= frame.getStartPos() && scrollPos <= frame.getEndPos());
  }

  private findNearestFrameForHole(group: TimeFrame[], scrollPos: number): TimeFrame | undefined {
    const previousFrames = group.filter(frame => frame.getEndPos() <= scrollPos);
    if (previousFrames.length) {
      let nearest: TimeFrame | undefined = previousFrames[0];
      for (const frame of previousFrames) {
        if (frame.getEndPos() > nearest.getEndPos()) {
          nearest = frame;
        }
      }

      return nearest;
    }
  }

  takeRenderFrame(scrollPos: number): TimeFrame | undefined {
    for (const key of Object.keys(this.frameGroups)) {
      const group = this.frameGroups[key];
      if (group?.length) {
        const hits = this.findHits(group, scrollPos);
        if (hits.length > 0) {
          return hits[0];
        } else {
          if (scrollPos <= this.startFrame!.getStartPos()) {
            return this.startFrame!;
          }
          if (scrollPos >= this.endFrame!.getEndPos()) {
            return this.endFrame!;
          }

          return this.findNearestFrameForHole(group, scrollPos);
        }
      }
    }
  }

}
