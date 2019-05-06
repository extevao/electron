const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const templateGenerator = require('./template');

let tray = null;
let mainWindow = null;

app.on('ready', () => {
    console.log('Aplicacao iniciada');

    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    tray = new Tray(__dirname + '/app/img/icon-tray.png');
   
    let template = templateGenerator.gerarTrayTemplate(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template);

    tray.setContextMenu(trayMenu);

    let templateMenu = [
        {
            label: 'Menu menu',
            submenu: [
                { label: 'Item 1'},
                { label: 'Item 2'},
            ]
        }
    ];

    if (process.platform == 'darwin') {
        templateMenu.unshift({
            label: app.getName(),
            submenu: [ 
                { label: 'ITEM DO SUBMENU' }
            ]
        });
    }

    let menuPrincipal = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(menuPrincipal);


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


ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);

    tray.setContextMenu(novoTrayMenu);
});