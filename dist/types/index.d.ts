export default class OnscrollDetection {
    constructor(options?: {});
    elements: any;
    scrollTriggers: any[];
    animationsData: any[];
    init: () => void;
    refresh(): void;
    stop(target?: any): void;
    restart(): void;
}
