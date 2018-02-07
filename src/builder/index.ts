import {VirtualElement} from '../types';

type Attrs = {[key:string]: string};

export const builderFactory = type => (attrParam: Attrs | VirtualElement[] | string = {}, childrenParam: VirtualElement[] | string = []) => {
  let children: VirtualElement[];
  let content: string;
  if (Array.isArray(attrParam) || typeof attrParam === 'string'){
    childrenParam = attrParam;
    attrParam = {};
  }
  if (typeof childrenParam === 'string'){
    content = childrenParam;
    children = [];
  } else {
    children = childrenParam;
    content = '';
  }
  return { type, attrs: attrParam, children, content };
}

export const div = builderFactory('div');
export const span = builderFactory('span');
