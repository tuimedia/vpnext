import { isRef } from 'vue';

const unwrap = page => isRef(page) ? page.value : page;

export function addBlock(pageRef, block) {
  const page = unwrap(pageRef);
  page.pageData.content.blocks[block.id] = block;
  page.pageData.content.langData[page.pageData.defaultLanguage][block.id] = {};
}

export function setBlockLangData(pageRef, { language, id, key = null, value }) {
  const page = unwrap(pageRef);
  const langData = page.pageData.content.langData[language];
  if (!Object.prototype.hasOwnProperty.call(langData, id)) {
    langData[id] = {};
  }

  if (key) {
    langData[id][key] = value;
    return;
  }

  langData[id] = value;
}

export function setBlockData(pageRef, { id, key = null, value }) {
  const page = unwrap(pageRef);
  const blocks = page.pageData.content.blocks;
  if (!Object.prototype.hasOwnProperty.call(blocks, id)) {
    addBlock(page, { id });
  }

  if (key) {
    blocks[id][key] = value;
    return;
  }

  blocks[id] = value;
}
