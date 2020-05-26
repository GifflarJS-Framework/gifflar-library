const createVariableModel = require("./variable");
const createFunctionModel = require("./function");
const createEventModel = require("./callevent");

/**
 * @todo Write documentation
 * @module
 */
function createContractModel(_name) {
  /**
   * @todo Write documentation
   */
  const contract = {
    name: _name,
    contract: {
      variables: [],
      functions: [],
    },
  };

  /**
   * @todo Write documentation
   */
  function createEvent(_name, _inputs = []) {
    const newCallEvent = createEventModel(_name, _inputs);
    return newCallEvent;
  }

  /**
   * @todo Write documentation
   */
  function createVariable(_type, _name, _scope, _setMethod, _value) {
    const variable = createVariableModel(
      _type,
      _name,
      _scope,
      _setMethod,
      _value
    );
    contract.contract.variables.push(variable);

    return variable;
  }

  /**
   * @todo Write documentation
   */
  function createConstructor(_scope, _inputs, _outputs) {
    const _function = createFunctionModel(_scope, true, _inputs, _outputs);
    contract.contract.functions.push(_function);

    return _function;
  }

  /**
   * @todo Write documentation
   */
  function createFunction(_name, _scope, _inputs, _outputs) {
    const _function = createFunctionModel(
      _name,
      _scope,
      false,
      _inputs,
      _outputs
    );
    contract.contract.functions.push(_function);

    return _function;
  }

  contract.createVariable = createVariable;
  contract.createFunction = createFunction;
  contract.createConstructor = createConstructor;
  contract.createEvent = createEvent;

  return contract;
}

module.exports = createContractModel;
