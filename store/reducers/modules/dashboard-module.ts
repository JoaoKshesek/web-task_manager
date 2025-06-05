import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ListOptions {
  page: number
  ordination: string
  perPage: number
  searchValue: string
}

interface DashboardModuleStateProps {
  listOptions: ListOptions
}

const initialState: DashboardModuleStateProps = {
  listOptions: {
    page: 1,
    perPage: 10,
    ordination: 'id,desc',
    searchValue: ''
  }
}

export const dashboardModuleSlice = createSlice({
  name: 'dashboardModule',
  initialState,
  reducers: {
    setListOptions: (state, action: PayloadAction<Partial<ListOptions>>) => {
      state.listOptions = { ...state.listOptions, ...action.payload }
    }
  }
})

export const { setListOptions } = dashboardModuleSlice.actions
