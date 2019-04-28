const data = require('./data');

module.exports = {
    gerarTrayTemplate() {

        let template = [
            { label: 'Cursos' },
            { label: '', type: 'separator' },
        ];

        let cursos = data.pegaNomeDosCursos();

        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio'
            };

            template.push(menuItem);
        })

        return template;
    }
}