import * as test from "tape";

import {printToken} from "../../src/helpers";
import {AttributeAction, PseudoName, QueryError, QueryToken, TokenType, WipType } from "../../src/types";

test("The printToken helper", (t) => {
  type TestCase = [QueryToken, string, string];
  const prints: TestCase[] = [
    [
      {
        name: QueryError.extraneousParens,
        type: TokenType.error,
        value: {
          name: PseudoName.firstChild,
          type: TokenType.pseudo,
        },
      },
      ":first-child()",
      "we get empty parens showing",
    ],
    [
      {
        name: WipType.followComb,
        type: TokenType.wip,
        value: "",
      },
      "…",
      "We get ellipsis for WIP after combinator",
    ],
    [
      {type: TokenType.attribute, name: "foo", action: AttributeAction.any, value: "bar", ignoreCase: false},
      "[foo*=bar]",
      "We can print attr any token",
    ],
    [
      {type: TokenType.attribute, name: "class", action: AttributeAction.element, value: "bar", ignoreCase: false},
      ".bar",
      "We show class matching as class",
    ],
    [
      {type: TokenType.attribute, name: "foo", action: AttributeAction.element, value: "bar", ignoreCase: false},
      "[foo~=bar]",
      "We show element matching when name isnt class",
    ],
  ];
  prints.forEach(([token, result, desc]) => {
    t.deepEqual(
      printToken(token),
      result,
      desc,
    );
  });
  t.end();
});
