import { budgetConstants as types } from '../constants';


export function budgetActualListReducer(state = [], { type, payload }) {

  switch (type) {
    case types.SET_BUDGET_ACTUAL_LIST:
      return payload
    case types.CLEAR_BUDGET_ACTUAL_LIST:
      return [];
    default:
      return state
  }
}

export function budgetTemplateReducer(state = [], { type, payload }) {
  switch (type) {
    case types.SET_BUDGET_TEMPLATE:
      return payload
    case types.CLEAR_BUDGET_TEMPLATE:
      return [];
    default:
      return state
  }
}

export function projectsBudgetListReducer(state = [], { type, payload }) {
  switch (type) {
    case types.SET_PROJECTS_BUDGET_LIST:
      return payload;
    case types.CLEAR_PROJECTS_BUDGET_LIST:
      return [];
    default:
      return state
  }
}

export function actualForBudgetReducer(state = [], { type, payload }) {
  switch (type) {
    case types.SET_ACTUAL_FOR_BUDGET:
      return payload;
    case types.CLEAR_ACTUAL_FOR_BUDGET:
      return [];
    default:
      return state
  }
}
