import {VirtualElement} from '../types';

type Attrs = {[key:string]: string};

const elemFactory = type => (attrsOrChildren?: Attrs | VirtualElement[], childrenParam?: VirtualElement[]) => {
  let children: VirtualElement[];
  let attrs: Attrs;
  if (Array.isArray(attrsOrChildren)){
    children = attrsOrChildren;
  } else {
    attrs = attrsOrChildren || {};
    children = childrenParam || [];
  }
  return { type, attrs, children };
}

export const div = elemFactory('div');
export const span = elemFactory('span');