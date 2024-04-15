import { createDynamicSlots } from './injection/dynamic';
import { createInjectedSlots } from './injection/injected';

(window as any).galisma = {
  createInjectedSlots,
  createDynamicSlots,
};
