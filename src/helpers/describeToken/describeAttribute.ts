import {AttributeAction, AttributeToken} from "../../types";

export default function describeAttribute(token: AttributeToken): string {
  switch (token.action) {
    case AttributeAction.element: return `Keep all elements where the "${token.name}" attribute contains the word "${token.value}".`;
    case AttributeAction.exists: return `Keep all elements that have the attribute "${token.name}".`;
    case AttributeAction.equals:
      return token.name === "id"
        ? `Keep all elements with id "${token.value}"`
        : `Keep all elements where the attribute "${token.name}" equals "${token.value}".`;
    case AttributeAction.start: return `Keep all elements where the "${token.name}" attribute value starts with "${token.value}".`;
    case AttributeAction.end: return `Keep all elements where the "${token.name}" attribute value ends with "${token.value}".`;
    case AttributeAction.any: return `Keep all elements where the "${token.name}" attribute value contains "${token.value}".`;
    case AttributeAction.hyphen: return `Elements where "${token.name}" attribute value is "${token.value}" until hyphen or end.`;
  }
}
