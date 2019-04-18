const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(curso, tempoEstudado) {

        let arquivoDoCurso = __dirname + '/data/' + curso + '.json';

        if (fs.existsSync(arquivoDoCurso)) { 
            //salvar
            this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
        } else {
            // criar e salvar

            this.criaArquivoDeCurso(arquivoDoCurso, {})
                .then(() => {
                    //salvar
                    this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
                });
        }
    },

    adicionaTempoAoCurso(arquivoDoCurso, tempo) {
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempo
        };

        jsonfile.writeFile(arquivoDoCurso, dados, { spaces: 2 })
            .then(() => console.log('tempo salvo com sucesso'))
            .catch(err => console.log(err));
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