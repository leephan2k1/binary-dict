//Hỗ trợ so sánh giữa các node
class Comparator {
  constructor(customCompareFunction) {
    this.compare = customCompareFunction || Comparator.defaultCompareFunction;
  }

  //a, b: kiểu nguyên thuỷ (Number, String)
  //@return {0 || -1 || 1}
  static defaultCompareFunction(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }

  //kiểm tra bằng nhau
  //@return {boolean}
  equal(a, b) {
    return this.compare(a, b) === 0;
  }

  //Kiểm tra bé hơn (a < b)
  //@return {boolean}
  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }

  //Kiểm tra lớn hơn (a > b)
  //@return {boolean}
  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }

  //Kiểm tra lớn hơn hoặc bằng (a >= b)
  //@return {boolean}
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  //Kiểm tra lớn bé hơn hoặc bằng (a <= b)
  //@return {boolean}
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  //đảo ngược thứ tự so sánh (trừ bằng nhau)
  //@return {boolean}
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}

module.exports = Comparator;
