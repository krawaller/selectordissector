import {TEXTNODE} from "../builder";

export type ContentNode = {
  type: string
  attrs?: {
    [attrName: string]: string | null,
  }
  children?: VirtualElement[],
};

export type TextNode = {
  type: typeof TEXTNODE,
  content: string,
};

export type VirtualElement = ContentNode | TextNode;
