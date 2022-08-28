const fs = require('fs');

const getPage = () => {
    if (process.argv.length !== 3) {
        throw new Error(`Usage: ${process.argv[1]} <filename>`);
    }

    const page = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

    if (page?.pageData?.content?.schemaVersion !== 2) {
        throw new Error('Not a version 2 document');
    }

    return page;
}

/* move custom block properties into data object
 * add "children" array to every block
 * move block langdata into "strings" property
 * remove languages from blocks
 * check for and run a custom convertor for the block, if defined
 */
const convertBlocks = page => {
    for (id in page.pageData.content.blocks) {
        const block = convertBlock(page.pageData.content.blocks[id]);

        // Call custom converter if one exists
        convertors[block.component]?.(block, page);

        page.pageData.content.blocks[block.id] = block;
    }
};

const convertBlock = block => {
    const out = {
        id: block.id,
        component: block.component,
        children: block?.blocks || [],
        data: {},
        strings: {},
    };

    // Move everything else into data
    const exclude = ['id', 'component', 'styles', 'languages', 'blocks'];
    for (prop in block) {
        if (exclude.includes(prop)) {
            continue;
        }
        out.data[prop] = block[prop];
    }

    return out;
};

const convertors = {
    WFPLocalKnowledgeArticleRow(block) {
        block.component = 'WFPArticleGrid';
        delete block.data.metadata;
    },
    WFPArticleGrid(block) {

        delete block.data.metadata;
    },
    PagePlaylist(block) {
        block.children = [...block.data.videos];
        delete block.data.videos;
    },
};

const convertMetadata = page => {
    const newMetadata = {
        data: {},
        strings: {}
    };

    newMetadata.data = page.pageData.metadata;
    for (lang in page.pageData.content.langData) {
        newMetadata.strings[lang] = page.pageData.content.langData[lang].metadata;
        delete page.pageData.content.langData[lang].metadata;
    }

    page.pageData.metadata = newMetadata;

    return page;
};

const convertLangData = page => {
    for (lang in page.pageData.content.langData) {
        for (blockId in page.pageData.content.langData[lang]) {
            // Skip broken/floating langdata, and the metadata block
            if (page.pageData.content.blocks[blockId]) {
                page.pageData.content.blocks[blockId].strings[lang] = page.pageData.content.langData[lang][blockId];
                delete page.pageData.content.langData[lang][blockId];
            }
        }
    }
    delete page.pageData.content.langData;
};

const dumpPage = page => {
    console.log(JSON.stringify(page));
}

/* Get everything started */
const main = () => {
    const page = getPage();
    convertBlocks(page);
    convertMetadata(page);
    convertLangData(page);
    delete page.pageData.translatedMetadata;
    page.pageData.content.schemaVersion = 4;

    dumpPage(page);
}

main();
