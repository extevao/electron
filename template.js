const data = require('./data');
const { ipcMain } = require('electron');

module.exports = {
    templateInicial: null,
    gerarTrayTemplate(win) {

        let template = [
            { label: 'Cursos' },
            { label: '', type: 'separator' },
        ];

        let cursos = data.pegaNomeDosCursos();

        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', curso);
                }
            };

            template.push(menuItem);
        });

        this.templateInicial = template;

        return template;
    },

    adicionaCursoNoTray(curso, win) {
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', curso);
            }
        });

        return this.templateInicial;
    },

    geraMenuPrincipalTemplate() {
        let templateMenu = [
            {
                label: 'Window',
                submenu: [
                    {
                        role: 'minimize',
                        accelerator: 'Shift+M'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    {
                        role: 'reload'
                    },
                    {
                        role: 'toggledevtools'
                    }
                ]
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre o Alura Timer',
                        accelerator: 'CmdOrCtrl+I',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre');
                        }
                    }
                ]
            },

        ];

        if (process.platform == 'darwin') {
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    { label: 'Estou rodando no MAC' }
                ]
            });
        }

        return templateMenu
    }
}