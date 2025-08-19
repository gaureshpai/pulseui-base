# Progress Bar Component

A flexible and accessible progress bar component that displays progress with smooth animations, multiple variants, and comprehensive customization options.

## Features

- **Multiple Sizes**: `sm`, `md`, `lg` variants with appropriate scaling
- **Visual Variants**: `default`, `success`, `warning`, `error`, `info` color schemes
- **Animation Support**: Smooth progress transitions and indeterminate loading states
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Design System Compliant**: Uses design tokens for colors, typography, and spacing
- **Responsive**: Adapts to different screen sizes
- **Customizable**: Support for custom labels, helper text, and percentage display

## Design System Integration

The Progress Bar component fully integrates with the PulseUI design system:

### Typography

- **Font Family**: Uses `var(--font-family)` (Roboto system font stack)
- **Font Sizes**:
  - Small: `var(--font-size-xs)` (12px)
  - Medium: `var(--font-size-sm)` (14px)
  - Large: `var(--font-size-md)` (16px)
- **Font Weights**:
  - Labels: `var(--font-weight-medium)` (500)
  - Helper text: `var(--font-weight-normal)` (400)
- **Line Heights**: `var(--line-height-normal)` (1.5)

### Colors

- **Text Colors**:
  - Primary: `var(--color-text-primary)`
  - Secondary: `var(--color-text-secondary)`
- **Progress Fill**: Uses semantic color variants (blue, green, yellow, red)
- **Track Background**: `var(--color-surface-3)`
- **Shadows**: `var(--color-shadow)`

### Spacing

- **Gaps**:
  - Small: `var(--spacing-xs)` (4px)
  - Medium: `var(--spacing-sm)` (8px)
  - Large: `var(--spacing-md)` (16px)
- **Border Radius**: `var(--radius-md)` (8px)

## Usage

### Basic Progress Bar

```tsx
import { ProgressBar } from "pulseui";

<ProgressBar
  value={75}
  label="Upload Progress"
  helperText="File upload in progress..."
/>;
```

### With Percentage Display

```tsx
<ProgressBar
  value={65}
  label="Installation Progress"
  helperText="Installing dependencies..."
  showPercentage
/>
```

### Different Variants

```tsx
<ProgressBar
  value={90}
  variant="success"
  label="Task Completed"
  helperText="All tasks finished successfully!"
  showPercentage
/>
```

### Indeterminate Loading State

```tsx
<ProgressBar
  indeterminate
  label="Processing..."
  helperText="Please wait while we process your request"
  variant="info"
/>
```

### Custom Sizes

```tsx
<ProgressBar
  value={45}
  size="sm"
  label="Compact Progress"
  helperText="Small space usage"
/>
```

## Props

| Prop             | Type                                                       | Default      | Description                              |
| ---------------- | ---------------------------------------------------------- | ------------ | ---------------------------------------- |
| `value`          | `number`                                                   | **required** | Current progress value (0-100)           |
| `max`            | `number`                                                   | `100`        | Maximum progress value                   |
| `label`          | `string`                                                   | -            | Label displayed above progress bar       |
| `helperText`     | `string`                                                   | -            | Helper text displayed below progress bar |
| `size`           | `'sm' \| 'md' \| 'lg'`                                     | `'md'`       | Size variant                             |
| `variant`        | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'`  | Visual variant                           |
| `showPercentage` | `boolean`                                                  | `false`      | Whether to show percentage               |
| `animated`       | `boolean`                                                  | `true`       | Whether progress is animated             |
| `indeterminate`  | `boolean`                                                  | `false`      | Loading state (ignores value)            |
| `className`      | `string`                                                   | -            | Custom CSS class                         |
| `sx`             | `any`                                                      | -            | Custom styles object                     |
| `style`          | `CSSProperties`                                            | -            | Inline styles                            |
| `ariaLabel`      | `string`                                                   | -            | Custom ARIA label                        |

## Accessibility

- **ARIA Role**: `progressbar`
- **ARIA Attributes**:
  - `aria-valuenow`: Current progress value
  - `aria-valuemin`: Minimum value (0)
  - `aria-valuemax`: Maximum value
  - `aria-label`: Descriptive label
- **Keyboard Navigation**: Focus states with visible indicators
- **Screen Reader Support**: Proper labeling and value announcements
- **High Contrast**: Enhanced visibility in high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Animation Features

### Progress Animation

- Smooth width transitions using CSS cubic-bezier easing
- Shimmer effect for animated progress bars
- Configurable animation duration

### Indeterminate Animation

- Continuous moving gradient for loading states
- Smooth background position animation
- Appropriate for unknown progress scenarios

## Responsive Behavior

- **Mobile**: Adjusted spacing and typography for smaller screens
- **Tablet**: Optimized layout for medium viewports
- **Desktop**: Full feature set with optimal spacing

## Browser Support

- **Modern Browsers**: Full support for all features
- **CSS Grid/Flexbox**: Required for layout
- **CSS Custom Properties**: Required for theming
- **CSS Animations**: Required for smooth transitions

## Performance Considerations

- **Efficient Rendering**: Minimal DOM updates
- **CSS Transitions**: Hardware-accelerated animations
- **Debounced Updates**: Smooth progress changes
- **Memory Management**: Proper cleanup of intervals and timeouts

## Examples

See the Storybook stories for comprehensive examples:

- Basic usage patterns
- All size and variant combinations
- Interactive demonstrations
- Real-world use cases
- Accessibility demonstrations

## Design Guidelines

1. **Use appropriate variants** for different contexts:

   - `success` for completed tasks
   - `warning` for pending operations
   - `error` for failed processes
   - `info` for informational progress

2. **Provide meaningful labels** that describe what is progressing

3. **Include helper text** for additional context when needed

4. **Choose appropriate sizes** based on available space and importance

5. **Consider animation** for better user experience, but respect motion preferences


