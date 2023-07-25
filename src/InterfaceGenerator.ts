interface additionalOptions {
  nullable?: boolean;
}

class InterfaceGenerator {
  private structure: any;
  private interfaceName: string;
  constructor(interfaceName: string) {
    this.structure = {};
    this.interfaceName = interfaceName;
  }
  add(key: string, type: string, options?: additionalOptions) {
    this.structure[key] = { value: type, ...options };
  }
  export() {
    let returnStr = `interface ${this.interfaceName} {\n`;

    for (const key of Object.keys(this.structure)) {
      returnStr += '\t';
      if (typeof this.structure[key].value === 'object') {
      } else {
        returnStr += `${key}${this.structure[key].nullable ? '?' : ''}: ${
          this.structure[key].value
        };\n`;
      }
    }

    returnStr += `};`;

    return returnStr;
  }
}

export default InterfaceGenerator;
