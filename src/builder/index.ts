import {VirtualElement} from '../types';

type Attrs = {[key:string]: string};

const elemProto = {};
const builderWatermark = Symbol('builder');

type Child = VirtualElement | Builder;
type ChildList = Child[];
type ChildrenType = Child[] | Child | string;

type Builder = {
  (a?: Attrs | ChildrenType, c?: ChildrenType): VirtualElement
  watermark?: Symbol // For identification as a builder function. "Optional" since we add it to the func after creation
};

type Factory = (type: string) => Builder;

const builderFactory: Factory = type => {
  const builder: Builder = (attrParam = {}, childrenParam = []) => {
    let children: Child[];
    let content: string;
    if (Array.isArray(attrParam) || typeof attrParam === 'string' || isElem(attrParam) || isBuilder(attrParam)){
      childrenParam = attrParam;
      attrParam = {};
    }
    if (typeof childrenParam === 'string'){
      content = childrenParam;
      children = [];
    } else if(isElem(childrenParam)) {
      children = [childrenParam];
    } else if (isBuilder(childrenParam)) {
      children = [childrenParam()];
    } else {
      children = childrenParam;
    }
    content = content || '';
    children = children.map(c => isBuilder(c) ? c() : c);
    // add elemProto so that we can identify objects as elements in the isElem function
    return Object.assign(Object.create(elemProto),{ type, attrs: attrParam, children, content });
  }
  // add watermark so we can identify functions as builders in the isBuilder func
  builder.watermark = builderWatermark;
  return builder;
}

export default builderFactory;

export function isElem(elem): elem is VirtualElement {
  return elemProto.isPrototypeOf(elem);
}

export function isBuilder(func): func is Builder {
  return func.watermark === builderWatermark;
}

export const div = builderFactory('div');
export const span = builderFactory('span');
export const p = builderFactory('p');
export const strong = builderFactory('strong');
export const h1 = builderFactory('h1');
export const ul = builderFactory('ul');
export const li = builderFactory('li');
