document.addEventListener('mousemove', (e) => {
    const title = document.getElementById('dynamicTitle');
    const rect = title.getBoundingClientRect();
    const titleCenterX = rect.left + rect.width / 2;
    const titleCenterY = rect.top + rect.height / 2;

    // Inverser le signe des deltas pour obtenir l'effet opposé
    const deltaX = (titleCenterX - e.clientX) / 40;
    const deltaY = (titleCenterY - e.clientY) / 40;

    title.style.textShadow = `${deltaX}px ${deltaY}px 6px rgba(0,0,0,0.5)`;

    requestAnimationFrame(() => {
        title.style.textShadow = `${deltaX}px ${deltaY}px 6px rgba(0,0,0,0.5)`;
    });
});