'use strict';

module.exports = function(processor) {

    processor.registerBlockType('replace', function (content, block, blockLine) {

        var match = blockLine.match(/build:replace ['"]?(.+?)['"]?\s+?-->/i);
        return content.replace(blockLine, match[1]);

    });

};
