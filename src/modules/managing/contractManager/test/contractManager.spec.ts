import fs from "fs";
import solc from "solc";
import createContractManager from "../implementations/default";
const writing_path = __dirname + "/../../../../test/examples/writing/";
const expectedJson = JSON.stringify(
  require("@test/examples/modeling/contract-5.json")
);
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());
let accounts: string[];
beforeAll(async () => {
  accounts = await web3.eth.getAccounts();
});

describe("Contract Manager Writer", () => {
  const gContractManager = createContractManager(web3);

  it("Writing Contract Manager", () => {
    const gContract = gContractManager.newContract("DHT11");
    const gContractController = gContractManager.newContract("Controller");

    const expected = fs.readFileSync(writing_path + "contract-5.txt", {
      encoding: "utf8",
    });

    // Creating the variables
    gContract.createVariable("address", "manager", "public");
    gContract.createVariable("string", "name", "public", true);
    gContract.createVariable("uint256", "value1", "public");
    gContract.createVariable("uint256", "max_value1", "public");
    gContract.createVariable("uint256", "min_value1", "public");

    // Creating constructor
    gContract
      .createConstructor("public")
      .setInput("address", "_owner")
      .setAssignment("manager", "_owner")
      .setAssignment("name", '"DHT11"');

    // Creating a new function
    gContract
      .createFunction("setValue", "public")
      .setInput("uint256", "_val")
      .setInput("uint256", "_valueId")
      .beginIf("_valueId == 1")
      .setAssignment("value1", "_val")
      .beginIf("value1 >= max_value1")
      .setEventCall("temperatureOverflow", ["value1", "max_value1"])
      .endIf()
      .beginElseIf("value1 <= min_value1")
      .setEventCall("temperatureUnderflow", ["value1", "min_value1"])
      .endElseIf()
      .endIf();

    // Modeling Variables
    gContractController.createVariable("DHT11[]", "contracts", "public");
    gContractController.createVariable(
      "uint256",
      "counter",
      "private",
      false,
      "0"
    );

    // Modeling Functions
    gContractController
      .createFunction("createContract", "public")
      .setInput("address", "_owner")
      .setContractVariable("newContract", "DHT11", ["_owner"])
      .setMethodCall("contracts", "push", "newContract")
      .setAssignment("counter", "counter + 1");

    gContractController
      .createFunction("getLastContract", "public")
      .setOutput("_contract")
      .setVariable("DHT11", "_contract", "")
      .beginIf("counter > 0")
      .setAssignment("_contract", "contracts[counter - 1]")
      .endIf()
      .beginElse()
      .setAssignment("_contract", "contracts[0]")
      .endIf();

    const resultJson = JSON.stringify(gContractManager.contracts);
    const result = gContractManager.writeAll();

    // const deployed = gContract.compile((err) => {});
    // console.log(JSON.stringify(deployed));

    // Testing json
    expect(resultJson).toEqual(expectedJson);
    // Testing code
    expect(result).toEqual(expected);
  });

  // COMPILING
  it("Compiling", () => {
    const compiled = gContractManager.compileAll((errors) => {
      if (Array.isArray(errors)) {
        errors.map((e) => {
          // console.log(e.formattedMessage);
        });
      }
    });

    const config = JSON.stringify({
      language: "Solidity",
      sources: {
        jsons: {
          content: gContractManager.written(),
        },
      },
      settings: {
        outputSelection: {
          // return everything
          "*": {
            "*": ["*"],
          },
        },
      },
    });

    const expected_json = solc.compile(config);
    const actual_json = JSON.stringify(compiled);

    expect(actual_json).toEqual(expected_json);
  });

  // DEPLOYING
  it("Deploying Controller", async () => {
    const instance = await gContractManager.deploy("Controller", {
      from: accounts[0],
      args: [],
      gas: 4000000,
    });
    expect(instance).toHaveProperty("options");
    expect(instance.options).toHaveProperty("address");
  });
});
