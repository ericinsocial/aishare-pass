/**
 * Barrel for the scenes owned by this workstream (05 / 06 / 08).
 *
 * This is intentionally *not* a deck registry and *not* a router: it only
 * re-exports the components and their beat counts so the presenter shell that
 * lives elsewhere can register them. Scene 07 does not exist in the final
 * registry and is deliberately absent — the numbering is not padded.
 */
export { default as Scene05, beats as scene05Beats } from './Scene05';
export { default as Scene06, beats as scene06Beats } from './Scene06';
export { default as Scene08, beats as scene08Beats } from './Scene08';
export type { SceneProps, SceneModule } from './types';
