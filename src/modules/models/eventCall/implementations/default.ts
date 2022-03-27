import { ICreateEventCallDTO } from "../types/ICreateEventCallDTO";
import { IEventCall } from "../types/IEventCall";

/**
 * @author Levy Santiago
 * @module
 * @category Model
 * @name createEventModel
 * @description A <b>Factory</b> for creating an event object model (json).
 * This object later is used as a call for the event, so the event is created
 * automatically based in the inputs.
 * @param {string} _name The name for the event.
 * @param {Object[]} [_inputs=[]] The list of inputs.
 * @returns {Object} The event object model.
 * @example
 * Usage
 * const inputs = [
 *     {
 *       name: "name",
 *       type: "string",
 *     },
 *     {
 *       name: "count",
 *       type: "uint",
 *     },
 *   ]);
 * const eventModel = createEventModel("myEvent",inputs);
 *
 * Return
 * {
 *   statement: "eventcall",
 *   name: "myEvent",
 *   inputs: [
 *   {
 *       name: "name",
 *       type: "string",
 *     },
 *     {
 *       name: "count",
 *       type: "uint",
 *     }
 *   ],
 *   setInput: [Function]
 * }
 *
 */
function createEventCallModel({
  name,
  inputs = [],
}: ICreateEventCallDTO): IEventCall {
  /**
   * @author Levy Santiago
   * @member {Object}
   * @name event
   * @description The event object to be returned.
   * @property {string} statement The identificator of the statement.
   * @property {string} name The event name.
   * @property {string} inputs The list of inputs.
   */
  const event: IEventCall = {
    statement: "event_call",
    name,
    inputs,
  };

  return event;
}

export default createEventCallModel;
