'use strict';

module.exports = function (processor) {

    processor.registerBlockType('replace', function (content, block, blockLine, blockContent) {

        var match = blockLine.match(/build:replace ['"]+(.+?)['"]+/i);
        return content.replace(blockLine, match[1]);
        
    });

};