export interface ImageOptions {
    /** Width of the image */
    width?: number;
    /** Height of the image */
    height?: number;
    /** Image quality (1-100) */
    quality?: number;
    /** Image format (webp, jpg, png) */
    format?: "webp" | "jpg" | "png";
    /** Fit mode for the image */
    fit?: "crop" | "clamp" | "clip" | "scale-down" | "max";
    /** Whether to use blur placeholder */
    blur?: boolean;
    /** Blur amount (0-100) */
    blurAmount?: number;
}
export interface UnsplashImage {
    id: string;
    url: string;
    alt: string;
    photographer: string;
    photographerUrl: string;
    downloadUrl: string;
    width: number;
    height: number;
}
export interface UseImageReturn {
    /** Current image URL */
    imageUrl: string;
    /** Loading state */
    isLoading: boolean;
    /** Error state */
    error: string | null;
    /** Image metadata */
    imageData: UnsplashImage | null;
    /** Function to refresh/change image */
    refreshImage: () => void;
    /** Function to set custom image URL */
    setCustomImage: (url: string) => void;
    /** Function to clear custom image and use Unsplash */
    clearCustomImage: () => void;
}
export interface UseImageProps {
    /** Initial image URL (optional) */
    initialUrl?: string;
    /** Category for Unsplash search */
    category?: string;
    /** Specific search query */
    query?: string;
    /** Image options */
    options?: ImageOptions;
    /** Whether to use Unsplash by default */
    useUnsplash?: boolean;
    /** Fallback image URL */
    fallbackUrl?: string;
}
/**
 * Custom hook for managing images with Unsplash integration
 * Provides fallback images, error handling, and image management
 */
export declare const useImage: ({ initialUrl, category, query, options, useUnsplash, fallbackUrl, }?: UseImageProps) => UseImageReturn;
export default useImage;
