const isbnKeywordRegExp = new RegExp(/isbn-13|isbn13|ISBN-13|isbn|ISBN/, "g");

/**
 * ISBN-13 can be written the following ways:
 * 978-1-86197-876-9
 * 978 1 86197 876 9
 * 978-1861978769
 * 9781861978769
 */
const isbn13RegExp = new RegExp(
  /978-\d{10}|\978\d{10}|978-\d{1}-\d{5}-\d{3}-\d{1}|978\s\d{1}\s\d{5}\s\d{3}\s\d{1}/,
  "g"
);

function getDOMContent() {
  const bodyContent = document.getElementsByTagName("body")[0].innerHTML;
  return bodyContent;
}

/**
 * Check if given 13 digit string number is a valid ISBN-13 based on
 * {@link https://isbn-information.com/the-13-digit-isbn.html| this guide}.
 * @param possibleISBN13 - contains 13 digit number defined by {@link isbn13RegExp | isbn13RegExp}.
 * @returns boolean
 */
function validateISBN13(possibleISBN13: string) {
  // strip all dash and spaces
  const cleanedPossibleISBN13 = possibleISBN13
    .replace("-", "")
    .replace(" ", "");

  const checkDigitIndex = cleanedPossibleISBN13.length - 1;
  const checkDigit = cleanedPossibleISBN13[checkDigitIndex];
  const restOfDigits = cleanedPossibleISBN13.slice(0, checkDigitIndex);

  // evaluate ISBN13:
  let sumOfWeights = 0;
  for (let i = 0; i < restOfDigits.length; i++) {
    const digitNum = Number(restOfDigits[i]);
    if (i % 2 === 0) {
      sumOfWeights += digitNum * 1;
    } else {
      sumOfWeights += digitNum * 3;
    }
  }
  const remainder = sumOfWeights % 10;
  const correctCheckDigit = 10 - remainder;

  return Number(checkDigit) === correctCheckDigit;
}

async function findISBN13(tabId: number) {
  const tabContent = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: getDOMContent,
  });

  const tabContentSplitByISBNKeyword =
    tabContent[0].result.split(isbnKeywordRegExp);

  if (tabContentSplitByISBNKeyword.length === 1) {
    return null;
  }

  const possibleISBNs = tabContentSplitByISBNKeyword.reduce(
    (prev, currContent, idx) => {
      // skip the first index since that does not contain any ISBNs
      if (idx === 0) {
        return prev;
      }

      const isbn13Matches = currContent.match(isbn13RegExp);
      if (isbn13Matches?.length) {
        return [...prev, ...isbn13Matches];
      }

      return prev;
    },
    [] as string[]
  );

  const validISBNs = possibleISBNs.filter((possibleISBN) =>
    validateISBN13(possibleISBN)
  );

  if (!validISBNs.length) {
    return null;
  }

  const cleanedValidISBN = validISBNs[0].replace(/-|\s/g, "");

  return cleanedValidISBN;
}

export default findISBN13;
