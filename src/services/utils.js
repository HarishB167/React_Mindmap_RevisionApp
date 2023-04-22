// Ref : https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
export function hashCode(str) {
  // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - c.length) + c;
}

export function getContrastColor(hexColor) {
  // Convert hex color to RGB values
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Calculate perceived brightness using the formula
  // (0.299 * R + 0.587 * G + 0.114 * B)
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // If the brightness is greater than 128, return a darker version
  // of the color, otherwise return a lighter version
  if (brightness > 128) {
    return "#000";
  } else {
    return "#fff";
  }
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
