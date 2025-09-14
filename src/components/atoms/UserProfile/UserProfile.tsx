import React, { forwardRef } from "react";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { ArrowDropDown } from "../Icon/IconSet";
import styles from "./UserProfile.module.scss";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export interface UserProfileProps extends WithSxProps {
  /** User's name */
  name: string;
  /** User's email */
  email?: string;
  /** User's avatar image URL */
  avatarSrc?: string;
  /** User's initials for avatar fallback */
  initials?: string;
  /** Avatar size */
  avatarSize?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Whether the component is clickable */
  clickable?: boolean;
  /** Whether to show the chevron icon */
  showChevron?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Variant style */
  variant?: "default" | "compact" | "detailed";
}

export const UserProfile = forwardRef<HTMLDivElement, UserProfileProps>(
  ({
    name,
    email,
    avatarSrc,
    initials,
    avatarSize = "md",
    clickable = false,
    showChevron = true,
    onClick,
    disabled = false,
    variant = "default",
    className = "",
    sx,
    style,
  }) => {
    const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
      sx,
      style,
      className
    );

    const containerClasses = combineClassNames(
      styles.userProfile,
      styles[`variant-${variant}`],
      clickable && styles.clickable,
      disabled && styles.disabled,
      sxClassName
    );

    const handleClick = () => {
      if (clickable && !disabled && onClick) {
        onClick();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (
        clickable &&
        !disabled &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        className={containerClasses}
        style={sxStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={clickable && !disabled ? 0 : undefined}
        role={clickable ? "button" : undefined}
        aria-disabled={disabled}
      >
        <div className={styles.content}>
          <Avatar
            src={avatarSrc}
            alt={name}
            size={avatarSize}
            className={styles.avatar}
            initials={
              initials ||
              name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            }
          />

          <div className={styles.textContent}>
            <Text
              variant="md"
              weight="semibold"
              color="primary"
              className={styles.name}
            >
              {name}
            </Text>
            {email && variant !== "compact" && (
              <Text variant="sm" color="secondary" className={styles.email}>
                {email}
              </Text>
            )}
          </div>
        </div>

        {showChevron && clickable && (
          <Icon
            icon={ArrowDropDown}
            size="sm"
            color="secondary"
            className={styles.chevron}
          />
        )}
      </div>
    );
  }
);

UserProfile.displayName = "UserProfile";

export default UserProfile;
