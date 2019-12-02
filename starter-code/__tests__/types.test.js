const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  castToNumber,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('tells if a value is a string', () => {
      expect(isString('hello')).toBeTruthy();
      expect(isString('1')).toBeTruthy();
      expect(isString(1)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
    });

    it('tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('hello')).toBeFalsy();
      expect(isBoolean('1')).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });

    it('tells if a value is an array', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray([1, 2, 3])).toBeTruthy();
      expect(isArray(['This', 'is', 'an', 'Array!'])).toBeTruthy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray(false)).toBeFalsy();
      expect(isArray('hello')).toBeFalsy();
      expect(isArray('1')).toBeFalsy();
      expect(isArray(1)).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
    })
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
  });
});
