// Mobile menu and form handling.
(function () {
	const toggle = document.querySelector(".menu-toggle");
	const nav = document.getElementById("site-nav");
	if (toggle && nav) {
		toggle.addEventListener("click", () => {
			const open = nav.classList.toggle("open");
			toggle.setAttribute("aria-expanded", String(open));
			toggle.textContent = open ? "Close" : "Menu";
		});
	}

	// The application asks for at least one intended use.
	const apply = document.querySelector('form[name="apply"]');
	if (apply) {
		apply.addEventListener("submit", (e) => {
			const uses = apply.querySelectorAll('input[name="use"]:checked');
			const first = apply.querySelector('input[name="use"]');
			first.setCustomValidity(uses.length ? "" : "Choose at least one option, or \"Not sure yet\".");
			if (!uses.length) { e.preventDefault(); first.reportValidity(); }
		});
		apply.addEventListener("change", (e) => {
			if (e.target.name === "use") apply.querySelector('input[name="use"]').setCustomValidity("");
		});
	}

	// Local and GitHub Pages previews have no form backend, so show what would happen instead of failing.
	const isPreview = ["localhost", "127.0.0.1", ""].includes(location.hostname) || location.hostname.endsWith("github.io");
	if (isPreview) {
		document.querySelectorAll("form[data-netlify]").forEach((form) => {
			form.addEventListener("submit", (e) => {
				if (e.defaultPrevented) return;
				e.preventDefault();
				form.querySelector(".form-status").textContent =
					"Preview only: on the live site this submission is emailed to team@foundationcivic.ai.";
			});
		});
	}
})();
