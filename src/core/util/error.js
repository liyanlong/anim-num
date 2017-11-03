
export function assertError (check, msg) {
  if (check) {
    throw new Error(msg)
  }
}