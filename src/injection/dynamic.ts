import logger from '../logger';
import { PrismaSlotType, prismaSlotType } from '../types/prismaSlotType';

import { createInjectionStyle } from './injectionTools';

export type Device = 'mobile' | 'desktop' | 'tablet';

export type CreateDynamicSlotsPayload = {
  selector: string,
  mainContentSelector: string,
  maxRepetition: number,
  firstOffsetSelector: string,
  densityIndex: number,
  injectionClassName: string,
  style?: string,
  beforeStyle?: string,
  divIdPrefix: string,
  prismaType: PrismaSlotType,
  device?: Device,
};

const setInitialOffset = (firstOffsetSelector?:string):number => {
  if (!firstOffsetSelector || firstOffsetSelector === '') return 0;
  const offsetDiv:Element | null = document.querySelector(firstOffsetSelector);
  return offsetDiv === null ? 0 : offsetDiv.getBoundingClientRect().bottom + window.pageYOffset;
};

const getEffectiveWindowHeight = (contentHeight:number, maxRepetition:number):number => {
  /**
     * Reminder
     * const theoricContentHeight = contentHeight + 300 * (contentHeight / windowHeight);
     * const theoricRepetition =  theoricContentHeight / windowHeight;
     *
     * As consequence, we need to solve
     * maxRepetition = (contentHeight + 300 * (contentHeight / windowHeight)) / windowHeight;
     * where windowHeight is the unknown
     * maxRepetition = contentHeight / windowHeight +
     *  300 * contentHeight / ( windowHeight * windowHeight);
     * maxRepetition * x2 - contentHeight  * x - 300 * contentHeight = 0;
     *
     * https://www.maths-et-tiques.fr/telech/Secondegre2ESL.pdf
     * https://stackoverflow.com/questions/33454438/quadratic-equation-solver-in-javascript
     */
  const solve = (a:number, b:number, c:number):[number, number] => {
    const result = (-1 * b + Math.sqrt(b ** 2 - (4 * a * c))) / (2 * a);
    const result2 = (-1 * b - Math.sqrt(b ** 2 - (4 * a * c))) / (2 * a);
    return [result, result2];
  };
  /**
   * The 1.4 is added to take into account the fact that p length
   * is not linear
   */
  const output:[number, number] = solve(maxRepetition * 1.4, -contentHeight, -300 * contentHeight);
  return Math.max(...output);
};

export const sanitizePayload = (payload:unknown):CreateDynamicSlotsPayload => {
  if (typeof payload !== 'object') throw new Error('Payload must be an object');
  const {
    selector,
    mainContentSelector,
    firstOffsetSelector,
    maxRepetition,
    densityIndex,
    injectionClassName,
    style,
    beforeStyle,
    divIdPrefix,
    prismaType,
    device,
  } = payload as CreateDynamicSlotsPayload;
  if (typeof selector !== 'string') throw new Error('Selector must be a string');
  if (typeof mainContentSelector !== 'string') throw new Error('Main content selector must be a string');
  if (typeof maxRepetition !== 'number') throw new Error('Max repetition must be a number');
  if (typeof prismaType !== 'string' && !prismaSlotType.includes(prismaType)) throw new Error(`Prisma type must be one of ${prismaSlotType.join(', ')}`);
  if (typeof firstOffsetSelector !== 'string') throw new Error('First offset selector must be a string');
  if (typeof densityIndex !== 'number') throw new Error('Density index must be a number');
  if (typeof injectionClassName !== 'string') throw new Error('Injection class name must be a string');
  if (typeof style !== 'string') throw new Error('Style must be a string');
  if (typeof beforeStyle !== 'string') throw new Error('Before style must be a string');
  if (typeof divIdPrefix !== 'string') throw new Error('Div id prefix must be a string');
  if (device && !['mobile', 'desktop', 'tablet'].includes(device)) throw new Error('Device must be a string among mobile, desktop, tablet');
  return {
    selector,
    mainContentSelector,
    firstOffsetSelector,
    maxRepetition,
    densityIndex,
    injectionClassName,
    style,
    beforeStyle,
    divIdPrefix,
    prismaType,
    device,
  };
};

export const createDynamicSlotsFromPayload = ({
  selector,
  mainContentSelector,
  firstOffsetSelector,
  maxRepetition,
  densityIndex,
  injectionClassName,
  style,
  beforeStyle,
  divIdPrefix,
  prismaType,
  device,
}:CreateDynamicSlotsPayload) => {
  /**
   * Wrapper identifier is the name of the div win ('#main for instance')
   * selectors is a string or an array of selectors
  * */
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  const selectedDivs:NodeListOf<Element> = document.querySelectorAll(selector);
  if (selectedDivs.length === 0) throw new Error(`We cannot match any div with selector '${selector}'`);

  // We detect content height
  const contentDiv:Element | null = document.querySelector(mainContentSelector);
  if (!contentDiv) throw new Error(`We cannot match any div with selector '${mainContentSelector}'`);
  const contentHeight:number = contentDiv.clientHeight;

  createInjectionStyle({ injectionClassName, style, beforeStyle });

  let distanceToPreviousInsertionBottom:number = setInitialOffset(firstOffsetSelector);
  /**
   * We test whether theoric injections is above maxRepetition
   */

  // params.injected.maxRepetition = 3;
  let effectiveWindowHeight = 0;
  const theoricContentHeight = contentHeight + 300 * (contentHeight / windowHeight);
  const theoricRepetition = theoricContentHeight / windowHeight;
  if (maxRepetition !== 0 && theoricRepetition > maxRepetition) {
    effectiveWindowHeight = getEffectiveWindowHeight(contentHeight, maxRepetition);
  } else {
    effectiveWindowHeight = windowHeight * densityIndex;
  }

  /**
   * Insertion algorithm
   * We test wether the selectedDiv is eligible
   */
  let j = 0;
  const isEligible = (i:number):boolean => i < selectedDivs.length
    && (maxRepetition === 0 || j < maxRepetition);

  for (let i = 0; isEligible(i); i += 1) {
    const selectedDiv = selectedDivs[i];
    const bottomDistanceToPageTop = selectedDiv.getBoundingClientRect().bottom + window.scrollY;
    // eslint-disable-next-line max-len
    const test = bottomDistanceToPageTop > effectiveWindowHeight + distanceToPreviousInsertionBottom;
    if (test) {
      j += 1;
      const adsCorePayload:{ type: PrismaSlotType, device?: Device } = {
        type: prismaType,
      };
      if (device !== undefined) adsCorePayload.device = device;
      const divId = `${divIdPrefix}-${j}`;
      const newDiv = document.createElement('div');
      newDiv.id = divId;
      newDiv.dataset.adsCore = `${JSON.stringify(adsCorePayload)}`;
      newDiv.classList.add(injectionClassName);
      newDiv.classList.add('ads-core-placer');
      selectedDiv.insertAdjacentHTML('afterend', newDiv.outerHTML);
      const createdDiv:HTMLElement = document.getElementById(divId);
      // eslint-disable-next-line max-len
      distanceToPreviousInsertionBottom = createdDiv.getBoundingClientRect().bottom + window.pageYOffset;
    }
  }
  if (contentHeight > 0) logger.log(`Estimated ad coverage: ${((j + 1) * 350) / contentHeight} %`);
};

export const createDynamicSlots = (payload:unknown):void => {
  const action = () => createDynamicSlotsFromPayload(sanitizePayload(payload));
  if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', action);
  } else {
    // `DOMContentLoaded` has already fired
    action();
  }
};
