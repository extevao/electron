const data = require('./data');

module.exports = {
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
        })

        return template;
    }
}