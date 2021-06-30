import OrientationBehavior from './orientationBehaviors/OrientationBehavior';
import { Orientation } from '../utils/types';

type ViewEventName = 'position-change-by-drag' | 'position-change-by-click' | 'resize' | 'orientation-change' | 'tips-hide-status-change';

interface BasicViewComponentOptions {
  parentNode: HTMLElement,
  orientationBehavior: OrientationBehavior,
}

interface UpdateViewOptions {
  runnersPositions: number[],
  tipsValues: number[],
  scalePositions?: Map<number, number>,
  isRange?: boolean
}

interface PositionOptions {
  index: 0 | 1,
  position: number,
}

interface ViewOptions {
  orientation?: Orientation,
  isRange?: boolean,
  isTipsExists?: boolean
}

export {
  ViewEventName,
  BasicViewComponentOptions,
  UpdateViewOptions,
  PositionOptions,
  ViewOptions,
};
