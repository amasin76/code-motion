import { easeQuadInOut } from 'd3-ease';
import { clamp01 } from '@/utils/number';

import { type Position } from '../drawer';

const DEFAULT_TRANSITION_CONFIG = {
  outDurationProportion: 0.5,
  moveDurationProportion: 1.0,
  inDurationProportion: 0.5,
  ease: easeQuadInOut,
};

export function computeTransitionState(
  progress: number,
  {
    outDurationProportion,
    moveDurationProportion,
    inDurationProportion,
    ease,
  } = DEFAULT_TRANSITION_CONFIG
) {
  const MOVE_START_PROPORTION =
    (1 - outDurationProportion - inDurationProportion) / 2 +
    outDurationProportion -
    moveDurationProportion / 2;
  const clampProgressAndEase = (progress: number) => ease(clamp01(progress));

  return {
    outProgress: clampProgressAndEase(progress / outDurationProportion),
    inProgress: clampProgressAndEase(
      (progress - (1 - inDurationProportion)) / inDurationProportion
    ),
    moveProgress: clampProgressAndEase(
      (progress - MOVE_START_PROPORTION) / moveDurationProportion
    ),
  };
}

export const applyTransition = (progress: number, from: number, to: number) =>
  from + (to - from) * progress;

export const applyPositionTransition = (
  progress: number,
  from: Position,
  to: Position
): Position => ({
  x: applyTransition(progress, from.x, to.x),
  y: applyTransition(progress, from.y, to.y),
});
