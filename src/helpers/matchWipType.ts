import {WipType} from "../types";

export function matchWipType(str: string): WipType {
  switch (str[0]) {
    case "#": return WipType.id;
    case ".": return WipType.class;
    case "[": return WipType.attr;
    case ":": return str.match(/\(/) ? WipType.pseudoArg : WipType.pseudo;
    default: throw new Error("Unknown WipType: " + str);
  }
}
