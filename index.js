const { select, input , checkbox} = require('@inquirer/prompts'); 

let mensagem = "Bem vindo ao App de Metas";
let meta = {
    value: 'tomar 3L de agua por dia',
    checked: false,
}

let metas = [ meta ];

const CadastrarMeta = async() => {
    const meta = await input({message: 'Digite a meta:'})

    if(meta.length == 0){
        mensagem =' A meta não pode ser vazia. '
        return
    }
    metas.push(
        { value: meta , checked: false} 
    )

    mensagem = 'Meta cadastrada com sucesso'

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
            mensagem =' Nenhuma meta selecionada!'
            return 
        }

        
        respostas.forEach((resposta) => {
            const meta = metas.find((m) => {
                return m.value == resposta
            })

            meta.checked = true
        })

        mensagem = 'Meta(s) marcada(s) como concluidas(s)'

}

const metasRealizadas = async() => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas!'
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
        mensagem = 'Não existem metas abertas!'
        return 
    }

    await select({
        message: 'Metas Abertas  ' + abertas.length ,
        choices: [...abertas]
    })
}

const deletarMetas = async() => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false} 
    })

    const itemsADeletar = await checkbox({
        message: 'Selecionar item para deletar',
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itemsADeletar.length == 0) {
        mensagem = 'Nenhum item para deletar!'
        return 
    }
    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
           return meta.value != item 
        })

        
    })

    mensagem = 'Meta(s) deleta(s) com sucesso!'
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ''){
        console.log(mensagem)
        console.log('')
        mensagem = ''
    }


}

const start = async () => {

    while (true) {
        mostrarMensagem(); 

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
                    name: 'deletar metas',
                    value: 'deletar'
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
            case 'deletar':
                await deletarMetas();
                break;
            case 'Sair':
                console.log('Ate a proxima!');
                return;
        }
    }
}
start();