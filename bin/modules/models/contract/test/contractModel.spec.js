"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import createSmartcheck from "../../../../test/lib/smartcheck";
var helpers_1 = __importDefault(require("../../../../utils/helpers"));
var assert_1 = __importDefault(require("assert"));
var tsyringe_1 = require("tsyringe");
var example_contract_4 = require("../../../../test/examples/modeling/contract-4.json");
// const writing_path = `${__dirname}/../../../examples/writing/`;
// const web3 = new Web3(ganache.provider());
// const accounts: Array<string> = [];
// const smartCheck = createSmartcheck();
// before(async () => {
//   accounts = await web3.eth.getAccounts();
// });
describe("Test Contract", function () {
    var contractModel = tsyringe_1.container.resolve("ContractModel");
    // Expected values
    var expected_model = JSON.stringify(example_contract_4);
    var expected_code = "";
    // Actual values
    var actual_code = "";
    var gContract;
    it("Object creation", function () {
        // Creating contract
        gContract = contractModel.execute("DHT11");
        assert_1.default.ok(!helpers_1.default.isObjEmpty(gContract), "Error while creating gContract");
        assert_1.default.ok(!helpers_1.default.isObjEmpty(gContract), "Error while creating gContract");
    });
    // MODELING
    it("Modeling DHT11", function () {
        // Creating the variables
        gContract.createVariable("address", "manager", "public");
        gContract.createVariable("string", "name", "public");
        gContract.createVariable("uint256", "value1", "public");
        gContract.createVariable("uint256", "max_value1", "public");
        gContract.createVariable("uint256", "min_value1", "public");
        // Creating events
        gContract.createEvent("temperatureOverflow", [
            { name: "value1", type: "uint256" },
            { name: "max_value1", type: "uint256" },
        ]);
        gContract.createEvent("temperatureUnderflow", [
            { name: "value1", type: "uint256" },
            { name: "min_value1", type: "uint256" },
        ]);
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
        gContract
            .createFunction("setName", "public")
            .setInput("string", "_name")
            .setAssignment("name", "_name");
        // Asserting the result
        expect(gContract.toString()).toEqual(JSON.stringify(JSON.parse(expected_model)[0]));
    });
    // WRITING
    // it("Writing", () => {
    //   // Testing if writing two times the code breaks
    //   gContract.write();
    //   // Writing again
    //   actual_code = gContract.write();
    //   expected_code = fs.readFileSync(`${writing_path}contract-4.txt`, {
    //     encoding: "utf8",
    //   });
    //   assert.strictEqual(actual_code, expected_code);
    // });
    // // CHECKING CONTRACTS
    // it.skip("smartcheck it", () => {
    //   // Defining filepath
    //   const filepath = `${__dirname}/contract.sol`;
    //   // Creating file for testing
    //   fs.writeFileSync(filepath, actual_code, {
    //     encoding: "utf8",
    //     flag: "w",
    //   });
    //   // Executing smartcheck
    //   const result = smartCheck.run(filepath);
    //   // Removing testing file
    //   execSync(`rm ${filepath}`);
    //   assert.ok(!result.severities[0], result.resultString);
    // }).timeout(0);
    // // COMPILING
    // it("Compiling", () => {
    //   const compiled = gContract.compile((errors) => {
    //     if (Array.isArray(errors)) {
    //       errors.map((e) => {
    //         console.log(e.formattedMessage);
    //       });
    //     }
    //   });
    //   const config = createConfig(expected_code);
    //   const expected_json = solc.compile(config);
    //   const actual_json = JSON.stringify(compiled);
    //   assert.strictEqual(actual_json, expected_json);
    // }).timeout(0);
    // // DEPLOYING
    // it("Deploying", async () => {
    //   try {
    //     const instance = await gContract.deploy(
    //       {
    //         from: accounts[0],
    //         args: [accounts[0]],
    //         gas: 4000000,
    //       },
    //       web3
    //     );
    //     assert.ok(instance.options, "should have a options property.");
    //     assert.ok(instance.options.address, "should have a deployed address.");
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }).timeout(0);
});