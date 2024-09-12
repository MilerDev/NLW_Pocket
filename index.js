const { select, input , checkbox} = require('@inquirer/prompts'); 

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

const listarMetas = async() => {
    const respostas = await checkbox({
            message: 'Use as setas para mudar de metas, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa',
            choices: [...metas],
            instructions: false
        })

        metas.forEach((m) => {
            m.checked = false
        })
        if (respostas == 0 ){
            console.log(' Nenhuma meta selecionada!')
            return 
        }

        
        respostas.forEach((resposta) => {
            const meta = metas.find((m) => {
                return m.value == resposta
            })

            meta.checked = true
        })

        console.log('Meta(s) marcadas como concluidas(s)')

}

const metasRealizadas = async() => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0) {
        console.log('Não existem metas realizadas!')
        return 
    }
    await select({
        message: 'Metas Realizadas  ' + realizadas.length ,
        choices: [...realizadas]
    })


}

const metasAbertas = async() => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })
    if (abertas.length == 0) {
        console.log('Não existem metas abertas!')
        return 
    }

    await select({
        message: 'Metas Abertas  ' + abertas.length ,
        choices: [...abertas]
    })
}

    async function start() {

    while (true) {
        const opcao = await select({
            message: 'Menu >',
            choices: [
                {
                    name: 'Cadastrar metas',
                    value: 'Cadastrar'
                },
                {
                    name: 'Listar metas',
                    value: 'Listar'
                },
                {
                    name: 'metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'metas abertas',
                    value: 'abertas'
                },
                
                {
                    name: 'sair',
                    value: 'Sair'
                }
            ]
        });

        switch (opcao) {
            case 'Cadastrar':
                await CadastrarMeta();
                console.log(metas);
                break;
            case 'Listar':
                await listarMetas();
                break;
            case 'realizadas':
                await metasRealizadas();
                break;
            case 'abertas':
                await metasAbertas();
                break;
            case 'Sair':
                console.log('Ate a proxima!');
                return;
        }
    }
}

start();