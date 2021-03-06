// import createContentWriter from "@writers/contentWriter";
// import createInputWriter from "@writers/statements/inputWriter";
// import createOutputWriter from "@writers/statements/outputWriter";
// import createRequest from "@models/request";
import { IGlobalVariable } from "@models/globalVariable/types/IGlobalVariable";
// import { IFunction } from "@models/function/types/IFunction";
// import { IRequest } from "@models/request/types/IRequest";
// import { ILocalVariable } from "@models/variable/types/ILocalVariable";
// import { IVariable } from "@models/variable/types/IVariable";
// import { IContents } from "@models/content/types/IContents";
// import { IFunctionWriter } from "../types/IFunctionWriter";
// import { IFunctionJson } from "@models/function/types/IFunctionJson";

// /**
//  * @name createFunctionWriter
//  * @description A **Factory** that creates a new writer of contract functions.
//  * @param {Object[]} variables The contract variables defined.
//  * @example
//  * {
//  *     type: "string",
//  *     scope: "public",
//  *     name: "message",
//  *     setMethod: true,
//  *   },
//  *   {
//  *     type: "string[]",
//  *     scope: "public",
//  *     name: "messages",
//  *     setMethod: true,
//  *   }
//  */
// function createFunctionWriter(
//   variables: Array<IGlobalVariable>
// ): IFunctionWriter {
//   const inputWriter = createInputWriter();
//   const contentWriter = createContentWriter();

//   function _selectFunctionVariables(
//     func: IFunctionJson
//   ): Array<ILocalVariable> {
//     const localVariables: Array<any> = func.content.filter(
//       (item: IContents) => {
//         return item.statement === "variable";
//       }
//     );

//     return localVariables;
//   }

//   const functionWriter: IFunctionWriter = {
//     /**
//      * @name write
//      * @description Define all functions of the contract
//      * @param {Object[]} functions The Object list of functions to be wrote in Solidity code.
//      * @param {Function} cb A callback function to handle the request values.
//      * @returns {string} **String** of all functions in Solidity format.
//      * @example
//      * Json
//      * [
//      *   {
//      *     name: "myFunction",
//      *     isConstructor: false,
//      *     inputs: [
//      *       {
//      *         name: "_input1",
//      *         type: "string"
//      *       }
//      *     ],
//      *     outputs: [],
//      *     content: {
//      *       assignment: {
//      *         variable: "input1",
//      *         value: "_input1"
//      *       }
//      *     }
//      *   }
//      * ]
//      *
//      * Return
//      * function myFunction(string _input1){
//      *   input1 = _input1;
//      * }
//      *
//      * // If isConstructor is true, the name of the function
//      * // will be desconsidered, and the return will be
//      * Return
//      * constructor(string _input1){
//      *   input1 = _input1;
//      * }
//      */
//     write(
//       functions: Array<IFunctionJson>,
//       callback: (request: IRequest) => void
//     ): string {
//       let text = "//FUNCTIONS\n";
//       let request = createRequest();

//       functions.map((f) => {
//         const localVariables = _selectFunctionVariables(f);
//         const concatenedVariables: Array<IVariable> = Array.prototype.concat(
//           variables,
//           localVariables
//         );
//         const outputWriter = createOutputWriter(concatenedVariables);
//         let text_return = "";
//         let text_returns = "";
//         const scope = ` ${f.scope}`;
//         // Verifying whether is a constructor or not
//         // Opening the inputs clousure
//         if (f.isConstructor) {
//           text += "constructor(";
//         } else {
//           text += `function ${f.name}(`;
//         }

//         //   const inputs = [];
//         //   let copy;
//         //   f.inputs.map((input) => {
//         //     copy = { ...input };
//         //     copy.type += " memory";
//         //     inputs.push(copy);
//         //   });

//         // Writing the inputs
//         text += inputWriter.write(f.inputs);

//         // Requiring outputs
//         text_return += outputWriter.write(f.outputs, (_request) => {
//           text_returns = _request.text_returns;
//         });

//         // Organizing all modifiers
//         let modifiers = "";
//         if (f.modifiers) {
//           f.modifiers.map((modifier) => {
//             modifiers += ` ${modifier}`;
//             return modifier;
//           });
//         }

//         // Closing inputs and setting scope
//         text += `)${scope}${modifiers}`;

//         // Setting the returns text
//         if (text_returns) {
//           text += ` ${text_returns} `;
//         }

//         // Opening the content clousure
//         text += "{\n";

//         // Writing function content
//         text += contentWriter.write(f.content, (_request) => {
//           request = _request;
//         });

//         // Setting the return values
//         text += text_return;

//         // Closing the function
//         text += "}\n\n";

//         return text;
//       });

//       if (callback && typeof callback === "function") {
//         callback(request);
//       }

//       return text;
//     },
//   };

//   return functionWriter;
// }

// export default createFunctionWriter;
