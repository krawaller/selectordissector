import {VirtualElement} from '../types';

type Attrs = {[key:string]: string};

const elemProto = {};

const builderFactory = type => (attrParam: Attrs | VirtualElement[] | string = {}, childrenParam: VirtualElement[] | string = []) => {
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
  // add elemProto so that we can identify objects as elements in the isElem function
  return Object.assign(Object.create(elemProto),{ type, attrs: attrParam, children, content });
}

export default builderFactory;

export function isElem(elem){
  return elemProto.isPrototypeOf(elem);
}

export const div = builderFactory('div');
export const span = builderFactory('span');
