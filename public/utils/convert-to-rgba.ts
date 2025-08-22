export function hexToRgba(hex, alpha) {
    // Remove the # if present
    hex = hex.replace(/^#/, '');

    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
    }

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Ensure alpha is between 0 and 1
    if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
        throw new Error("Alpha must be a number between 0 and 1.");
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

