const { select, input } = require('@inquirer/prompts'); 

const start = async() => {
   
    while (true) {
        const opcao = await select({
            message: 'Menu >' ,
            choices: [
                {
                    name:'Cadastrar metas',
                    value: 'Cadastrar'

            },
            {
                name:'Listar metas',
                value: 'Listar'
            },
            {
                name:'sair',
                value: 'Sair'
            }
        ]
        })

        switch (opcao) {
            case 'Cadastrar':
                await CadatrarMeta()
                break;
            case 'Listar':
                console.log('vamos listar');
                break;
            case 'sair':
                console.log('Ate a proxima!');
                return
        }
    }
};

start();