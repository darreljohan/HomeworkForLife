export default class LimitedArray<T> {
  private data: T[] = [];

  constructor(private limit: number) {}

  push(item: T): void {
    if (this.data.length >= this.limit) {
      this.data.shift(); // Remove the first (oldest) element
    }
    this.data.push(item);
  }

  getArray(): T[] {
    return this.data;
  }
}
