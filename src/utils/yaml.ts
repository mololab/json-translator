/**
 *
 * @param objectPath path to file
 * @returns File extension without leading "." ("yml" or "yaml")
 */
export const matchYamlExt = (objectPath: string) =>
  objectPath.match(/\.(ya?ml)$/)?.[1];
