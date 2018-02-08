import {VirtualElement} from '../types';

const elemProto = {};

type Child = VirtualElement | Builder | string;
type ChildList = Child[];

type AttrParamType = {[key:string]: string};
type ChildrenParamType = Child[] | Child | string;

type Builder = (a?: AttrParamType | ChildrenParamType, c?: ChildrenParamType) => VirtualElement;

type Factory = (type: string) => Builder;

export const TEXTNODE = Symbol('textnode');

const builderFactory: Factory = type => (attrParam = {}, childrenParam = []) => {
  let children: Child[];
  let content: string;
  if (Array.isArray(attrParam) || typeof attrParam === 'string' || isElem(attrParam) || typeof attrParam === 'function'){
    childrenParam = attrParam;
    attrParam = {};
  }
  if (typeof childrenParam === 'string'){
    children = [{type: TEXTNODE, content: childrenParam}];
  } else if(isElem(childrenParam)) {
    children = [childrenParam];
  } else if (typeof childrenParam === 'function') {
    children = [childrenParam()];
  } else {
    children = childrenParam;
  }
  children = children.map(c => typeof c === 'function' ? c() : typeof c === 'string' ? {type: TEXTNODE, content: c} : c);
  // add elemProto so that we can identify objects as elements in the isElem function
  return Object.assign(Object.create(elemProto),{ type, attrs: attrParam, children });
};

export default builderFactory;

export function isElem(elem): elem is VirtualElement {
  return elemProto.isPrototypeOf(elem);
}

export const div = builderFactory('div');
export const span = builderFactory('span');
export const p = builderFactory('p');
export const strong = builderFactory('strong');
export const h1 = builderFactory('h1');
export const ul = builderFactory('ul');
export const li = builderFactory('li');
