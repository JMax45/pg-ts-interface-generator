const defaultMap = {
  bigint: 'bigint',
  bit: 'boolean',
  boolean: 'boolean',
  character: 'string',
  character_varying: 'string',
  date: 'Date',
  double_precision: 'number',
  integer: 'number',
  money: 'number',
  numeric: 'number',
  real: 'number',
  serial: 'number',
  smallint: 'number',
  smallserial: 'number',
  text: 'string',
  time: 'Date',
  uuid: 'string',
};

const mapDataType = (dataType: string) => {
  return defaultMap[dataType as keyof typeof defaultMap] || 'any';
};

export default mapDataType;
