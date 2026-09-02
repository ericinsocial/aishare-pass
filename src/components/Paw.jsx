export default function Paw({ size = 28, color = 'currentColor', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
      aria-hidden="true"
      style={style}
    >
      <ellipse cx="16" cy="21" rx="8" ry="6.4" />
      <ellipse cx="6.6" cy="13.4" rx="3.5" ry="4.4" />
      <ellipse cx="25.4" cy="13.4" rx="3.5" ry="4.4" />
      <ellipse cx="12.2" cy="7.4" rx="3.3" ry="4.2" />
      <ellipse cx="19.8" cy="7.4" rx="3.3" ry="4.2" />
    </svg>
  )
}
