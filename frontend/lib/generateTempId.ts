let nextTempId = -1;

export function generateTempId() {
  return nextTempId--;
}
