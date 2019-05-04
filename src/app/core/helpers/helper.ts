export class Helper {

  static cloneObjeto(obj) {

    // return value is input is not an Object or Array.
    if (typeof (obj) !== 'object' || obj === null) {
      return obj;
    }

    let clone;

    if (Array.isArray(obj)) {
      clone = obj.slice();  // unlink Array reference.
    } else {
      clone = Object.assign({}, obj); // Unlink Object reference.
    }

    let keys = Object.keys(clone);

    for (let i = 0; i < keys.length; i++) {
      clone[keys[i]] = this.cloneObjeto(clone[keys[i]]); // recursively unlink reference to nested objects.
    }

    return clone; // return unlinked clone.
  }

  static dynamicSort(property, sortOrder) {
    return function (a, b) {
      if (typeof b[property] === 'string') {
        if (sortOrder == 0) {
          return b[property].localeCompare(a[property]);
        } else {
          return a[property].localeCompare(b[property]);
        }
      } else if (typeof b[property] === 'number') {
        if (sortOrder == 0) {
          return b[property] - (a[property]);
        } else {
          return a[property] - (b[property]);
        }
      }
    }
  }
}