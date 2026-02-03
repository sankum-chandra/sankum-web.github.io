async function loadIncludes() {
  const nodes = document.querySelectorAll("[data-include]");
  await Promise.all([...nodes].map(async (node) => {
    const file = node.getAttribute("data-include");
    const res = await fetch("/" + file.replace(/^\/+/, ""));
    if (!res.ok) throw new Error(`Failed to load include: ${file}`);
    const html = await res.text();
    node.outerHTML = html;
  }));
}

loadIncludes()
  .then(() => document.dispatchEvent(new Event("includes:loaded")))
  .catch(console.error);