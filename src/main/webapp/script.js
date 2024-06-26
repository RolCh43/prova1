// ==============================================================
// 		EVENTOS

// RESET
reset = function() {
	// Cria uma requisição AJAX POST a ControllerServlet
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			atualizaSessao();
			window.location.href = "/prova1";
		} else {
			// O QUE FAZER SE DEU ERRADO
			console.error("Erro ao resetar");
		}
	}
	req.send("op=RESET");
}

// NOVA AULA
novaAula = function() {
	window.location.href = "nova";
}

// CANCELA NOVA AULA (OU EDIÇÃO)
cancelarNovaAula = function() {
	window.location.href = "/prova1";
}

// EDITA UMA AULA COM ID ESPECIFICADO
editarAula = function(id) {
	window.location.href = "edit?id=" + id;
}

// ENVIA CONTEÚDO DA NOVA AULA
enviarNovaAula = function() {
    // Obtém os valores a partir do formulário
    let data = document.getElementById('data-id').value;
    let horario = document.getElementById('hora-id').value;
    let duracao = document.getElementById('dur-id').value;
    let codDisciplina = document.getElementById('disc-id').value;
    let assunto = document.getElementById('ass-id').value;
    
    // Verificando a validação
    if (!validaNovaAula(data, horario, duracao, codDisciplina, assunto)) {
        document.getElementById('msg-id').style.display = 'block';
        return;
    }
    
    // Cria uma nova requisição AJAX POST
    let req = new XMLHttpRequest();
    req.open("POST", "ControllerServlet", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = () => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                // Requisição bem-sucedida, atualiza a sessão e redireciona para "/prova1"
                atualizaSessao();
                window.location.href = "/prova1";
            } else {
                // Requisição falhou, faça algo aqui (por exemplo, mostrar uma mensagem de erro)
                console.error("Falha ao enviar nova aula");
            }
        }
    }

    // Envia os parâmetros da nova aula para a ControllerServlet
    let params = `op=CREATE&data=${encodeURIComponent(data)}&horario=${encodeURIComponent(horario)}&duracao=${encodeURIComponent(duracao)}&codDisciplina=${encodeURIComponent(codDisciplina)}&assunto=${encodeURIComponent(assunto)}`;
    req.send(params);
}
// ENVIA CONTEÚDO EM EDIÇÃO
enviarEdit = function() {
	// Obtém os valores a partir do formulário
	let id = document.getElementById('id').innerHTML;
	let data = document.getElementById('data-id').value;
	let horario = document.getElementById('hora-id').value;
	let duracao = document.getElementById('dur-id').value;
	let codDisciplina = document.getElementById('disc-id').value;
	let assunto = document.getElementById('ass-id').value;

	// Cria uma requisição AJAX POST para o ControllerServlet
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			// Se a requisição for bem-sucedida, atualiza a sessão e redireciona
			atualizaSessao();
			window.location.href = "/prova1";
		} else {
			// O QUE FAZER SE DEU ERRADO
			console.error("Erro ao enviar edição da aula");
		}
	};
	req.send("op=UPDATE&id=" + encodeURIComponent(id) + "&data=" + encodeURIComponent(data) + "&horario=" + encodeURIComponent(horario) + "&duracao=" + encodeURIComponent(duracao) + "&codDisciplina=" + encodeURIComponent(codDisciplina) + "&assunto=" + encodeURIComponent(assunto));
}

// DELETA UMA AULA
deleta = function(id) {
	// Cria uma requisição AJAX POST para o ControllerServlet
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			// Se a requisição for bem-sucedida, atualiza a sessão e redireciona
			atualizaSessao();
			window.location.href = "/prova1";
		} else {
			// O QUE FAZER SE DEU ERRADO
			console.error("Erro ao deletar aula");
		}
	};
	req.send("op=DELETE&id=" + encodeURIComponent(id));
}

const atualizaSessao = function() {
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			// O QUE FAZER SE DEU CERTO
		} else {
			// O QUE FAZER SE DEU ERRADO
			console.error("Erro ao atualizar a sessão");
		}
	};
	req.send("op=START_SESSION");
}

// ============================================================
// 			VALIDAÇÕES

validaNovaAula = function(data, horario, duracao, codDisciplina, assunto) {
  const existsValues = [data,horario,duracao, codDisciplina, assunto].every(value => !!value)
  
  
    return existsValues;
}


// ===================================================================================
// 		INICIALIZA O PROCESSAMENTO

atualizaSessao();