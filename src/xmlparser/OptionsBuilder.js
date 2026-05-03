
export const defaultOptions = {
    preserveOrder: false,
    attributeNamePrefix: '@_',
    attributesGroupName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    removeNSPrefix: false, // remove NS from tag name or attribute name if true
    allowBooleanAttributes: false, //a tag can have attributes without any value
    //ignoreRootElement : false,
    parseTagValue: true,
    parseAttributeValue: false,
    trimValues: true, //Trim string values of tag and attributes
    cdataPropName: false,
    numberParseOptions: {
      hex: true,
      leadingZeros: true,
      eNotation: true
    },
    tagValueProcessor: function(tagName, val) {
      return val;
    },
    attributeValueProcessor: function(attrName, val) {
      return val;
    },
    stopNodes: [], //nested tags will not be parsed even for errors
    alwaysCreateTextNode: false,
    isArray: () => false,
    commentPropName: false,
    unpairedTags: [],
    processEntities: true,
    htmlEntities: false,
    ignoreDeclaration: false,
    ignorePiTags: false,
    transformTagName: false,
    transformAttributeName: false,
    updateTag: function(tagName, jPath, attrs){
      return tagName
    },
    // skipEmptyListItem: false
    captureMetaData: false,
};
   
/**
 * Normalizes processEntities option for backward compatibility
 * @param {boolean|object} value
 * @returns {object} Always returns normalized object
 */
function normalizeProcessEntities(value) {
    if (typeof value === 'boolean') {
        return {
            enabled: value,
            maxEntitySize: 10000,
            maxExpansionDepth: 10,
            maxTotalExpansions: 1000,
            maxExpandedLength: 100000,
            maxEntityCount: 100,
            allowedTags: null,
            tagFilter: null
        };
    }

    if (typeof value === 'object' && value !== null) {
        return {
            enabled: value.enabled !== false,
            maxEntitySize: Math.max(1, value.maxEntitySize ?? 10000),
            maxExpansionDepth: Math.max(1, value.maxExpansionDepth ?? 10),
            maxTotalExpansions: Math.max(1, value.maxTotalExpansions ?? 1000),
            maxExpandedLength: Math.max(1, value.maxExpandedLength ?? 100000),
            maxEntityCount: Math.max(1, value.maxEntityCount ?? 100),
            allowedTags: value.allowedTags ?? null,
            tagFilter: value.tagFilter ?? null
        };
    }

    return normalizeProcessEntities(true);
}

export const buildOptions = function(options) {
    const built = Object.assign({}, defaultOptions, options);
    built.processEntities = normalizeProcessEntities(built.processEntities);
    return built;
};
