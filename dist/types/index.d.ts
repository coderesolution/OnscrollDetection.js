export default class OnscrollDetection {
    constructor(options?: {});
    elements: any;
    screen: any;
    scrollTriggers: any[];
    animationsData: any[];
    init: () => void;
    refresh(): void;
    restart(): void;
    stop(target?: any): void;
}
