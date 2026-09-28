document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle?.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mainNav.classList.remove("open"));
  });

  // Add hobbies/activities to the visible list without reloading the page.
  const hobbyForm = document.getElementById("hobbyForm");
  const hobbyList = document.getElementById("hobbyList");

  hobbyForm?.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("hobbyName").value.trim();
    const description = document.getElementById("hobbyDescription").value.trim();

    if (!name || !description) return;

    const number = String(hobbyList.children.length + 1).padStart(2, "0");
    const item = document.createElement("li");
    item.innerHTML = `
      <span>${number}</span>
      <div><strong></strong><small></small></div>
    `;
    item.querySelector("strong").textContent = name;
    item.querySelector("small").textContent = description;
    hobbyList.appendChild(item);

    hobbyForm.reset();
  });

  // Image preview: the selected file stays local to the browser.
  const imageUpload = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");

  imageUpload?.addEventListener("change", () => {
    const file = imageUpload.files[0];
    imagePreview.innerHTML = "";
    if (!file) return;

    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.alt = "Selected image preview";
    image.onload = () => URL.revokeObjectURL(image.src);
    imagePreview.appendChild(image);
  });

  // Audio/video preview for a local file.
  const mediaUpload = document.getElementById("mediaUpload");
  const mediaPreview = document.getElementById("mediaPreview");

  mediaUpload?.addEventListener("change", () => {
    const file = mediaUpload.files[0];
    mediaPreview.innerHTML = "";
    if (!file) return;

    const url = URL.createObjectURL(file);
    const element = file.type.startsWith("video/")
      ? document.createElement("video")
      : document.createElement("audio");

    element.controls = true;
    element.src = url;
    element.setAttribute("aria-label", "Selected media preview");
    if (element.tagName === "VIDEO") element.style.width = "100%";
    mediaPreview.appendChild(element);
  });

  // Browser demonstration contact form.
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formStatus.textContent = "✓ Message accepted for this browser demonstration. No data was sent.";
    contactForm.reset();
  });

  // Subtle scroll reveal animation.
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach(item => observer.observe(item));
});
