const parseAttribute = (attribute: any, customProp?: string): string => {
  if (attribute === undefined || attribute == null) {
    return '';
  } else if (typeof attribute === 'string') {
    return attribute;
  } else if (typeof attribute === 'boolean') {
    return attribute.toString();
  } else if (typeof attribute === 'number') {
    return attribute.toString();
  } else {
    // is object...find a field in priority order
    return customProp ? attribute[customProp]
    : attribute['name'] ? attribute['name']
    : attribute['value'] ? attribute['value']
    : '';
  }
};

const parseAttributeArray = (attributeArray: Array<any>): string => {
  let parsedAttributes: string[] = attributeArray.map(attributeArrayElement => parseAttribute(attributeArrayElement));
  if (parsedAttributes.length === 0) {
    return '';
  }
  return parsedAttributes.length === 1 ? parsedAttributes[0] : `[${parsedAttributes.join(';')}]`;
};

const getAttributes = (fields: any, attributesRequested: string[]): { [val: string]: string } => {
  return attributesRequested.reduce((attributesMap, attributeSystemName) => {
    const attributeData: any = attributeSystemName.split('.').reduce((prev,next) => prev && prev[next] || null, fields)

    const parsed: string = Array.isArray(attributeData)
      ? parseAttributeArray(attributeData)
      : parseAttribute(attributeData);

    attributesMap[attributeSystemName] = parsed;
    return attributesMap;
  }, {});
};

export {
  parseAttribute,
  parseAttributeArray,
  getAttributes,
};