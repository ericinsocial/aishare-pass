/**
 * Shared contract for the scenes in this folder.
 *
 * These scenes are *presentation-only*. They do not own routing, key handling,
 * or timers — the presenter shell decides which scene is on screen and which
 * beat it is on (advanced by the left / right arrow keys). There is no
 * autoplay anywhere in this folder, by design.
 */
export interface SceneProps {
  /**
   * 0-based beat index supplied by the presenter.
   * Values outside `[0, beats - 1]` are clamped by the scene itself, so the
   * presenter can be naive about bounds.
   */
  beat: number;
  /**
   * Optional override for the scene's background artwork. Defaults to the
   * original file that ships with this repo — the artwork is never
   * regenerated, only positioned.
   */
  imageSrc?: string;
}

/**
 * What a scene exposes to the presenter registry: the component plus how many
 * beats it needs before the deck should move on to the next scene.
 */
export interface SceneModule {
  Component: (props: SceneProps) => JSX.Element;
  beats: number;
}
