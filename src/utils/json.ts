import _ from "lodash";

export function flatten (obj: any, parentKey: string = '', separator: string = '.'): Record<string, any> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

        if (_.isObject(value) && !Array.isArray(value)) {
            Object.assign(acc, flatten(value, newKey, separator));
        } else {
            acc[newKey] = value;
        }

        return acc;
    }, {} as Record<string, any>);
};
