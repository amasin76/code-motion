import dedent from 'dedent';
import { type StateCreator } from 'zustand';
import { removeArrayAt, updateArrayAt } from '@/utils/array';
import { clamp } from '@/utils/number';

import {
  type DocSnapshot,
  getSumDuration,
  type RawDoc,
} from '../core/doc/raw-doc';

import { sliceResetFns } from '.';

export interface AppSliceState {
  doc: RawDoc;
  currentTime: number;
  playing: boolean;
}

export const initialState: AppSliceState = {
  doc: {
    language: 'tsx',
    fontSize: 30,
    lineHeight: 42,
    width: 1280,
    height: 720,
    theme: 'default',
    frameRate: 60,
    padding: {
      top: 0,
      left: 50,
      bottom: 0,
    },
    snapshots: [
      {
        id: '1',
        duration: 3000,
        transitionTime: 1000,
        code: dedent`
          import React, { Component, Fragment } from 'react';

          export class MyComponent extends Component {
            render(){
              return (
                <Fragment>
                  <h1>Code Motion</h1>
                  <p>💯 diff animation</p>
                </Fragment>
              );
            }
          }
        `,
      },
      {
        id: '2',
        duration: 3000,
        transitionTime: 1000,
        code: dedent`
          import React, { Fragment } from 'react';

          export function MyComponent {
            return (
              <Fragment>
                <h1>Code Motion</h1>
                <p>💯 diff animation</p>
              </Fragment>
            );
          }
      `,
      },
      {
        id: '3',
        duration: 3000,
        transitionTime: 1000,
        code: dedent`
          export function MyComponent {
            return (
              <>
                <h1>Code Motion</h1>
                <p>💯 diff animation</p>
              </>
            );
          }
      `,
      },
    ],
  },

  currentTime: 0,

  playing: false,
};

export interface AppSliceAction {
  updateSnapshot: (index: number, snapshot: DocSnapshot) => void;

  updateDocProperties: (doc: Omit<RawDoc, 'snapshots'>) => void;

  setCurrentTime: (currentTime: number) => void;

  gotoSnapshot: (index: number) => void;

  duplicateSnapshot: (index: number) => void;

  deleteSnapshot: (index: number) => void;

  setPlaying: (playing: boolean) => void;
}

function reviseStateCurrentTime<
  T extends Pick<AppSliceState, 'doc' | 'currentTime'>,
>(state: T): T {
  const totalDuration = getSumDuration(state.doc);
  return {
    ...state,
    currentTime: clamp(state.currentTime, 0, totalDuration),
  };
}

export const createAppSlice: StateCreator<
  AppSliceState & AppSliceAction,
  [],
  [],
  AppSliceState & AppSliceAction
> = (set, get) => (
  sliceResetFns.add(() => set(initialState)),
  {
    ...initialState,

    updateSnapshot(index, snapshot) {
      set((state) => {
        const snapshots = updateArrayAt(state.doc.snapshots, index, snapshot);
        const newDoc = {
          ...state.doc,
          snapshots,
        };

        return reviseStateCurrentTime({
          doc: newDoc,
          currentTime: state.currentTime,
        });
      });
    },

    updateDocProperties(doc) {
      set((state) => ({
        doc: {
          ...state.doc,
          ...doc,
        },
      }));
    },

    setCurrentTime(currentTime) {
      const clampCurrentTime = clamp(currentTime, 0, getSumDuration(get().doc));
      set((state) =>
        reviseStateCurrentTime({
          currentTime: clampCurrentTime,
          doc: state.doc,
        }),
      );
    },

    gotoSnapshot(index) {
      set((state) => {
        const newCurrentTime = getSumDuration(state.doc, index);

        return reviseStateCurrentTime({
          currentTime: newCurrentTime,
          doc: state.doc,
        });
      });
    },

    duplicateSnapshot(index) {
      set((state) => {
        const snapshot = state.doc.snapshots[index];
        const newSnapshot = {
          ...snapshot,
          id: String(Date.now()),
        };
        const snapshots = updateArrayAt(
          state.doc.snapshots,
          index + 1,
          newSnapshot,
        );
        const newDoc = {
          ...state.doc,
          snapshots,
        };
        const newCurrentTime = getSumDuration(state.doc, index + 1);

        return reviseStateCurrentTime({
          doc: newDoc,
          playing: false,
          currentTime: newCurrentTime,
        });
      });
    },

    deleteSnapshot(index) {
      set((state) => {
        const snapshots = removeArrayAt(state.doc.snapshots, index);

        const newDoc = {
          ...state.doc,
          snapshots,
        };

        return reviseStateCurrentTime({
          doc: newDoc,
          currentTime: state.currentTime,
        });
      });
    },

    setPlaying(playing) {
      set({ playing });
    },
  }
);

// reorderSnapshots: (newOrder: number[]) => void;
// reorderSnapshots(newOrder: number[]) {
// 	set((state) => {
// 		const reorderedSnapshots = reorderArray(state.doc.snapshots, newOrder);

// 		// Update doc with reordered snapshots
// 		return { ...state, doc: { ...state.doc, snapshots: reorderedSnapshots } };
// 	});
// },
