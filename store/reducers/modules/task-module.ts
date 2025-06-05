import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ListOptions {
  page: number
  ordination: string
  perPage: number
  searchValue: string
}

interface TaskModuleStateProps {
  listOptions: ListOptions
}

const initialState: TaskModuleStateProps = {
  listOptions: {
    page: 1,
    perPage: 10,
    ordination: 'id,desc',
    searchValue: ''
  }
}

export const taskModuleSlice = createSlice({
  name: 'taskModule',
  initialState,
  reducers: {
    setListOptions: (state, action: PayloadAction<Partial<ListOptions>>) => {
      state.listOptions = { ...state.listOptions, ...action.payload }
    }
  }
})

export const { setListOptions } = taskModuleSlice.actions
