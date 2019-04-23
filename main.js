const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');

let tray = null;

app.on('ready', () => {
    console.log('Aplicacao iniciada');

    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    tray = new Tray(__dirname + '/app/img/icon-tray.png');
    let trayMenu = Menu.buildFromTemplate([
        { label: 'Teste1' },
        { label: '', type: 'separator' },
        { label: 'Javascript', type: 'radio' }
    ]);

    tray.setContextMenu(trayMenu);

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
