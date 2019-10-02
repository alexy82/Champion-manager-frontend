const UNICODE_MAP = [
  { vi: "ÀÁẠÃẢàáạãảÂẦẤẬẪẨâầấậẫẩĂẰẮẶẴẲăằắặẵẳ", latin: "a" },
  { vi: "ÈÉẸẼẺèéẹẽẻÊỀẾỆỄỂêềếệễể", latin: "e" },
  { vi: "ỲÝỴỸỶỳýỵỹỷ", latin: "y" },
  { vi: "ÚÙỤŨỦúùụũủƯỨỪỰỮỬưứừựữử", latin: "u" },
  { vi: "ÍÌỊĨỈíìịĩỉ", latin: "i" },
  { vi: "ÓÒỌÕỎóòọõỏÔỐỒỘỖỔôốồộỗổƠỜỚỢỠỞơờớợỡở", latin: "o" },
  { vi: "Đđ", latin: "d" }
]
const LATIN_CHARACTERS_REGEX_STR = "a-zA-Z"
const VIETNAMESE_CHARACTERS_REGEX_STR = getVietnameseCharacters()
const VALID_CHARACTERS_REGEX = new RegExp(`[^${LATIN_CHARACTERS_REGEX_STR} ${VIETNAMESE_CHARACTERS_REGEX_STR}]`, "g")
function getVietnameseCharacters() {
  return UNICODE_MAP.reduce((str, item) => str + item.vi, "")
}
export function properName(name) {
  return name && removeSpecialCharactersAndMultipleSpaces(name).trim()
}
export function properNameIgnoreLastSpace(name) {
  return name && removeSpecialCharactersAndMultipleSpaces(name).trim()
}
export function removeSpecialCharactersAndMultipleSpaces(str) {
  return str.replace(VALID_CHARACTERS_REGEX, "").replace(/(\s)+/g, " ")
}
export function properTrim(name) {
  return name.trimStart().replace(/(\s)+/g, " ")
}
export function trimObject(obj) {
  if (obj) {
    if (typeof obj === "string") {
      return obj.trim()
    } else if (typeof obj === "object") {
      if (Array.isArray(obj)) {
        return obj.map(item => trimObject(item))
      } else {
        const keys = Object.keys(obj)
        return keys.reduce((trimedObj, key) => {
          trimedObj[key] = trimObject(obj[key])
          return trimedObj
        }, {})
      }
    } else {
      return obj
    }
  } else return obj
}
export function hasOnlyNumber(str) {
  return str.trim().length !== 0 && !/[^0-9\s]/g.test(str)
}
