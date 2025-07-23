/* eslint-disable @typescript-eslint/no-dynamic-delete */

class Storage {
  constructor() {
    this.length = 0;
  }

  length = 0;

  getItem(key: string) {
    return this[key] || null;
  }

  setItem(key: string, value: string) {
    if (!this[key]) {
      this.length++;
    }
    this[key] = value.toString();
  }

  removeItem(key: string) {
    if (this[key]) {
      this.length--;
    }
    delete this[key];
  }

  clear() {
    Object.keys(this).forEach((key) => delete this[key]);
    this.length = 0;
  }
}

export const localStorageMock = Object.create(new Storage());
