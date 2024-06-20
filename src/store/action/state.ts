import Acoes from "@/models/Acoes";
import { Action } from "vuex";

export class ActionState {
  public acoes?: Acoes[];
}

export const state: ActionState = Object.assign(new ActionState(), {
  acoes: [],
});

export default state;
