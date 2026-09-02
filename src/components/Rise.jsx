/**
 * The single reveal primitive every scene is built from: an element that
 * animates in once `show` flips true, optionally staggered by `delay`.
 */
export default function Rise({
  show,
  delay = 0,
  variant = '',
  as: Tag = 'div',
  className = '',
  style,
  children,
  ...rest
}) {
  const variants = variant
    .split(' ')
    .filter(Boolean)
    .map((v) => `rise--${v}`)
    .join(' ')

  return (
    <Tag
      className={['rise', variants, show ? 'on' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
