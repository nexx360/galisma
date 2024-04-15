// const logger = require('../utils/logger');

import { createInjectionStyle } from './injectionTools';
import { InsertAdjacentHTMLPosition, insertAdjacentHTMLPosition } from '../types/insertAdjacentHTMLPosition';
import { PrismaSlotType, prismaSlotType } from '../types/prismaSlotType';

export type InjectionCreatorPayload = {
  selector: string,
  position: InsertAdjacentHTMLPosition,
  maxRepetition: number,
  divIdPrefix: string,
  prismaType: PrismaSlotType,
  style?: string,
  beforeStyle?: string,
};

export const sanitizePayload = (payload:unknown):InjectionCreatorPayload => {
  if (typeof payload !== 'object') throw new Error('Payload must be an object');
  const {
    selector,
    position,
    maxRepetition,
    divIdPrefix,
    prismaType,
    style,
    beforeStyle,
  } = payload as InjectionCreatorPayload;
  if (typeof selector !== 'string') throw new Error('Selector must be a string');
  if (typeof position !== 'string' && !insertAdjacentHTMLPosition.includes(position)) throw new Error(`Position must be one of ${insertAdjacentHTMLPosition.join(', ')}`);
  if (typeof prismaType !== 'string' && !prismaSlotType.includes(prismaType)) throw new Error(`Prisma type must be one of ${prismaSlotType.join(', ')}`);
  if (typeof maxRepetition !== 'number') throw new Error('Max repetition must be a number');
  if (typeof divIdPrefix !== 'string') throw new Error('Div id prefix must be a string');
  // if (typeof type !== 'string') throw new Error('Type must be a string');
  if (style && typeof style !== 'string') throw new Error('Style must be a string');
  if (beforeStyle && typeof beforeStyle !== 'string') throw new Error('Before style must be a string');
  return {
    selector,
    position,
    maxRepetition,
    divIdPrefix,
    prismaType,
    style,
    beforeStyle,
  };
};

export const createInjectedSlotsFromPayload = ({
  selector,
  position,
  maxRepetition,
  divIdPrefix,
  prismaType,
  style,
  beforeStyle,
}:InjectionCreatorPayload):void => {
  const target:NodeListOf<Element> = document.querySelectorAll(selector);
  if (target.length === 0) throw new Error(`We cannot match any div with selector '${selector}'`);
  const injectionClassName = `${divIdPrefix}_injection_class`;

  createInjectionStyle({
    injectionClassName,
    style,
    beforeStyle,
  });

  // We set max injection
  let maxInjection = target.length;
  if (maxRepetition > 0) {
    maxInjection = Math.min(maxRepetition, target.length);
  }
  for (let i = 1; i <= maxInjection; i += 1) {
    const divId = `${divIdPrefix}-${i}`;
    const newDiv = document.createElement('div');
    newDiv.classList.add(injectionClassName);
    newDiv.dataset.adsCore = prismaType;
    newDiv.id = divId;
    target[i - 1].insertAdjacentHTML(position, newDiv.outerHTML);
  }
};

export const createInjectedSlots = (payload:unknown):void => {
  const action = () => createInjectedSlotsFromPayload(sanitizePayload(payload));
  if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', action);
  } else {
    // `DOMContentLoaded` has already fired
    action();
  }
};
