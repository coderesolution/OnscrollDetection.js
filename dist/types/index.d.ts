export default class OnscrollDetection {
    constructor(options?: {});
    elements: any;
    screen: any;
    triggers: Map<any, any>;
    init(): void;
    getTrigger(element: any): any;
    getScreen(element: any): any;
    getFromProperties(element: any, index: any): any;
    getToProperties(element: any, index: any, trigger: any): any;
    hasAttributes(element: any, attrs: any): any;
    getAnimateFrom(element: any): any;
    getAnimateTo(element: any): any;
    getOffset(element: any): number;
    getDirection(element: any): any;
    getX(element: any): number;
    getY(element: any): number;
    getDistanceOrSpeed(element: any): number;
    getStart(element: any): any;
    getEnd(element: any): any;
    debugMode(element: any, index: any): void;
    refresh(): void;
    restart(): void;
    stop(target?: any): void;
    update(target: any, fromProperties: any, toProperties: any): void;
    destroy(): void;
}
