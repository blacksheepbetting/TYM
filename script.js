document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.add('moving');
    window.setTimeout(() => document.body.classList.remove('moving'), 500);
  });
});
