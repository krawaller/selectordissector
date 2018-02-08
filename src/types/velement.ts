import {TEXTNODE} from '../builder';

export type HTMLElement = {
  type: string
  attrs?: {
    [attrName: string]: string | null
  }
  children?: VirtualElement[],
};

export type TextNode = {
  type: typeof TEXTNODE,
  content: string
};

export type VirtualElement = HTMLElement | TextNode;
