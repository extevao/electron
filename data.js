const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(curso, tempoEstudado) {

        let arquivoDoCurso = __dirname + '/data/' + curso + '.json';

        if (fs.existsSync(arquivoDoCurso)) { 
            //salvar
        } else {
            // criar e salvar

            this.criaArquivoDeCurso(arquivoDoCurso, {})
                .then(() => {
                    // Salvar
                })
        }
    },

    criaArquivoDeCurso(nomeArquivo, conteudoArquivo) {

       return jsonfile
            .writeFile(nomeArquivo, conteudoArquivo)
            .then(() => {
                console.log('Arquivo Criado');
            })
            .catch(err => {
                console.log(err);
            });
    }
}