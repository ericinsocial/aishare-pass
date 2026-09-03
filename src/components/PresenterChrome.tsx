interface PresenterChromeProps {
  beat: number
  beats: number
}

/**
 * Minimal speaker readout. Not a navbar, not clickable.
 *
 * Beat dots only: the scene's internal number used to sit next to them, but
 * it is projected along with everything else on the stage, and the audience
 * has no business seeing the deck's internal numbering. Scenes keep their
 * slugs in the URL and in the registry — just not on the wall.
 */
export function PresenterChrome({ beat, beats }: PresenterChromeProps) {
  return (
    <div className="presenter-chrome">
      <div className="presenter-chrome__beats">
        {Array.from({ length: beats }, (_, index) => (
          <span
            key={index}
            className={[
              'presenter-chrome__dot',
              index < beat ? 'is-done' : '',
              index === beat ? 'is-current' : '',
            ]
              .join(' ')
              .trim()}
          />
        ))}
      </div>
    </div>
  )
}
