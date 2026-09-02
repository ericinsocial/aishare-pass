interface PresenterChromeProps {
  sceneSlug: string
  beat: number
  beats: number
}

/** Minimal speaker readout. Not a navbar, not clickable. */
export function PresenterChrome({ sceneSlug, beat, beats }: PresenterChromeProps) {
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
      <span>{sceneSlug}</span>
    </div>
  )
}
