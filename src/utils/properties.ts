/**
 *
 * @param objectPath path to file
 * @returns File extension without leading "." ("properties" )
 */
export const isPropertiesExt = (objectPath: string) =>
    objectPath.endsWith(".properties")
