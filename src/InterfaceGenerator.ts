class InterfaceGenerator {
  private structure: any;
  private interfaceName: string;
  constructor(interfaceName: string) {
    this.structure = {};
    this.interfaceName = interfaceName;
  }
  add(key: string, type: string) {
    this.structure[key] = type;
  }
  export() {
    let returnStr = `interface ${this.interfaceName} {\n`;

    for (const key of Object.keys(this.structure)) {
      returnStr += '\t';
      if (typeof this.structure[key] === 'object') {
      } else {
        returnStr += `${key}: ${this.structure[key]};\n`;
      }
    }

    returnStr += `};`;

    return returnStr;
  }
}

export default InterfaceGenerator;
