import * as test from "tape";

import {printToken} from "../../src/helpers";
import {PseudoName, QueryError, QueryToken, TokenType } from "../../src/types";

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