document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("visionBtn");

    if (btn) {
        if (localStorage.getItem("vision") === "on") {
            document.body.classList.add("vision");
            btn.textContent = "Обычная версия";
        }

        btn.addEventListener("click", () => {
            document.body.classList.toggle("vision");
            const isOn = document.body.classList.contains("vision");
            localStorage.setItem("vision", isOn ? "on" : "off");
            btn.textContent = isOn ? "Обычная версия" : "Версия для слабовидящих";
        });
    }

    initGallery();
});
function initGallery() {
    const gallery = document.querySelector("[data-gallery]");
    if (!gallery) return;

    const stage = gallery.querySelector(".gallery-stage");
    const items = gallery.querySelectorAll(".gallery-thumbs img, .gallery-thumbs video");
    const prevBtn = gallery.querySelector(".gal-prev");
    const nextBtn = gallery.querySelector(".gal-next");

    let currentIndex = 0;

    function render(index) {
        stage.innerHTML = "";
        items.forEach(i => i.classList.remove("active"));

        const item = items[index];
        item.classList.add("active");

        let element;

        if (item.dataset.type === "video") {
            element = document.createElement("video");
            element.src = item.src;
            element.controls = true;
            element.playsInline = true;
            element.addEventListener("click", e => {
                e.stopPropagation();
            });
        } else {
            element = document.createElement("img");
            element.src = item.src;
            element.addEventListener("click", () => openFullscreenImage(item.src));
        }

        stage.appendChild(element);
    }

    items.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentIndex = index;
            render(currentIndex);
        });
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        render(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        render(currentIndex);
    });

    render(currentIndex);
}
function openFullscreenImage(src) {
    if (document.querySelector(".fullscreen")) return;

    const overlay = document.createElement("div");
    overlay.className = "fullscreen";

    const img = document.createElement("img");
    img.src = src;

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => overlay.remove());
}

