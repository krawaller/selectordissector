import * as test from 'tape';

import {FormulaType, FormulaClassification} from '../../src/types';
import {classifyFormula} from '../../src/helpers';

test('The classifyFormula helper', t => {
  type TestCase = [string, FormulaClassification, string];
  const cases: TestCase[] = [
    [
      '2n',
      [FormulaType.mult, 2],
      'correctly identifies multiplier'
    ],[
      '0',
      [FormulaType.unknown],
      'whines about 0'
    ]
  ];
  cases.forEach(([formula, result, desc]) => t.deepEqual(classifyFormula(formula), result, desc));
  t.end();
});
