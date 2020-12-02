(() => {
    const updateViewportHeight = () => {
        const height = window.innerHeight;
        const vh = height * 0.01;

        document.getElementById("textHeight").innerHTML = height + "px";
        document.getElementById("textVh").innerHTML = vh + "px";
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateViewportHeight();

    window.addEventListener("resize", updateViewportHeight);
})();



