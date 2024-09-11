const { select, input } = require('@inquirer/prompts'); 

let meta = {
    value: 'tomar 3L de agua por dia',
    checked: false,
}

let metas = [ meta ];


const CadastrarMeta = async() => {
    const meta = await input({message: 'Digite a meta:'})

    if(meta.length == 0){
        console.log(' A meta não pode ser vazia. ')
        return
    }
    metas.push(
        { value: meta , checked: false} 
    )

}
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
                value:'Sair'
            }
        ]
        })

        switch (opcao) {
            case 'Cadastrar':
                await   CadastrarMeta()
                console.log(metas)
                break;
            case 'Listar':
                console.log('vamos listar');
                break;
            case 'Sair':
                console.log('Ate a proxima!');
                return
        }
    }
};

start();