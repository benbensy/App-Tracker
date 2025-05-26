import {XMLBuilder} from 'fast-xml-parser'

export interface AppFilterItem {
    appName: string;
    packageName: string;
    mainActivity: string;
}

export function createAppFilterItem(appFilter: AppFilterItem) {
    const builder = new XMLBuilder({
        ignoreAttributes: false,
        suppressEmptyNode: true,
        format: true,
    })

    return builder.build({
        item: {
            '@_component': `ComponentInfo{${appFilter.packageName}/${appFilter.mainActivity}}`,
            '@_drawable': appFilter.appName,
        }
    })
}


export function createAppFilter(appFilters: AppFilterItem[]) {
    const builder = new XMLBuilder({
        ignoreAttributes: false,
        suppressEmptyNode: true,
        format: true,
    })

    return builder.build({
        "?xml": {
            "@_version": "1.0"
        },
        "resources": {
            item: appFilters.map(item => ({
                '@_component': `ComponentInfo{${item.packageName}/${item.mainActivity}}`,
                '@_drawable': item.appName,
            })),
        }
    })
}