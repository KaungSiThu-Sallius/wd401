const helloButton = document.getElementById('load-hello-module');
const WroldButton = document.getElementById('load-world-module');

helloButton.addEventListener('click', () => {
    import('./printHello')
        .then((printHello) => {
            printHello.default();
        })
        .catch((error) => {
            console.error('Error loading module PrintHello:', error);
        });
});

helloButton.addEventListener('click', () => {
    import('./printWorld')
        .then((printWorld) => {
            printWorld.default();
        })
        .catch((error) => {
            console.error('Error loading module PrintWorld:', error);
        });
});
