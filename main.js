const { app, BrowserWindow, ipcMain } = require('electron');
const data = require('./data');

app.on('ready', () => {
    console.log('Aplicacao iniciada');

    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

});

app.on('window-all-closed', () => {
    app.quit();
});

let sobreWindow = null;

ipcMain.on('abrir-janela-sobre', () => {
    console.log('Abrindo janela sobre');

    if (!sobreWindow) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 220,
            alwaysOnTop: true,
            frame: false
        });

        sobreWindow.on('closed', () => sobreWindow = null );
    }
    

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);


});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});


ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    console.log({ curso, tempoEstudado })
    data.salvaDados(curso, tempoEstudado);
});
