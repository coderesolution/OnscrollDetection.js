export default class OnscrollDetection {
    constructor(options?: {});
    elements: any;
    screen: any;
    triggers: Map<any, any>;
    scrollingClass: any;
    scrolledClass: any;
    stickyClass: any;
    stuckClass: any;
    eventHandlers: {};
    autoStart: any;
    init(): void;
    start(): void;
    on(event: any, handler: any): void;
    emit(event: any, ...args: any[]): void;
    getTrigger(element: any): any;
    getScreen(element: any): any;
    getFromProperties(element: any, index: any): any;
    getToProperties(element: any, index: any, trigger: any): any;
    getStickyProperties(element: any): {
        pin: boolean;
        pinSpacing: boolean;
    };
    hasAttributes(element: any, attrs: any): any;
    getAnimateFrom(element: any): any;
    getAnimateTo(element: any): any;
    getOffset(element: any): number;
    getDirection(element: any): any;
    getX(element: any): number;
    getY(element: any): number;
    getOffsetAndDistance(element: any): {
        offset: number;
        distance: number;
    };
    getDistanceOrSpeed(element: any): number;
    getScrub(element: any): number | true;
    getStart(element: any): any;
    getEnd(element: any): any;
    debugMode(element: any, index: any): void;
    fetch(elementOrIndex: any): any;
    refresh(): void;
    restart(): void;
    stop(target?: any): void;
    destroy(): void;
}
