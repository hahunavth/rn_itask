import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { WeekModel, WeekSnapshot } from "../week/week"

export const WeekStoreModel = types
  .model("WeekStore")
  .props({
    weeks: types.optional(types.array(WeekModel), []),
  })
  // .extend(withEnvironment)
  .actions(
    (self) => ({
      setWeek: (weekSnapshots: WeekSnapshot[])  => {
        self.weeks.replace(weekSnapshots)
      }
    })
  )

type WeekStoreType = Instance<typeof WeekStoreModel>
export interface WeekStore extends WeekStoreType {}
type WeekStoreSnapshotType = SnapshotOut<typeof WeekStoreModel>
export interface WeekStoreSnapshot extends WeekStoreSnapshotType {}
export const createWeekStoreDefaultModel = () => types.optional(WeekStoreModel, {})
