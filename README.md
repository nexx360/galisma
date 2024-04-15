# Dynamic ad insertion script

## Usage

The script need to be call on sync mode, and will inject divs accordingly


## Example

* Injected: https://test.cleoma.fr/galisma/injected.html
* Dynamic: https://test.cleoma.fr/galisma/dynamic.html and https://test.cleoma.fr/galisma/tgu-injection.html for TGU


## Types

* General Type
```
type PrismaSlotType = "Banniere-Basse" | "Banniere-Haute" | "Habillage" | "Native" | "Out-Of-Banner" | "Pave-Bas" | "Pave-Bas2" | "Pave-Haut" | "Pave-Haut2" | "Pave-Haut2-Desktop" | "Postitiel"

type InsertAdjacentHTMLPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend"
```

* InjectedSlot

```
type InjectionCreatorPayload = {
  selector: string, // The selector for div where we're going to do the insert
  position: InsertAdjacentHTMLPosition, // We to inject
  maxRepetition: number,
  divIdPrefix: string, // This is the divId which we be used for insertions
  prismaType: PrismaSlotType,
  style?: string,
  beforeStyle?: string,
};
```

* DynamicSlots

```
type CreateDynamicSlotsPayload = {
  selector: string, // The divs were injection should take place
  mainContentSelector: string, // We the algorithm should apply
  maxRepetition: number,
  firstOffsetSelector: string, // From where the algorithm shoudl apply
  densityIndex: number, // Ad per 
  injectionClassName: string, // Name of the injection Class (for style)
  style?: string,
  beforeStyle?: string,
  divIdPrefix: string,
  prismaType: PrismaSlotType,
};
```

Example


https://test.cleoma.fr/galisma/tgu-injection.html
```
{
  selector: '.article__content > p:not(.product__description,.product__title), .article__content > figure, .article__content .product',
  mainContentSelector: '.article__content',
  maxRepetition: 10,
  firstOffsetSelector: '.ad-banner',
  densityIndex: 1,
  injectionClassName: 'galisma_injection',
  style: 'text-align: center; padding-bottom: 20px;padding-top:10px;margin-top: 25px; margin-bottom: 25px; background-color:#EAEAEA; width: 100%;min-height:300px;',
  beforeStyle: 'line-height:20px; content:La suite après cette publicité; color: #777; font-size: 12px; display:inherit',
  divIdPrefix: 'galisma_ad',
  prismaType: 'pave_haut',
}
```