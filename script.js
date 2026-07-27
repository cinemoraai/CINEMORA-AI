// ===============================
// CINEMORA AI - script.js
// ===============================

console.log("🎬 Welcome to Cinemora AI");

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
            e.preventDefault();

                    const target = document.querySelector(this.getAttribute("href"));

                            if (target) {
                                        target.scrollIntoView({
                                                        behavior: "smooth"
                                                                    });
                                                                            }
                                                                                });
                                                                                });

                                                                                // Hero button click
                                                                                const startButton = document.querySelector(".btn");

                                                                                if (startButton) {
                                                                                    startButton.addEventListener("click", () => {
                                                                                            alert("🚀 Welcome to Cinemora AI!\n\nVideo generation features are coming soon.");
                                                                                                });
                                                                                                }

                                                                                                // Simple page load animation
                                                                                                window.addEventListener("load", () => {
                                                                                                    document.body.style.opacity = "0";

                                                                                                        setTimeout(() => {
                                                                                                                document.body.style.transition = "opacity 0.8s ease";
                                                                                                                        document.body.style.opacity = "1";
                                                                                                                            }, 100);
                                                                                                                            });