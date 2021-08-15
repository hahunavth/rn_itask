import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const WeekModel = types.model("Week").props({
  id: types.identifierNumber,
  date: types.maybe(types.Date),
  selected: types.maybe(types.boolean),
  today: types.maybe(types.boolean),
})

type WeekType = Instance<typeof WeekModel>
export interface Week extends WeekType {}
type WeekSnapshotType = SnapshotOut<typeof WeekModel>
export interface WeekSnapshot extends WeekSnapshotType {}
export const createWeekDefaultModel = () => types.optional(WeekModel, {})
