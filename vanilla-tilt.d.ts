declare module 'vanilla-tilt' {
  export interface TiltOptions {
    reverse?: boolean;
    max?: number;
    startX?: number;
    startY?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
    transition?: boolean;
    axis?: null | "x" | "y";
    reset?: boolean;
    "reset-to-start"?: boolean;
    easing?: string;
    glare?: boolean;
    "max-glare"?: number;
    "glare-prerender"?: boolean;
    "full-page-listening"?: boolean;
    gyroscope?: boolean;
    "mouse-event-element"?: string;
    gyroscopeMinAngleX?: number;
    gyroscopeMaxAngleX?: number;
    gyroscopeMinAngleY?: number;
    gyroscopeMaxAngleY?: number;
    gyroscopeSamples?: number;
  }

  export interface TiltValues {
    tiltX: number;
    tiltY: number;
    percentageX: number;
    percentageY: number;
  }

  export interface HTMLVanillaTiltElement extends HTMLElement {
    vanillaTilt: VanillaTilt;
  }

  export default class VanillaTilt {
    constructor(element: HTMLElement, settings?: TiltOptions);
    static init(elements: HTMLElement | HTMLElement[], settings?: TiltOptions): void;
    reset(): void;
    getValues(): TiltValues;
    destroy(): void;
    addEventListeners(): void;
    removeEventListener(): void;
  }
}

