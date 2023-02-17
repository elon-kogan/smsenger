import { configureStore } from '@reduxjs/toolkit'
import reduxLogger from 'redux-logger'
import ThunkMiddleware from 'redux-thunk'

import reducer from './reducers'

import type { ThunkDispatch } from 'redux-thunk'

const store = configureStore({
  reducer,
  middleware: [reduxLogger, ThunkMiddleware],
})

export default store

type GetState = typeof store.getState
type RootState = ReturnType<GetState>
type AppDispatch = ThunkDispatch<RootState, void, ReturnType<typeof store.dispatch>>

export type { AppDispatch, GetState, RootState }
