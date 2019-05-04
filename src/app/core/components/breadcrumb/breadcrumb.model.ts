export class BreadcrumbModel {

    constructor(routerlink: string[], routerName: string, routerActivated: boolean ){
        this.routerlink = routerlink;
        this.routerName = routerName;
        this.routerActivated = routerActivated;
    }

    routerlink: string[];
    routerName: string;
    routerActivated: boolean;
}