function getPageText() {
  const article = document.querySelector("article");
  if (article && article.innerText.trim().length > 100) {
    return article.innerText;
  }
  const divs = Array.from(document.querySelectorAll("div"))
    .map((el) => el.innerText.trim())
    .filter((text) => text.length > 100);
  if (divs.length > 0) {
    return divs.join("\n\n");
  }

  const paragraphs = Array.from(document.querySelectorAll("p"))
    .map((p) => p.innerText.trim())
    .filter((text) => text.length > 30);
  if (paragraphs.length > 0) {
    return paragraphs.join("\n\n");
  }
  const extra = Array.from(
    document.querySelectorAll("h1,h2,h3,li,span")
  )
    .map((el) => el.innerText.trim())
    .filter((text) => text.length > 40);
  if (extra.length > 0) {
    return extra.join("\n");
  }
  const allText = document.body.innerText;
  if (allText && allText.trim().length > 100) {
    return allText.trim();
  }
  return null;
}



chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log("Message received:", req);
  if (req.type === "GET_ARTICLE_TEXT") {
    const text = getPageText();
    console.log("Extracted text:", text?.slice(0, 100));
    sendResponse({ text });
    return true;
  }
});
