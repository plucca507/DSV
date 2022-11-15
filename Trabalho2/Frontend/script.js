var url = 'http://localhost:3000/'

function cadastrar()
{
	//validacao de alguns dos inputs
	
	if(!validaNome('nome-completo'))
	{
		return
	}
	
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		'email':       document.getElementById('email').value,
		'nome':        document.getElementById('nome-completo').value
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "usuarios",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	//checa se requisicao deu certo
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	//trata resposta
	.then((output) =>
	{
		console.log(output)
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

function cadastrarFilme()
{
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		'titulo':       document.getElementById('nome-titulo').value,
		'categoria':        document.getElementById('categoria').value
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "filmes",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	//checa se requisicao deu certo
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	//trata resposta
	.then((output) =>
	{
		console.log(output)
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

function cadastrarLocacoes()
{
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		'emailUsuario':       	document.getElementById('emailUsuario').value,
		'tituloFilme':        	document.getElementById('tituloFilme').value,
		'dataLocacao':        	document.getElementById('dataLocacao').value,
		'dataDevolucao':      	document.getElementById('dataDevolucao').value
		// 'locado':        		document.getElementById('locado').value
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "locacoes",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	//checa se requisicao deu certo
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	//trata resposta
	.then((output) =>
	{
		console.log(output)
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

function validaNome(id)
{
	let divNome = document.getElementById(id)
	if(divNome.value.trim().split(' ').length >= 2)
	{
		divNome.style.border = 0
		return true
	}
	else
	{
		divNome.style.border = 'solid 1px red'
		return false
	}
}

function validaData(id)
{
	let divData = document.getElementById(id)
	if(divData.value.length > 0)
	{
		divData.style.border = 0
		return true
	}
	else
	{
		divData.style.border = 'solid 1px red'
		return false
	}
}

function listar()
{
	//da um GET no endpoint "usuarios"
	fetch(url + 'usuarios')
	.then(response => response.json())
	.then((usuarios) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaUsuarios = document.getElementById('lista-usuarios')
		
		//limpa div
		while(listaUsuarios.firstChild)
		{
			listaUsuarios.removeChild(listaUsuarios.firstChild)
		}
		
		//preenche div com usuarios recebidos do GET
		for(let usuario of usuarios)
		{
			//cria div para as informacoes de um usuario
			let divUsuario = document.createElement('div')
			divUsuario.setAttribute('class', 'form')
			
			//pega o nome do usuario
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome Completo'
			divNome.value = usuario.nome
			divUsuario.appendChild(divNome)
			
			//pega o email do usuario
			let divEmail = document.createElement('input')
			divEmail.placeholder = 'Email'
			divEmail.value = usuario.email
			divUsuario.appendChild(divEmail)
			
			//cria o botao para remover o usuario
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(usuario.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(usuario.id, divNome, divEmail)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaUsuarios.appendChild(divUsuario)
		}
	})
}

function listarFilmes()
{
	//da um GET no endpoint "filmes"
	fetch(url + 'filmes')
	.then(response => response.json())
	.then((Filmes) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaFilmes = document.getElementById('lista-filmes')
		
		//limpa div
		while(listaFilmes.firstChild)
		{
			listaFilmes.removeChild(listaFilmes.firstChild)
		}
		
		//preenche div com usuarios recebidos do GET
		for(let Filme of Filmes)
		{
			//cria div para as informacoes de um usuario
			let divFilme = document.createElement('div')
			divFilme.setAttribute('class', 'form')
			
			//pega o título do filme
			let divNome = document.createElement('input')
			divNome.placeholder = 'Título do Filme'
			divNome.value = Filme.titulo
			divFilme.appendChild(divNome)
			
			//pega a categoria do filme
			let divCategoria = document.createElement('input')
			divCategoria.placeholder = 'categoria'
			divCategoria.value = Filme.categoria
			divFilme.appendChild(divCategoria)
			
			//cria o botao para remover o filme
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerFilme(Filme.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar o filme
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarFilme(Filme.id, divNome, divCategoria)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divFilme.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaFilmes.appendChild(divFilme)
		}
	})
}

function listarLocacoes()
{
	//da um GET no endpoint "locacoes"
	fetch(url + 'locacoes')
	.then(response => response.json())
	.then((Locacoes) =>
	{
		//pega div que vai conter a lista de locações
		let listaLocacoes = document.getElementById('lista-locacoes')
		
		//limpa div
		while(listaLocacoes.firstChild)
		{
			listaLocacoes.removeChild(listaLocacoes.firstChild)
		}
		
		//preenche div com usuarios recebidos do GET
		for(let Locacao of Locacoes)
		{
			//cria div para as informacoes da locação
			let divLocacao = document.createElement('div')
			divLocacao.setAttribute('class', 'form')
			
			//pega o email do usuario
			let divEmail = document.createElement('input')
			divEmail.placeholder = 'Email do usuario'
			divEmail.value = Locacao.emailUsuario
			divLocacao.appendChild(divEmail)
			
			//pega o título do filme locado
			let divTitulo = document.createElement('input')
			divTitulo.placeholder = 'Título do Filme'
			divTitulo.value = Locacao.tituloFilme
			divLocacao.appendChild(divTitulo)
			
			//pega a data de locação
			let divDataLocacao = document.createElement('input')
			divDataLocacao.placeholder = 'Data da locação'
			divDataLocacao.value = Locacao.dataLocacao
			divLocacao.appendChild(divDataLocacao)

			//pega a data de devolução
			let divDataDevolucao = document.createElement('input')
			divDataDevolucao.placeholder = 'Data da locação'
			divDataDevolucao.value = Locacao.dataDevolucao
			divLocacao.appendChild(divDataDevolucao)

			//cria o botao para remover a locação
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerLocacao(Locacao.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar a locação
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarLocacao(Locacao.id, divEmail, divTitulo, divDataLocacao, divDataDevolucao)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divLocacao.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaLocacoes.appendChild(divLocacao)
		}
	})
}

function atualizar(id, divNome, divEmail)
{
	let body =
	{
		'nome': divNome.value,
		'email': divEmail.value
	}
	
	fetch(url + "usuarios/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Usuário atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o usuário :/')
	})
}

function atualizarFilme(id, divNome, divCategoria)
{
	let body =
	{
		'titulo': divNome.value,
		'categoria': divCategoria.value
	}
	
	fetch(url + "filmes/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Filme atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o Filme :/')
	})
}

function atualizarLocacao(id, divEmail, divTitulo, divDataLocacao, divDataDevolucao)
{
	let body =
	{
		'emailUsuario': 	divEmail.value,
		'tituloFilme': 		divTitulo.value,
		'dataLocacao': 		divDataLocacao.value,
		'dataDevolucao': 	divDataDevolucao.value
	}
	
	fetch(url + "locacoes/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Locação atualizada! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar a locação :/')
	})
}

function remover(id)
{
	fetch(url + 'usuarios/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Usuário removido! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o usuário :/')
	})
}

function removerFilme(id)
{
	fetch(url + 'filmes/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarFilmes()
		console.log(output)
		alert('Filme removido! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o filme :/')
	})
}

function removerLocacao(id)
{
	fetch(url + 'locacoes/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarLocacoes()
		console.log(output)
		alert('Locação removida! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover a Locação :/')
	})
}