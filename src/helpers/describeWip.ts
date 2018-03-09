import {WipToken, WipType} from "../types";

export function describeWip(token: WipToken): string {
  switch (token.name) {
    case WipType.attr: return `Waiting for attribute condition`;
    case WipType.class: return `Waiting for class`;
    case WipType.id: return `Waiting for id`;
    case WipType.pseudo: return `Waiting for pseudo class name`;
    case WipType.pseudoArg: return `Waiting for closing parens`;
    case WipType.followComb: return `Must have something after combinator`;
  }
}
