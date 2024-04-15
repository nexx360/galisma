export type SetInjectionParamsPayload = {
  adUnitId: string;
  sizes: Array<Array<number>>;
  divId: string;
  nexx360TagId?: string;
  teadsPageId?: string;
  teadsPlacementId?: string;
  targeting?: { [key: string]: string };
  injected: {
    selector: string;
    label?: string;
    incrementalTargeting?: Array<{ key: string; value: string }>;
    incrementalAdUnitId?: boolean;
    mainContentSelector?: boolean;
    maxRepetition?: number;
    position?: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
    firstOffsetSelector?: string;
    densityIndex?: number;
  };
  style?: string;
  beforeStyle?: string;
};

export type SetInjectionParamsOutput = {
  adUnitId: string;
  sizes: Array<Array<number>>;
  divId: string;
  teads?: { pageId: string; placementId: string };
  targeting?: { [key: string]: string };
  injected: {
    selector: string;
    label: string;
    incrementalTargeting: Array<{ key: string; value: string }>;
    incrementalAdUnitId: boolean;
    mainContentSelector: boolean;
    maxRepetition: number;
    position: string;
    firstOffsetSelector: string;
    densityIndex: number;
  };
  style: string;
  beforeStyle: string;
};

// const setInjectionParams = (nexx360Slot:SetInjectionParamsPayload): => {
//   const params = {
//     adUnitId: nexx360Slot.adUnitId,
//     sizes: nexx360Slot.sizes,
//     divId: nexx360Slot.divId,
//     injected: {},
//   };
//   if (nexx360Slot.targeting !== undefined) params.targeting = nexx360Slot.targeting;
//   if (!nexx360Slot.injected.selector) throw new Error('Selector must be set');
//   params.injected.selector = nexx360Slot.injected.selector;

//   params.style = nexx360Slot.style || '';
//   params.beforeStyle = nexx360Slot.beforeStyle || '';
//   params.injected.label = nexx360Slot.injected.label || params.divId;
//   params.injected.incrementalTargeting = nexx360Slot.injected.incrementalTargeting || [];
//   params.injected.incrementalAdUnitId = nexx360Slot.injected.incrementalAdUnitId || false;
//   params.injected.mainContentSelector = nexx360Slot.injected.mainContentSelector || false;

//   // Max Repetition Part
//   params.injected.maxRepetition = nexx360Slot.injected.maxRepetition || 0;
//   if (Number.isInteger(params.injected.maxRepetition) === false)
// throw new Error('Max repetition must be an integer');

//   if (nexx360Slot.type === 'injected') {
//     // Position Part
//     params.injected.position = nexx360Slot.injected.position || 'beforebegin';
//     const testPosition = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'].
// includes(params.injected.position);
//     if (!testPosition) throw new Error(
// 'Position must be in beforebegin, afterbegin, beforeend, afterend');
//   }

//   if (nexx360Slot.type === 'dynamic') {
//     params.injected.firstOffsetSelector = nexx360Slot.injected.firstOffsetSelector || '';
//     params.injected.densityIndex = nexx360Slot.injected.densityIndex || 0.8;
//   }
//   return params;
// };

export const sanitizeStyle = (style:string):string => {
  let output = '';
  const styleArray = style.split(';');
  if (styleArray.length === 0) return output;
  styleArray.forEach((styleElement) => {
    const foo = styleElement.split(':');
    if (foo.length !== 2) return;
    if (foo[0].trim() === 'content') foo[1] = `"${foo[1].trim()}"`;
    output += `${foo[0].trim()}:${foo[1].trim()};`;
  });
  return output;
};
export type StyleInjectionParams = {
  injectionClassName: string;
  style: string;
  beforeStyle: string;
};

export const createInjectionStyle = (
  { injectionClassName, style, beforeStyle }:StyleInjectionParams,
):void => {
  // We define styles bases on class
  const styleElement:HTMLStyleElement = document.createElement('style');
  styleElement.textContent = `.${injectionClassName} { ${style} } `;
  styleElement.textContent += `.${injectionClassName}::before { ${sanitizeStyle(beforeStyle)} } `;
  document.head.appendChild(styleElement);
};
